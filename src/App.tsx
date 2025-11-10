import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import './App.css'
import EnemyCard from './components/EnemyCard'
import { decode } from './crypto'
import { TOOL_ITEMS, NAIL_UPGRADES, MASKS, type MaskEntry, SPOOL_FRAGMENTS, SILK_HEARTS, MISC_ITEMS, CRESTS, SKILLS, TOOL_POUCH_UPGRADES, CRAFTING_KIT_UPGRADES, ABILITIES, type NailUpgrade } from './constants'
import { useTranslation } from './i18n/useTranslation'
import { HUNTER_JOURNAL_TARGETS, HUNTER_NAME_MAP, HUNTER_MAP_LINKS } from './hunter'
import { getHunterOrder } from './hunterOrder'
import { makeGameTr, type GameCategory } from './i18n/gameTranslations'

type NullableFile = File | null
type ToolItem = { name: string; isUnlocked: boolean; link: string }
type ItemRow = { key?: string; name: string; ok: boolean; link?: string; act?: number }

type FourFlags = { u1: boolean; u2: boolean; u3: boolean; u4: boolean }
type HunterEntry = { name: string; kills: number; target: number; optional?: boolean }

function safeArray(v: any): any[] { return Array.isArray(v) ? v : [] }

function buildMapFromSaved(saved: any[]): Map<string, boolean> {
  const map = new Map<string, boolean>()
  for (const item of safeArray(saved)) {
    const rawName = item?.Name ?? item?.name
    if (!rawName) continue
    const isUnlocked = Boolean(item?.Data?.IsUnlocked ?? item?.data?.isUnlocked)
    map.set(String(rawName), isUnlocked)
  }
  return map
}

function computeFourFlags(rawCount: number, extras: boolean[], order: ('u2' | 'u3' | 'u4')[]): FourFlags {
  let u1 = false, u2 = false, u3 = false, u4 = false
  if (rawCount <= 0) return { u1, u2, u3, u4 }
  if (rawCount === 1) return { u1: true, u2, u3, u4 }
  u1 = true
  let count = 1
  for (let i = 0; i < extras.length; i++) {
    if (extras[i]) {
      const key = order[i]
      if (key === 'u2') u2 = true
      if (key === 'u3') u3 = true
      if (key === 'u4') u4 = true
      count++
    }
  }
  if (count < rawCount) {
    for (let i = 1; i <= rawCount; i++) {
      if (i === 2 && !u2) u2 = true
      if (i === 3 && !u3) u3 = true
      if (i === 4 && !u4) u4 = true
    }
  }
  return { u1, u2, u3, u4 }
}

function getCompletedQuestsSet(pd: any): Set<string> {
  const arr = safeArray(pd?.QuestCompletionData?.savedData)
  const set = new Set<string>()
  for (const q of arr) {
    const qName = q?.Name ?? q?.name
    const done = Boolean(q?.Data?.IsCompleted ?? q?.data?.isCompleted)
    if (qName && done) set.add(String(qName))
  }
  return set
}

function buildSceneBoolSet(parsed: any, matchId: (sceneName: string | undefined, id: any) => boolean): Set<string> {
  const list = safeArray(parsed?.sceneData?.persistentBools?.serializedList)
  const set = new Set<string>()
  for (const ent of list) {
    const sceneName = ent?.SceneName ?? ent?.sceneName
    const id = ent?.ID ?? ent?.id
    const val = ent?.Value ?? ent?.value
    if (!sceneName || !val) continue
    if (matchId(sceneName, id)) set.add(`${sceneName}|${String(id)}`)
  }
  return set
}

function extractCollectablesMap(pd: any): Map<string, number> {
  const arr = safeArray(pd?.Collectables?.savedData)
  const map = new Map<string, number>()
  for (const c of arr) {
    const name = c?.Name ?? c?.name
    const amount = Number(c?.Data?.Amount ?? c?.data?.amount ?? 0)
    if (name) map.set(String(name), amount)
  }
  return map
}

function toolsFromMap(map: Map<string, boolean>) {
  return TOOL_ITEMS.map(({ display, ingame, link }) => ({ name: display, isUnlocked: ingame.some((m: string) => map.get(m) === true), link }))
}

function skillsFromMap(map: Map<string, boolean>) {
  return SKILLS.map(s => ({ name: s.display, ok: map.get(s.internalId) === true, link: s.link, act: s.whichAct }))
}

function nailsFromRaw(nailUpgradesRaw: number, gotGourmand: boolean, fleaEnded: boolean) {
  return computeFourFlags(nailUpgradesRaw, [gotGourmand, fleaEnded], ['u3', 'u4'])
}

function toolPouchFromRaw(toolPouchUpgradesRaw: number, journalCompleted: boolean, pinGalleryChallenge: boolean) {
  return computeFourFlags(toolPouchUpgradesRaw, [journalCompleted, pinGalleryChallenge], ['u2', 'u3'])
}

function craftingKitFromRaw(toolKitUpgradesRaw: number, purchasedGrindleToolKit: boolean, purchasedArchitectToolKit: boolean) {
  return computeFourFlags(toolKitUpgradesRaw, [purchasedGrindleToolKit, purchasedArchitectToolKit], ['u2', 'u3'])
}

function makeItemRowsFromDefs(defs: any[], mapOk: Record<string, boolean>, actFilter: number, hideFound: boolean) {
  return defs.filter((u: any) => (actFilter === 0 || u.whichAct === actFilter) && (!hideFound ? true : !mapOk[u.key])).map((u: any) => ({ key: u.key, name: u.display, ok: Boolean(mapOk[u.key]), link: u.link, act: u.whichAct }))
}

function App(): ReactElement {
  const { t, language, changeLanguage } = useTranslation()
  const gameTr = makeGameTr(language)
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [tools, setTools] = useState<ToolItem[]>([])
  const [processed, setProcessed] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [nail, setNail] = useState<FourFlags>({ u1: false, u2: false, u3: false, u4: false })
  const [toolPouch, setToolPouch] = useState<FourFlags>({ u1: false, u2: false, u3: false, u4: false })
  const [craftingKit, setCraftingKit] = useState<FourFlags>({ u1: false, u2: false, u3: false, u4: false })
  const [maskShards, setMaskShards] = useState<ItemRow[]>([])
  const [spoolFrags, setSpoolFrags] = useState<ItemRow[]>([])
  const [silkHearts, setSilkHearts] = useState<ItemRow[]>([])
  const [miscItems, setMiscItems] = useState<ItemRow[]>([])
  const [crests, setCrests] = useState<ItemRow[]>([])
  const [skills, setSkills] = useState<ItemRow[]>([])
  const [abilities, setAbilities] = useState<ItemRow[]>([])
  const [hunterEntries, setHunterEntries] = useState<HunterEntry[]>([])
  const [actFilter, setActFilter] = useState<0 | 1 | 2 | 3>(0)
  const [hideFound, setHideFound] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [hunterFilter, setHunterFilter] = useState<'all' | 'found' | 'notFound' | 'incomplete'>('all')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (fileError) {
      const timer = setTimeout(() => {
        setFileError(null)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [fileError])

  useEffect(() => {
    document.title = t('title')
  }, [t])

  const processFile = useCallback(async (pickedFile: File) => {
    setIsProcessing(true)
    setProcessed(false)
    try {
      const arrayBuffer = await pickedFile.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)
      const decrypted = decode(bytes)
      const parsed = JSON.parse(decrypted) as any
      const pd: any = parsed?.playerData ?? {}
      const saved: any[] = safeArray(pd?.Tools?.savedData)
      const map = buildMapFromSaved(saved)
      setTools(toolsFromMap(map))
      setSkills(skillsFromMap(map))
      const nailUpgradesRaw = Number(pd?.nailUpgrades ?? 0)
      const gotGourmand = Boolean(pd?.GotGourmandReward)
      const fleaEnded = Boolean(pd?.FleaGamesEnded)
      setNail(nailsFromRaw(nailUpgradesRaw, gotGourmand, fleaEnded))
      const toolPouchUpgradesRaw = Number(pd?.ToolPouchUpgrades ?? 0)
      const pinGalleryChallenge = Boolean(pd?.PinGalleryLastChallengeOpen)
      const questsArr = safeArray(pd?.QuestCompletionData?.savedData)
      let journalCompleted = false
      for (const q of questsArr) {
        const qName = q?.Name ?? q?.name
        const isCompleted = Boolean(q?.Data?.IsCompleted ?? q?.data?.isCompleted)
        if (qName === 'Journal' && isCompleted) { journalCompleted = true; break }
      }
      setToolPouch(toolPouchFromRaw(toolPouchUpgradesRaw, journalCompleted, pinGalleryChallenge))
      const toolKitUpgradesRaw = Number(pd?.ToolKitUpgrades ?? 0)
      const purchasedGrindleToolKit = Boolean(pd?.purchasedGrindleToolKit)
      const purchasedArchitectToolKit = Boolean(pd?.PurchasedArchitectToolKit)
      setCraftingKit(craftingKitFromRaw(toolKitUpgradesRaw, purchasedGrindleToolKit, purchasedArchitectToolKit))
      const obtainedByKey = buildSceneBoolSet(parsed, (_sceneName, id) => (id === 'Heart Piece' || (typeof id === 'string' && id.startsWith('Heart Piece'))))
      const completedQuests = getCompletedQuestsSet(pd)
      const shards = MASKS.map((entry: MaskEntry) => {
        if (entry.type === 'sceneData') {
          const keyA = `${entry.ingame[0]}|${entry.ingame[1]}`
          let ok = obtainedByKey.has(keyA)
          if (!ok && entry.ingame[1] !== 'Heart Piece') {
            const baseKey = `${entry.ingame[0]}|Heart Piece`
            ok = obtainedByKey.has(baseKey)
          }
          return { name: entry.display, ok, link: entry.link, act: entry.whichAct }
        }
        if (entry.type === 'flag') {
          const ok = Boolean((pd as any)?.[entry.flag]) === true
          return { name: entry.display, ok, link: entry.link, act: entry.whichAct }
        }
        const ok = completedQuests.has(entry.questName)
        return { name: entry.display, ok, link: entry.link, act: entry.whichAct }
      })
      setMaskShards(shards)
      const spoolSceneOk = buildSceneBoolSet(parsed, (_sceneName, id) => (id === 'Silk Spool' || (typeof id === 'string' && id.startsWith('Silk Spool'))))
      const completedQuests2 = getCompletedQuestsSet(pd)
      const spool = SPOOL_FRAGMENTS.map(e => {
        if (e.type === 'sceneData') {
          const exact = `${e.ingame![0]}|${e.ingame![1]}`
          let ok = spoolSceneOk.has(exact)
          if (!ok && e.ingame![1] !== 'Silk Spool') {
            const baseKey = `${e.ingame![0]}|Silk Spool`
            ok = spoolSceneOk.has(baseKey)
          }
          return { name: e.display, ok, link: e.link, act: e.whichAct }
        }
        if (e.type === 'flag') {
          const ok = Boolean((pd as any)?.[e.flag!]) === true
          return { name: e.display, ok, link: e.link, act: e.whichAct }
        }
        const ok = completedQuests2.has(e.questName!)
        return { name: e.display, ok, link: e.link, act: e.whichAct }
      })
      setSpoolFrags(spool)
      const silkHeartScenes = buildSceneBoolSet(parsed, (_sceneName, id) => id === 'glow_rim_Remasker')
      const hearts = SILK_HEARTS.map(h => ({ name: h.display, ok: silkHeartScenes.has(`${h.sceneName}|${h.id}`), link: h.link, act: h.whichAct }))
      setSilkHearts(hearts)
      const collectablesMap = extractCollectablesMap(pd)
      const misc = MISC_ITEMS.map(m => {
        if (m.type === 'flag') {
          const ok = Boolean((pd as any)?.[m.flag]) === true
          return { name: m.display, ok, link: m.link, act: m.whichAct }
        }
        const amount = collectablesMap.get(m.name) ?? 0
        const ok = amount >= m.amount
        return { name: m.display, ok, link: m.link, act: m.whichAct }
      })
      setMiscItems(misc)
      const toolEquipsArr: any[] = safeArray(pd?.ToolEquips?.savedData)
      const crestMap = new Map<string, boolean>()
      for (const te of toolEquipsArr) {
        const name = te?.Name ?? te?.name
        const isUnlocked = Boolean(te?.Data?.IsUnlocked ?? te?.data?.isUnlocked)
        if (name) crestMap.set(String(name), isUnlocked)
      }
      const crestsData = CRESTS.map(c => ({ name: c.display, ok: crestMap.get(c.internalId) === true, link: c.link, act: c.whichAct }))
      setCrests(crestsData)
      const abilitiesData = ABILITIES.map(a => ({ name: a.display, ok: Boolean((pd as any)?.[a.flag]) === true, link: a.link, act: a.whichAct }))
      setAbilities(abilitiesData)
      const enemyList: any[] = Array.isArray(pd?.EnemyJournalKillData?.list) ? pd.EnemyJournalKillData.list : []
      const enemyMap = new Map<string, number>()
      for (const e of enemyList) {
        const name = String(e?.Name ?? '')
        if (name) {
          enemyMap.set(name, Number(e?.Record?.Kills ?? 0))
        }
      }
      const optionalEnemies = new Set(['Shakra', 'Garmond_Zaza', 'Abyss Mass', 'Rock Roller', 'Cloverstag White', 'Garmond', 'Lost Lace'])
      const hj = Object.keys(HUNTER_JOURNAL_TARGETS).map(name => {
        const kills = enemyMap.get(name) ?? 0
        const target = HUNTER_JOURNAL_TARGETS[name]
        const optional = optionalEnemies.has(name)
        return { name, kills, target, optional } as HunterEntry
      })
      setHunterEntries(hj)
    } catch (e) {
      setTools([])
      setSkills([])
      setMaskShards([])
      setSpoolFrags([])
      setSilkHearts([])
      setMiscItems([])
      setCrests([])
      setAbilities([])
      setHunterEntries([])
    } finally {
      setIsProcessing(false)
      setProcessed(true)
    }
  }, [])

  const onFileChosen = useCallback((f: NullableFile) => {
    if (!f) return

    if (!f.name.toLowerCase().endsWith('.dat')) {
      setFileError(t('fileError'))
      return
    }

    setFileError(null)
    void processFile(f)
  }, [processFile, t])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    onFileChosen(f)
  }, [onFileChosen])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const f = e.dataTransfer.files?.[0] ?? null
    onFileChosen(f)
  }, [onFileChosen])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const triggerBrowse = useCallback(() => { fileInputRef.current?.click() }, [])

  function getMissingItems() {
    const links = [];
    links.push(...tools.filter(t => !t.isUnlocked && t.link).map(t => t.link));
    links.push(...NAIL_UPGRADES.filter(n => !nail[n.key] && n.link).map(n => n.link));
    links.push(...TOOL_POUCH_UPGRADES.filter(tp => !toolPouch[tp.key] && tp.link).map(tp => tp.link));
    links.push(...CRAFTING_KIT_UPGRADES.filter(ck => !craftingKit[ck.key] && ck.link).map(ck => ck.link));
    links.push(...maskShards.filter(m => !m.ok && m.link).map(m => m.link));
    links.push(...spoolFrags.filter(s => !s.ok && s.link).map(s => s.link));
    links.push(...silkHearts.filter(h => !h.ok && h.link).map(h => h.link));
    links.push(...miscItems.filter(m => !m.ok && m.link).map(m => m.link));
    links.push(...crests.filter(c => !c.ok && c.link).map(c => c.link));
    links.push(...skills.filter(s => !s.ok && s.link).map(s => s.link));
    links.push(...abilities.filter(a => !a.ok && a.link).map(a => a.link));

    const locationIds = links
      .map(url => (url ? url.match(/locationIds=(\d+)/)?.[1] : undefined))
      .join(',');

    const combinedUrl = `https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=${locationIds}`;
    return combinedUrl
  }


  return (
    <div className="container">
      <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 1000, alignItems: 'center' }}>
        <a
          href="https://github.com/glikoliz/silksong-save-analyzer/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="github-icon"
          title="View on GitHub"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <button
          className={`btn small ${language === 'ru' ? 'primary' : ''}`}
          onClick={() => changeLanguage('ru')}
        >
          RU
        </button>
        <button
          className={`btn small ${language === 'en' ? 'primary' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
      </div>
      <header className="header">
        <h1 className="title">{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
      </header>
      <section className={`dropzone ${dragActive ? 'active' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} role="button" aria-label={t('dropAria')} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerBrowse() }}>
        <input ref={fileInputRef} type="file" accept=".dat,application/octet-stream" onChange={handleFileChange} className="file-input" />
        <div className="dropzone-inner">
          <div className="dropzone-icon" aria-hidden>⬇️</div>
          <div className="dropzone-text">
            <span>{t('dropText')}</span> <button className="linklike" onClick={triggerBrowse}>{t('browse')}</button>
          </div>
          {fileError && (
            <div style={{
              marginTop: '12px',
              padding: '8px 12px',
              backgroundColor: '#dc2626',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {fileError}
            </div>
          )}
        </div>
      </section>
      {isProcessing && (
        <section className="actions">
          <button className="btn primary" disabled>{t('processing')}</button>
        </section>
      )}
      {processed && (
        <section className="section">
          {(() => {
            const categories = [
              { key: 'nail', name: t('needleUpgrades'), percent: 4, items: ['Sharpened Needle', 'Shining Needle', 'Hivesteel Needle', 'Pale Steel Needle'] },
              { key: 'ancientMasks', name: t('ancientMasks'), percent: Math.floor(maskShards.length / 4), items: [] },
              { key: 'silkSpool', name: t('silkSpool'), percent: Math.floor(spoolFrags.length / 2), items: [] },
              { key: 'silkHearts', name: t('silkHearts'), percent: 3, items: ['Silk Heart 1', 'Silk Heart 2', 'Silk Heart 3'] },
              { key: 'misc', name: t('miscellaneous'), percent: 2, items: ['Sylphsong (EVAHEAL/BoundCrestUpgrader)', 'Everbloom (WhiteFlower)'] },
              { key: 'crests', name: t('crests'), percent: 6, items: ['Architect (Toolmaster)', 'Beast (Warrior)', 'Reaper (Reaper)', 'Shaman (Spell)', 'Wanderer (Wanderer)', 'Witch (Witch)'] },
              { key: 'skills', name: t('skills'), percent: 6, items: ['Cross Stitch (Parry)', 'Pale Nails (Silk Boss Needle)', 'Sharpdart (Silk Charge)', 'Silkspear (Silk Spear)', 'Rune Rage (Silk Bomb)', 'Thread Storm (Thread Sphere)'] },
              { key: 'craftingKit', name: t('craftingKitUpgrades'), percent: 4, items: ['Expansion 1', 'Expansion 2', 'Expansion 3', 'Expansion 4'] },
              { key: 'toolPouch', name: t('toolPouchUpgrades'), percent: 4, items: ['Expansion 1', 'Expansion 2', 'Expansion 3', 'Expansion 4'] },
              { key: 'abilities', name: t('abilities'), percent: 6, items: ['Clawline', 'Cling Grip', 'Needle Strike', 'Needolin', 'Silk Soar', 'Swift Step'] },
              { key: 'tools', name: t('tools'), percent: 51, items: [] },
            ]
            const hunterJournalCategory = { key: 'huntersJournal', name: t('huntersJournal'), percent: hunterEntries.filter(h => !h.optional).length, items: [] }
            const complete = (key: string) => {
              const filterByAct = (items: any[]) => {
                if (actFilter === 0) return items
                return items.filter(item => item.act === actFilter || (item.whichAct && item.whichAct === actFilter))
              }

              if (key === 'tools') {
                const filteredTools = filterByAct(tools.map(t => {
                  const meta = TOOL_ITEMS.find(tm => tm.display === t.name)
                  return { ...t, whichAct: meta?.whichAct }
                }))
                return filteredTools.length === 0 || filteredTools.every(t => t.isUnlocked)
              }
              if (key === 'nail') {
                const filteredNails = filterByAct(NAIL_UPGRADES)
                return filteredNails.length === 0 || filteredNails.every(n => n.key === 'u1' ? nail.u1 : n.key === 'u2' ? nail.u2 : n.key === 'u3' ? nail.u3 : nail.u4)
              }
              if (key === 'toolPouch') {
                const filteredTP = filterByAct(TOOL_POUCH_UPGRADES)
                return filteredTP.length === 0 || filteredTP.every(tp => tp.key === 'u1' ? toolPouch.u1 : tp.key === 'u2' ? toolPouch.u2 : tp.key === 'u3' ? toolPouch.u3 : toolPouch.u4)
              }
              if (key === 'craftingKit') {
                const filteredCK = filterByAct(CRAFTING_KIT_UPGRADES)
                return filteredCK.length === 0 || filteredCK.every(ck => ck.key === 'u1' ? craftingKit.u1 : ck.key === 'u2' ? craftingKit.u2 : ck.key === 'u3' ? craftingKit.u3 : craftingKit.u4)
              }
              if (key === 'ancientMasks') {
                const filteredMasks = filterByAct(maskShards)
                if (actFilter === 0) {
                  const maxMasks = Math.floor(filteredMasks.length / 4)
                  const currentMasks = Math.floor(filteredMasks.filter(x => x.ok).length / 4)
                  return maxMasks === 0 || currentMasks >= maxMasks
                } else {
                  return filteredMasks.length === 0 || filteredMasks.every(x => x.ok)
                }
              }
              if (key === 'silkSpool') {
                const filteredSpools = filterByAct(spoolFrags)
                if (actFilter === 0) {
                  const maxSpools = Math.floor(filteredSpools.length / 2)
                  const currentSpools = Math.floor(filteredSpools.filter(x => x.ok).length / 2)
                  return maxSpools === 0 || currentSpools >= maxSpools
                } else {
                  return filteredSpools.length === 0 || filteredSpools.every(x => x.ok)
                }
              }
              if (key === 'silkHearts') {
                const filteredHearts = filterByAct(silkHearts)
                return filteredHearts.length === 0 || filteredHearts.every(h => h.ok)
              }
              if (key === 'misc') {
                const filteredMisc = filterByAct(miscItems)
                return filteredMisc.length === 0 || filteredMisc.every(m => m.ok)
              }
              if (key === 'crests') {
                const filteredCrests = filterByAct(crests)
                return filteredCrests.length === 0 || filteredCrests.every(c => c.ok)
              }
              if (key === 'skills') {
                const filteredSkills = filterByAct(skills)
                return filteredSkills.length === 0 || filteredSkills.every(s => s.ok)
              }
              if (key === 'abilities') {
                const filteredAbilities = filterByAct(abilities)
                return filteredAbilities.length === 0 || filteredAbilities.every(a => a.ok)
              }
              if (key === 'huntersJournal') {
                return hunterEntries.length === 0 || hunterEntries.every(h => h.kills >= h.target)
              }
              return false
            }
            const categoryProgress = (key: string): { have: number; total: number } => {

              const filterByAct = (items: any[]) => {
                if (actFilter === 0) return items
                return items.filter(item => item.act === actFilter || (item.whichAct && item.whichAct === actFilter))
              }

              if (key === 'tools') {
                const filteredTools = filterByAct(tools.map(t => {
                  const meta = TOOL_ITEMS.find(tm => tm.display === t.name)
                  return { ...t, whichAct: meta?.whichAct }
                }))
                const have = filteredTools.filter(t => t.isUnlocked).length
                return { have, total: filteredTools.length }
              }
              if (key === 'nail') {
                const filteredNails = filterByAct(NAIL_UPGRADES)
                const got = filteredNails.filter(n => n.key === 'u1' ? nail.u1 : n.key === 'u2' ? nail.u2 : n.key === 'u3' ? nail.u3 : nail.u4).length
                return { have: got, total: filteredNails.length }
              }
              if (key === 'toolPouch') {
                const filteredTP = filterByAct(TOOL_POUCH_UPGRADES)
                const got = filteredTP.filter(tp => tp.key === 'u1' ? toolPouch.u1 : tp.key === 'u2' ? toolPouch.u2 : tp.key === 'u3' ? toolPouch.u3 : toolPouch.u4).length
                return { have: got, total: filteredTP.length }
              }
              if (key === 'craftingKit') {
                const filteredCK = filterByAct(CRAFTING_KIT_UPGRADES)
                const got = filteredCK.filter(ck => ck.key === 'u1' ? craftingKit.u1 : ck.key === 'u2' ? craftingKit.u2 : ck.key === 'u3' ? craftingKit.u3 : craftingKit.u4).length
                return { have: got, total: filteredCK.length }
              }
              if (key === 'ancientMasks') {
                const filteredMasks = filterByAct(maskShards)
                if (actFilter === 0) {
                  const fragments = filteredMasks.filter(x => x.ok).length
                  const totalFragments = filteredMasks.length
                  const masks = Math.floor(fragments / 4)
                  const maxMasks = Math.floor(totalFragments / 4)
                  const have = Math.min(masks, maxMasks)
                  return { have, total: maxMasks }
                } else {
                  const fragments = filteredMasks.filter(x => x.ok).length
                  const totalFragments = filteredMasks.length
                  return { have: fragments, total: totalFragments }
                }
              }
              if (key === 'silkSpool') {
                const filteredSpools = filterByAct(spoolFrags)
                if (actFilter === 0) {
                  const fragments = filteredSpools.filter(x => x.ok).length
                  const totalFragments = filteredSpools.length
                  const spools = Math.floor(fragments / 2)
                  const maxSpools = Math.floor(totalFragments / 2)
                  const have = Math.min(spools, maxSpools)
                  return { have, total: maxSpools }
                } else {
                  const fragments = filteredSpools.filter(x => x.ok).length
                  const totalFragments = filteredSpools.length
                  return { have: fragments, total: totalFragments }
                }
              }
              if (key === 'silkHearts') {
                const filteredHearts = filterByAct(silkHearts)
                const got = filteredHearts.filter(x => x.ok).length
                const totalHearts = filteredHearts.length
                const have = Math.min(got, totalHearts)
                return { have, total: totalHearts }
              }
              if (key === 'misc') {
                const filteredMisc = filterByAct(miscItems)
                const got = filteredMisc.filter(x => x.ok).length
                const totalMisc = filteredMisc.length
                const have = Math.min(got, totalMisc)
                return { have, total: totalMisc }
              }
              if (key === 'crests') {
                const filteredCrests = filterByAct(crests)
                const got = filteredCrests.filter(x => x.ok).length
                const totalCrests = filteredCrests.length
                const have = Math.min(got, totalCrests)
                return { have, total: totalCrests }
              }
              if (key === 'skills') {
                const filteredSkills = filterByAct(skills)
                const got = filteredSkills.filter(x => x.ok).length
                const totalSkills = filteredSkills.length
                const have = Math.min(got, totalSkills)
                return { have, total: totalSkills }
              }
              if (key === 'abilities') {
                const filteredAbilities = filterByAct(abilities)
                const got = filteredAbilities.filter(x => x.ok).length
                const totalAbilities = filteredAbilities.length
                const have = Math.min(got, totalAbilities)
                return { have, total: totalAbilities }
              }
              if (key === 'huntersJournal') {
                const requiredEntries = hunterEntries.filter(h => !h.optional)
                const have = requiredEntries.filter(h => h.kills >= h.target).length
                const total = requiredEntries.length
                return { have, total }
              }
              return { have: 0, total: 0 }
            }
            const globalTotals = (() => {
              const tTotal = tools.length
              const tHave = tools.filter(t => t.isUnlocked).length
              const nTotal = 4
              const nHave = [nail.u1, nail.u2, nail.u3, nail.u4].filter(Boolean).length
              const tpTotal = 4
              const tpHave = [toolPouch.u1, toolPouch.u2, toolPouch.u3, toolPouch.u4].filter(Boolean).length
              const ckTotal = 4
              const ckHave = [craftingKit.u1, craftingKit.u2, craftingKit.u3, craftingKit.u4].filter(Boolean).length
              const mTotal = Math.floor(maskShards.length / 4)
              const mHave = Math.floor(maskShards.filter(x => x.ok).length / 4)
              const sTotal = Math.floor(spoolFrags.length / 2)
              const sHave = Math.floor(spoolFrags.filter(x => x.ok).length / 2)
              const hTotal = 3
              const hHave = silkHearts.filter(x => x.ok).length
              const miscTotal = 2
              const miscHave = miscItems.filter(x => x.ok).length
              const crestTotal = 6
              const crestHave = crests.filter(x => x.ok).length
              const skillTotal = 6
              const skillHave = skills.filter(x => x.ok).length
              const abilityTotal = 6
              const abilityHave = abilities.filter(x => x.ok).length
              const totalHave = tHave + nHave + tpHave + ckHave + mHave + sHave + hHave + miscHave + crestHave + skillHave + abilityHave
              const totalMax = tTotal + nTotal + tpTotal + ckTotal + mTotal + sTotal + hTotal + miscTotal + crestTotal + skillTotal + abilityTotal
              return { have: totalHave, total: totalMax }
            })()
            const detailsItems = (key: string) => {
              if (key === 'nail') {
                const mapOk: Record<string, boolean> = { u1: nail.u1, u2: nail.u2, u3: nail.u3, u4: nail.u4 }
                return makeItemRowsFromDefs(NAIL_UPGRADES as NailUpgrade[], mapOk, actFilter, hideFound)
              }
              if (key === 'toolPouch') {
                const mapOk: Record<string, boolean> = { u1: toolPouch.u1, u2: toolPouch.u2, u3: toolPouch.u3, u4: toolPouch.u4 }
                return makeItemRowsFromDefs(TOOL_POUCH_UPGRADES, mapOk, actFilter, hideFound)
              }
              if (key === 'craftingKit') {
                const mapOk: Record<string, boolean> = { u1: craftingKit.u1, u2: craftingKit.u2, u3: craftingKit.u3, u4: craftingKit.u4 }
                return makeItemRowsFromDefs(CRAFTING_KIT_UPGRADES, mapOk, actFilter, hideFound)
              }
              if (key === 'tools') return tools.map(t => {
                const meta = TOOL_ITEMS.find(tm => tm.display === t.name)
                return { key: `tool-${t.name}`, name: t.name, ok: t.isUnlocked, link: t.link, act: meta?.whichAct ?? 0 }
              }).filter(it => (actFilter === 0 || (typeof it.act !== 'undefined' && it.act === actFilter)) && (!hideFound ? true : !it.ok))
              if (key === 'ancientMasks') {
                return maskShards.filter(s => (actFilter === 0 || s.act === actFilter) && (!hideFound ? true : !s.ok)).map((s, i) => ({ key: `mask-${i}`, name: s.name, ok: s.ok, link: s.link, act: s.act }))
              }
              if (key === 'silkSpool') {
                return spoolFrags.filter(s => (actFilter === 0 || s.act === actFilter) && (!hideFound ? true : !s.ok)).map((s, i) => ({ key: `spool-${i}`, name: s.name, ok: s.ok, link: s.link, act: s.act }))
              }
              if (key === 'silkHearts') {
                return silkHearts.filter(h => (actFilter === 0 || h.act === actFilter) && (!hideFound ? true : !h.ok)).map((h, i) => ({ key: `heart-${i}`, name: h.name, ok: h.ok, link: h.link, act: h.act }))
              }
              if (key === 'misc') {
                return miscItems.filter(m => (actFilter === 0 || m.act === actFilter) && (!hideFound ? true : !m.ok)).map((m, i) => ({ key: `misc-${i}`, name: m.name, ok: m.ok, link: m.link, act: m.act }))
              }
              if (key === 'crests') {
                return crests.filter(c => (actFilter === 0 || c.act === actFilter) && (!hideFound ? true : !c.ok)).map((c, i) => ({ key: `crest-${i}`, name: c.name, ok: c.ok, link: c.link, act: c.act }))
              }
              if (key === 'skills') {
                return skills.filter(s => (actFilter === 0 || s.act === actFilter) && (!hideFound ? true : !s.ok)).map((s, i) => ({ key: `skill-${i}`, name: s.name, ok: s.ok, link: s.link, act: s.act }))
              }
              if (key === 'abilities') {
                return abilities.filter(a => (actFilter === 0 || a.act === actFilter) && (!hideFound ? true : !a.ok)).map((a, i) => ({ key: `ability-${i}`, name: a.name, ok: a.ok, link: a.link, act: a.act }))
              }
              if (key === 'huntersJournal') {
                let list = hunterEntries
                if (hunterFilter === 'found') list = list.filter(h => h.kills > 0)
                else if (hunterFilter === 'notFound') list = list.filter(h => h.kills === 0)
                else if (hunterFilter === 'incomplete') list = list.filter(h => h.kills > 0 && h.kills < h.target)
                return list
                  .slice()
                  .sort((a, b) => getHunterOrder(a.name) - getHunterOrder(b.name))
                  .map((h, i) => ({
                    key: `hunter-${i}`,
                    originalName: h.name,
                    enemyName: HUNTER_NAME_MAP[h.name] ?? h.name,
                    name: `${HUNTER_NAME_MAP[h.name] ?? h.name} — ${h.kills}/${h.target}`,
                    ok: h.kills >= h.target,
                    optional: h.optional,
                    link: HUNTER_MAP_LINKS[h.name] ?? 'Empty',
                  }))
              }
              const def = categories.find(c => c.key === key)
              return (def?.items ?? []).map((n, i) => ({ key: `${key}-${i}`, name: n, ok: false }))
            }
            const selected = categories.find(c => c.key === selectedCategory) ?? (selectedCategory === 'huntersJournal' ? hunterJournalCategory : null)
            return (
              <div className="overview-layout">
                <div>
                  {(() => {
                    const completionPercentage = globalTotals.total > 0 ? Math.round((globalTotals.have / globalTotals.total) * 100) : 0
                    const getActTotals = (act: 1 | 2 | 3) => {
                      let itemsHave = 0, itemsTotal = 0
                      const actTools = tools.filter(t => {
                        const meta = TOOL_ITEMS.find(tm => tm.display === t.name)
                        return meta?.whichAct === act
                      })
                      const toolsHave = actTools.filter(t => t.isUnlocked).length
                      const toolsTotal = actTools.length
                      itemsHave += toolsHave
                      itemsTotal += toolsTotal

                      const actNails = NAIL_UPGRADES.filter(n => n.whichAct === act)
                      const nailsHave = actNails.filter(n => n.key === 'u1' ? nail.u1 : n.key === 'u2' ? nail.u2 : n.key === 'u3' ? nail.u3 : nail.u4).length
                      const nailsTotal = actNails.length
                      itemsHave += nailsHave
                      itemsTotal += nailsTotal

                      const actToolPouch = TOOL_POUCH_UPGRADES.filter(tp => tp.whichAct === act)
                      const tpHave = actToolPouch.filter(tp => tp.key === 'u1' ? toolPouch.u1 : tp.key === 'u2' ? toolPouch.u2 : tp.key === 'u3' ? toolPouch.u3 : toolPouch.u4).length
                      const tpTotal = actToolPouch.length
                      itemsHave += tpHave
                      itemsTotal += tpTotal

                      const actCraftingKit = CRAFTING_KIT_UPGRADES.filter(ck => ck.whichAct === act)
                      const ckHave = actCraftingKit.filter(ck => ck.key === 'u1' ? craftingKit.u1 : ck.key === 'u2' ? craftingKit.u2 : ck.key === 'u3' ? craftingKit.u3 : craftingKit.u4).length
                      const ckTotal = actCraftingKit.length
                      itemsHave += ckHave
                      itemsTotal += ckTotal

                      const actMaskFragments = maskShards.filter(m => m.act === act)
                      const maskFragsHave = actMaskFragments.filter(m => m.ok).length
                      const maskFragsTotal = actMaskFragments.length
                      itemsHave += maskFragsHave
                      itemsTotal += maskFragsTotal

                      const actSpoolFragments = spoolFrags.filter(s => s.act === act)
                      const spoolFragsHave = actSpoolFragments.filter(s => s.ok).length
                      const spoolFragsTotal = actSpoolFragments.length
                      itemsHave += spoolFragsHave
                      itemsTotal += spoolFragsTotal

                      const categories = [silkHearts, miscItems, crests, skills, abilities]
                      categories.forEach(category => {
                        const actItems = category.filter(item => item.act === act)
                        const have = actItems.filter(item => item.ok).length
                        const total = actItems.length
                        itemsHave += have
                        itemsTotal += total
                      })

                      return { itemsHave, itemsTotal }
                    }

                    const act1 = getActTotals(1)
                    const act2 = getActTotals(2)
                    const act3 = getActTotals(3)



                    return (
                      <div style={{ textAlign: 'center', marginBottom: '20px', padding: '16px', background: 'linear-gradient(135deg, #151a26 0%, #0a0f14 100%)', borderRadius: '12px', border: '1px solid #252f3c' }}>
                        <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '8px', fontWeight: '500' }}>
                          {t('overallCompletion')}
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: globalTotals.have === globalTotals.total ? '#2ecc71' : '#ff7a86', marginBottom: '12px' }}>
                          {globalTotals.have} / {globalTotals.total}
                        </div>

                        <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px', textAlign: 'center', position: 'relative' }}>
                          {t('individualItems')}{' '}
                          <button
                            style={{
                              background: 'none',
                              border: '1px solid #64748b',
                              borderRadius: '50%',
                              width: '14px',
                              height: '14px',
                              fontSize: '10px',
                              color: '#64748b',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '4px'
                            }}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={() => setShowTooltip(!showTooltip)}
                          >
                            ?
                          </button>
                          {showTooltip && (
                            <div style={{
                              position: 'absolute',
                              top: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: '#1e293b',
                              color: '#e2e8f0',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              whiteSpace: 'nowrap',
                              zIndex: 1000,
                              border: '1px solid #334155',
                              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                              marginTop: '4px'
                            }}>
                              {t('tooltipText').split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                  {line}
                                  {i < t('tooltipText').split('\n').length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', gap: '12px' }}>
                          <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: act1.itemsHave === act1.itemsTotal ? '#2ecc71' : '#94a3b8' }}>
                              {act1.itemsHave} / {act1.itemsTotal}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{t('act1')}</div>
                          </div>
                          <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: act2.itemsHave === act2.itemsTotal ? '#2ecc71' : '#94a3b8' }}>
                              {act2.itemsHave} / {act2.itemsTotal}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{t('act2')}</div>
                          </div>
                          <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: act3.itemsHave === act3.itemsTotal ? '#2ecc71' : '#94a3b8' }}>
                              {act3.itemsHave} / {act3.itemsTotal}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{t('act3')}</div>
                          </div>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${completionPercentage}%`, height: '100%', background: globalTotals.have === globalTotals.total ? '#2ecc71' : '#3b82f6', transition: 'width 0.3s ease' }} />
                        </div>
                      </div>
                    )
                  })()}
                  <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button className={`btn small ${actFilter === 0 ? 'primary' : ''}`} onClick={() => setActFilter(0)}>{t('all')}</button>
                    <button className={`btn small ${actFilter === 1 ? 'primary' : ''}`} onClick={() => setActFilter(1)}>{t('act1')}</button>
                    <button className={`btn small ${actFilter === 2 ? 'primary' : ''}`} onClick={() => setActFilter(2)}>{t('act2')}</button>
                    <button className={`btn small ${actFilter === 3 ? 'primary' : ''}`} onClick={() => setActFilter(3)}>{t('act3')}</button>
                  </div>
                  <div className="placeholder-grid">
                    {categories.map(c => (
                      <div key={c.key} className="placeholder-card clickable" onClick={() => setSelectedCategory(c.key)}>
                        <div className="ph-title">
                          {c.name}
                          {actFilter !== 0 && (c.key === 'ancientMasks' || c.key === 'silkSpool') && (
                            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'normal', marginTop: '2px' }}>
                              {c.key === 'ancientMasks' ? t('individualShards') : t('individualFragments')}
                            </div>
                          )}
                        </div>
                        {(() => {
                          const pr = categoryProgress(c.key);
                          const isDone = complete(c.key);

                          if (actFilter === 0 && (c.key === 'ancientMasks' || c.key === 'silkSpool')) {
                            const fragments = c.key === 'ancientMasks'
                              ? maskShards.filter(x => x.ok).length + '/' + maskShards.length
                              : spoolFrags.filter(x => x.ok).length + '/' + spoolFrags.length;

                            return (
                              <div>
                                <div className="ph-sub" style={{ color: isDone ? '#2ecc71' : '#ff7a86' }}>
                                  {pr.have} / {pr.total}
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                  {fragments} {c.key === 'ancientMasks' ? t('shards') : t('fragments')}
                                </div>
                              </div>
                            );
                          }

                          return (<div className="ph-sub" style={{ color: isDone ? '#2ecc71' : '#ff7a86' }}>{pr.have} / {pr.total}</div>)
                        })()}
                      </div>
                    ))}
                    <div className="placeholder-card clickable">
                        <div className="ph-title">
                          {'All Missing Items'}
                        </div>
                      <a className="btn small" href={getMissingItems()}> Open map </a>
                    </div>
                  </div>
                  <div className="hunters-journal-card" onClick={() => setSelectedCategory('huntersJournal')} style={{ marginTop: '16px', padding: '16px', background: 'linear-gradient(135deg, #151a26 0%, #0a0f14 100%)', borderRadius: '12px', border: '2px solid #252f3c', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                    <div style={{ background: 'transparent', border: 'none', padding: 0 }}>
                      <div className="ph-title" style={{ fontSize: '18px', marginBottom: '12px' }}>
                        {hunterJournalCategory.name}
                      </div>
                      {(() => {
                        const requiredEntries = hunterEntries.filter(h => !h.optional)
                        const killed = requiredEntries.filter(h => h.kills >= h.target).length
                        const found = requiredEntries.filter(h => h.kills > 0).length
                        const totalRequired = requiredEntries.length
                        const isDone = killed === totalRequired

                        return (
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                              <div className="ph-sub" style={{ color: isDone ? '#2ecc71' : '#ff7a86', fontSize: '20px', marginBottom: '8px' }}>
                                {killed} / {totalRequired}
                                <span
                                  style={{
                                    fontSize: '14px',
                                    color: '#94a3b8',
                                    marginLeft: '8px',
                                    cursor: 'help',
                                    padding: '2px 6px',
                                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(148, 163, 184, 0.2)'
                                  }}
                                  title={t('hjMaxTooltip')}
                                >
                                  {t('hjMaxLabel')}
                                </span>
                              </div>
                              <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                                <div style={{ color: '#94a3b8' }}>
                                  {t('hjFoundCount')}: <span style={{ color: '#e2e8f0', fontWeight: 'bold' }}>{found}/{totalRequired}</span>
                                </div>
                                <div style={{ color: '#94a3b8' }}>
                                  {t('hjKilledCount')}: <span style={{ color: '#e2e8f0', fontWeight: 'bold' }}>{killed}/{totalRequired}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                </div>
                <div className="details-panel">
                  <div className="details-header">
                    <div className="details-title">{selected ? selected.name : t('details')}</div>
                    <div className="details-sub">
                      {selected ? (
                        selected.key === 'huntersJournal' ? (
                          <span>
                            {hunterEntries.filter(h => !h.optional).length} {t('total')}
                            {' '}
                            <span
                              style={{
                                cursor: 'help',
                                padding: '2px 6px',
                                backgroundColor: 'rgba(148, 163, 184, 0.1)',
                                borderRadius: '4px',
                                border: '1px solid rgba(148, 163, 184, 0.2)',
                                color: '#94a3b8'
                              }}
                              title={t('hjMaxTooltip')}
                            >
                              {t('hjMaxLabel')}
                            </span>
                          </span>
                        ) : (
                          `${selected.percent} ${t('total')}`
                        )
                      ) : (
                        t('selectCategory')
                      )}
                    </div>
                  </div>
                  <div className="filters-row">
                    {selected?.key === 'huntersJournal' ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className={`btn small ${hunterFilter === 'all' ? 'primary' : ''}`} onClick={() => setHunterFilter('all')}>{t('showAll')}</button>
                        <button className={`btn small ${hunterFilter === 'found' ? 'primary' : ''}`} onClick={() => setHunterFilter('found')}>{t('hjFound')}</button>
                        <button className={`btn small ${hunterFilter === 'notFound' ? 'primary' : ''}`} onClick={() => setHunterFilter('notFound')}>{t('hjNotFound')}</button>
                        <button className={`btn small ${hunterFilter === 'incomplete' ? 'primary' : ''}`} onClick={() => setHunterFilter('incomplete')}>{t('hjIncomplete')}</button>
                      </div>
                    ) : (
                      <button className={`btn small ${hideFound ? 'primary' : ''}`} onClick={() => setHideFound(v => !v)}>{hideFound ? t('showAll') : t('showOnlyMissing')}</button>
                    )}
                  </div>
                  <div className="details-content">
                    {(() => {
                      const rows = (selected ? detailsItems(selected.key) : [])
                      const cat = (selected?.key ?? 'tools') as GameCategory

                      if (cat === 'huntersJournal') {

                        return (
                          <div className="enemies-grid">
                            {rows.map((it: any, idx: number) => {
                              const nameKey = it.enemyName ?? it.name
                              const translatedName = gameTr.name(cat, nameKey, nameKey)
                              const displayName = it.name.includes('—')
                                ? it.name.replace(it.enemyName ?? nameKey, translatedName)
                                : translatedName


                              const match = it.name.match(/(\d+)\/(\d+)$/)
                              const kills = match ? parseInt(match[1]) : 0
                              const target = match ? parseInt(match[2]) : 0

                              return (
                                <EnemyCard
                                  key={it.key ?? `enemy-${idx}`}
                                  enemyName={it.originalName ?? it.enemyName ?? nameKey}
                                  displayName={translatedName}
                                  kills={kills}
                                  target={target}
                                  isCompleted={it.ok}
                                  isOptional={it.optional}
                                  link={it.link}
                                />
                              )
                            })}
                          </div>
                        )
                      }


                      return rows.map((it: any, idx: number) => {
                        const actVal = (it as any).act as number | undefined
                        const hasLink = Boolean(it.link && it.link.length > 0 && it.link !== '#')
                        const nameKey = it.name
                        const translatedName = gameTr.name(cat, nameKey, nameKey)
                        const displayName = translatedName

                        return (
                          <div key={it.key ?? `${selected?.key ?? 'none'}-${idx}`} className="item-row">
                            {typeof actVal !== 'undefined' ? (
                              <span className={`act-badge act-${actVal ?? 0}`}>{t('actLabel')} {actVal ?? '?'}</span>
                            ) : (
                              <span className={`act-badge act-0`} style={{ visibility: 'hidden' }}>{t('actLabel')} 0</span>
                            )}
                            <span className="item-name">{displayName}</span>
                            <a className="btn small" href={hasLink ? it.link : '#'} target="_blank" rel="noopener noreferrer" aria-disabled={hasLink ? undefined : true} style={hasLink ? undefined : { pointerEvents: 'none', opacity: 0.5 }}>{t('openMap')}</a>
                            <span className={`badge ${it.ok ? 'ok' : 'no'}`} aria-label={it.ok ? t('obtained') : t('notObtained')} title={it.ok ? t('obtained') : t('notObtained')}>{it.ok ? '✓' : '✗'}</span>
                          </div>
                        )
                      })
                    })()}
                  </div>
                </div>
              </div>

            )
          })()}
        </section>
      )}
    </div>

  )
}

export default App
