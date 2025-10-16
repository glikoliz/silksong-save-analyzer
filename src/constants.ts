export type ToolMapping = { display: string; ingame: string[]; link: string; whichAct?: 1 | 2 | 3 }

export type SpoolEntry = {
  display: string
  link: string
  whichAct: 1 | 2
  type: 'sceneData' | 'flag' | 'quest'
  ingame?: [string, string]
  flag?: string
  questName?: string
}

export const SPOOL_FRAGMENTS: SpoolEntry[] = [
  { display: 'Spool Fragment: Bonebottom', whichAct: 1, link: 'https:
  { display: 'Spool Fragment: Deep Docks', whichAct: 1, link: 'https:
  { display: 'Spool Fragment: Greymoor', whichAct: 1, link: 'https:
  { display: 'Spool Fragment: Slab', whichAct: 1, link: 'https:
  { display: 'Spool Fragment: Weavenest Atla', whichAct: 1, link: 'https:
  { display: 'Spool Fragment: Bellhart', whichAct: 1, link: 'https:
  { display: 'Spool Fragment: Fleamaster reward', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Cogwork Core', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Underworks(right)', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Grand Gate', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Underworks(arena)', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Whiteward', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Whiteward Sherma', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Deep Docks(bottom right)', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: High Halls', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Memorium', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Blasted Steps', whichAct: 2, link: 'https:
  { display: 'Spool Fragment: Songclave', whichAct: 2, link: 'https:
]

export const TOOL_MAPPING: ToolMapping[] = [
  { display: 'Barbed Bracelet', ingame: ['Barbed Wire'], link: 'https:
  { display: 'Compass', ingame: ['Compass'], link: 'https:
  { display: 'Curveclaw', ingame: ['Curve Claws', 'Curve Claws Upgraded'], link: 'https:
  { display: 'Dead Bug’s Purse', ingame: ['Dead Mans Purse', 'Shell Satchel'], link: 'https:
  { display: 'Druid’s Eye', ingame: ['Mosscreep Tool 1', 'Mosscreep Tool 2'], link: 'https:
  { display: 'Flea Brew', ingame: ['Flea Brew'], link: 'https:
  { display: 'Flintslate', ingame: ['Flintstone'], link: 'https:
  { display: 'Fractured Mask', ingame: ['Fractured Mask'], link: 'https:
  { display: 'Longpin', ingame: ['Harpoon'], link: 'https:
  { display: 'Magma Bell', ingame: ['Lava Charm'], link: 'https:
  { display: 'Magnetite Brooch', ingame: ['Rosary Magnet'], link: 'https:
  { display: 'Magnetite Dice', ingame: ['Magnetite Dice'], link: 'https:
  { display: 'Multibinder', ingame: ['Multibind'], link: 'https:
  { display: 'Pimpillo', ingame: ['Pimpilo'], link: 'https:
  { display: 'Plasmium Phial', ingame: ['Lifeblood Syringe'], link: 'https:
  { display: 'Pollip Pouch', ingame: ['Poison Pouch'], link: 'https:
  { display: 'Shard Pendant', ingame: ['Bone Necklace'], link: 'https:
  { display: 'Silkshot', ingame: ['WebShot Architect', 'WebShot Forge', 'WebShot Weaver'], link: 'https:
  { display: 'Silkspeed Anklets', ingame: ['Sprintmaster'], link: 'https:
  { display: 'Sting Shard', ingame: ['Sting Shard'], link: 'https:
  { display: 'Straight Pin', ingame: ['Straight Pin'], link: 'https:
  { display: 'Tacks', ingame: ['Tack'], link: 'https:
  { display: 'Threefold Pin', ingame: ['Tri Pin'], link: 'https:
  { display: 'Warding Bell', ingame: ['Bell Bind'], link: 'https:
  { display: 'Weavelight', ingame: ['White Ring'], link: 'https:
  { display: 'Weighted Belt', ingame: ['Weighted Anklet'], link: 'https:

  { display: 'Ascendant’s Grip', ingame: ['Wallcling'], link: 'https:
  { display: 'Claw Mirror', ingame: ['Dazzle Bind', 'Dazzle Bind Upgraded'], link: 'https:
  { display: 'Cogfly', ingame: ['Cogwork Flier'], link: 'https:
  { display: 'Cogwork Wheel', ingame: ['Cogwork Saw'], link: 'https:
  { display: 'Conchcutter', ingame: ['Conch Drill'], link: 'https:
  { display: 'Delver’s Drill', ingame: ['Screw Attack'], link: 'https:
  { display: 'Egg of Flealia', ingame: ['Flea Charm'], link: 'https:
  { display: 'Injector Band', ingame: ['Quickbind'], link: 'https:
  { display: 'Longclaw', ingame: ['Longneedle'], link: 'https:
  { display: 'Memory Crystal', ingame: ['Revenge Crystal'], link: 'https:
  { display: 'Quick Sling', ingame: ['Quick Sling'], link: 'https:
  { display: 'Reserve Bind', ingame: ['Reserve Bind'], link: 'https:
  { display: 'Rosary Cannon', ingame: ['Rosary Cannon'], link: 'https:
  { display: 'Sawtooth Circlet', ingame: ['Brolly Spike'], link: 'https:
  { display: 'Scuttlebrace', ingame: ['Scuttlebrace'], link: 'https:
  { display: 'Snitch Pick', ingame: ['Thief Claw'], link: 'https:
  { display: 'Spider Strings', ingame: ['Musician Charm'], link: 'https:
  { display: 'Spool Extender', ingame: ['Spool Extender'], link: 'https:
  { display: 'Thief’s Mark', ingame: ['Thief Charm'], link: 'https:
  { display: 'Throwing Ring', ingame: ['Shakra Ring'], link: 'https:
  { display: 'Volt Filament', ingame: ['Zap Imbuement'], link: 'https:
  { display: 'Voltvessels', ingame: ['Lightning Rod'], link: 'https:
  { display: 'Wispfire Lantern', ingame: ['Wisp Lantern'], link: 'https:
  { display: 'Wreath of Purity', ingame: ['Maggot Charm'], link: 'https:

  { display: 'Pin Badge', ingame: ['Pinstress Tool'], link: 'https:
]



export type BaseEntry = { display: string; link: string; whichAct: 0 | 1 | 2 | 3 }

export class GameItem implements BaseEntry {
  display: string
  ingame: string[]
  link: string
  whichAct: 0 | 1 | 2 | 3
  constructor(params: { display: string; ingame?: string[]; link: string; whichAct?: 0 | 1 | 2 | 3 }) {
    this.display = params.display
    this.ingame = params.ingame ?? []
    this.link = params.link
    this.whichAct = params.whichAct ?? 0
  }
}
export type ToolItemDef = BaseEntry & { ingame: string[] }

export const TOOL_ITEMS: ToolItemDef[] = TOOL_MAPPING.map(t => ({
  display: t.display,
  ingame: t.ingame,
  link: t.link,
  whichAct: t.whichAct ?? 0,
}))

export type MaskSource =
  | { type: 'sceneData'; ingame: [string, string] }
  | { type: 'flag'; flag: string }
  | { type: 'quest'; questName: string }

export type MaskEntry = { display: string; link: string; whichAct: 1 | 2 | 3 } & MaskSource

export type NailUpgrade = BaseEntry & { key: 'u1' | 'u2' | 'u3' | 'u4'; ingame: string[] }

export const NAIL_UPGRADES: NailUpgrade[] = [
  { key: 'u1', display: 'Needle upgrade 1', link: 'https:
  { key: 'u2', display: 'Needle upgrade 2', link: 'https:
  { key: 'u3', display: 'Needle upgrade 3', link: 'https:
  { key: 'u4', display: 'Needle upgrade 4', link: 'https:
]

export const MASKS: MaskEntry[] = [
  { display: 'Mask Shard 1', whichAct: 1, link: 'https:
  { display: 'Mask Shard 2', whichAct: 1, link: 'https:
  { display: 'Mask Shard 3', whichAct: 1, link: 'https:
  { display: 'Mask Shard 4', whichAct: 1, link: 'https:
  { display: 'Mask Shard 5', whichAct: 1, link: 'https:
  { display: 'Mask Shard 6', whichAct: 1, link: 'https:
  { display: 'Mask Shard 7', whichAct: 1, link: 'https:
  { display: 'Mask Shard 8', whichAct: 2, link: 'https:
  { display: 'Mask Shard 9', whichAct: 2, link: 'https:
  { display: 'Mask Shard 10', whichAct: 2, link: 'https:
  { display: 'Mask Shard 11', whichAct: 2, link: 'https:
  { display: 'Mask Shard 12', whichAct: 2, link: 'https:
  { display: 'Mask Shard 13', whichAct: 2, link: 'https:
  { display: 'Mask Shard 14', whichAct: 2, link: 'https:
  { display: 'Mask Shard 15', whichAct: 2, link: 'https:
  { display: 'Mask Shard 16', whichAct: 2, link: 'https:
  { display: 'Mask Shard 17', whichAct: 3, link: 'https:
  { display: 'Mask Shard 18', whichAct: 3, link: 'https:
  { display: 'Mask Shard 19', whichAct: 3, link: 'https:
  { display: 'Mask Shard 20', whichAct: 3, link: 'https:
]

export const MASK_ITEMS: GameItem[] = MASKS.map(m => {
  if (m.type === 'sceneData') {
    const exact = `${m.ingame[0]}|${m.ingame[1]}`
    const base = `${m.ingame[0]}|Heart Piece`
    const keys = m.ingame[1] === 'Heart Piece' ? [exact] : [exact, base]
    return new GameItem({ display: m.display, ingame: keys, link: m.link, whichAct: m.whichAct })
  }
  if (m.type === 'flag') {
    return new GameItem({ display: m.display, ingame: [m.flag], link: m.link, whichAct: m.whichAct })
  }
  return new GameItem({ display: m.display, ingame: [m.questName], link: m.link, whichAct: m.whichAct })
})

export type SilkHeartEntry = {
  display: string
  link: string
  whichAct: 1 | 2 | 3
  sceneName: string
  id: string
}

export const SILK_HEARTS: SilkHeartEntry[] = [
  { display: 'Silk Heart 1', sceneName: 'Memory_Silk_Heart_BellBeast', id: 'glow_rim_Remasker', link: 'https:
  { display: 'Silk Heart 2', sceneName: 'Memory_Silk_Heart_WardBoss', id: 'glow_rim_Remasker', link: 'https:
  { display: 'Silk Heart 3', sceneName: 'Memory_Silk_Heart_LaceTower', id: 'glow_rim_Remasker', link: 'https:
]
export type MiscSource =
  | { type: 'flag'; flag: string }
  | { type: 'collectable'; name: string; amount: number }

export type MiscEntry = { display: string; link: string; whichAct: 1 | 2 | 3 } & MiscSource

export const MISC_ITEMS: MiscEntry[] = [
  { display: 'Sylphsong', link: 'https:
  { display: 'Everbloom', link: 'https:
]
export type CrestEntry = {
  display: string
  link: string
  whichAct: 1 | 2 | 3
  internalId: string
}

export const CRESTS: CrestEntry[] = [
  { display: 'Wanderer', link: 'https:
  { display: 'Reaper', link: 'https:
  { display: 'Beast', link: 'https:
  { display: 'Architect', link: 'https:
  { display: 'Witch', link: 'https:
  { display: 'Shaman', link: 'https:
]
export type SkillEntry = {
  display: string
  link: string
  whichAct: 1 | 2 | 3
  internalId: string
}

export const SKILLS: SkillEntry[] = [
  { display: 'Silkspear', link: 'https:
  { display: 'Thread Storm', link: 'https:
  { display: 'Cross Stitch', link: 'https:
  { display: 'Rune Rage', link: 'https:
  { display: 'Sharpdart', link: 'https:
  { display: 'Pale Nails', link: 'https:
]
export type ToolPouchUpgrade = BaseEntry & { key: 'u1' | 'u2' | 'u3' | 'u4'; ingame: string[] }

export const TOOL_POUCH_UPGRADES: ToolPouchUpgrade[] = [
  {key: 'u1', display: 'Tool Pouch upgrade 1', link: 'https:
  { key: 'u2', display: 'Tool Pouch upgrade 2', link: 'https:
  { key: 'u3', display: 'Tool Pouch upgrade 3', link: 'https:
  { key: 'u4', display: 'Tool Pouch upgrade 4', link: 'https:
]
export type CraftingKitUpgrade = BaseEntry & { key: 'u1' | 'u2' | 'u3' | 'u4'; ingame: string[] }

export const CRAFTING_KIT_UPGRADES: CraftingKitUpgrade[] = [
  { key: 'u1', display: 'Crafting Kit upgrade 1', link: 'https:
  { key: 'u4', display: 'Crafting Kit upgrade 2', link: 'https:
  { key: 'u2', display: 'Crafting Kit upgrade 3', link: 'https:
  { key: 'u3', display: 'Crafting Kit upgrade 4', link: 'https:
]
export type AbilityEntry = {
  display: string
  link: string
  whichAct: 1 | 2 | 3
  flag: string
}

export const ABILITIES: AbilityEntry[] = [
  { display: 'Swift Step', link: 'https:
  { display: 'Cling Grip', link: 'https:
  { display: 'Needolin', link: 'https:
  { display: 'Needle Strike', link: 'https:
  { display: 'Clawline', link: 'https:
  { display: 'Silk Soar', link: 'https:
]