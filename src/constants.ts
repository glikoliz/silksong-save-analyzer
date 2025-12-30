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
  { display: 'Spool Fragment: Bonebottom', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478080', type: 'sceneData', ingame: ['Bone_11b', 'Silk Spool'] },
  { display: 'Spool Fragment: Deep Docks', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477926', type: 'sceneData', ingame: ['Bone_East_13', 'Silk Spool'] },
  { display: 'Spool Fragment: Greymoor', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478263', type: 'sceneData', ingame: ['Greymoor_02', 'Silk Spool'] },
  { display: 'Spool Fragment: Slab', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478475', type: 'sceneData', ingame: ['Peak_01', 'Silk Spool'] },
  { display: 'Spool Fragment: Weavenest Atla', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478230', type: 'sceneData', ingame: ['Weave_11', 'Silk Spool'] },
  { display: 'Spool Fragment: Bellhart', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478347', type: 'flag', flag: 'PurchasedBelltownSpoolSegment' },
  { display: 'Spool Fragment: Fleamaster reward', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478820', type: 'flag', flag: 'MerchantEnclaveSpoolPiece' },
  { display: 'Spool Fragment: Cogwork Core', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478618', type: 'sceneData', ingame: ['Cog_07', 'Silk Spool'] },
  { display: 'Spool Fragment: Underworks(right)', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478704', type: 'sceneData', ingame: ['Library_11b', 'Silk Spool'] },
  { display: 'Spool Fragment: Grand Gate', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478586', type: 'sceneData', ingame: ['Song_19_entrance', 'Silk Spool'] },
  { display: 'Spool Fragment: Underworks(arena)', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478931', type: 'sceneData', ingame: ['Under_10', 'Silk Spool'] },
  { display: 'Spool Fragment: Whiteward', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479317', type: 'sceneData', ingame: ['Ward_01', 'Silk Spool'] },
  { display: 'Spool Fragment: Whiteward Sherma', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479180', type: 'quest', questName: 'Save Sherma' },
  { display: 'Spool Fragment: Deep Docks(bottom right)', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478825', type: 'sceneData', ingame: ['Dock_03c', 'Silk Spool'] },
  { display: 'Spool Fragment: High Halls', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478909', type: 'sceneData', ingame: ['Hang_03_top', 'Silk Spool'] },
  { display: 'Spool Fragment: Memorium', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479117', type: 'sceneData', ingame: ['Arborium_09', 'Silk Spool'] },
  { display: 'Spool Fragment: Blasted Steps', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478527', type: 'flag', flag: 'purchasedGrindleSpoolPiece' },
  { display: 'Spool Fragment: Songclave', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479249', type: 'flag', flag: 'MerchantEnclaveSpoolPiece' },
]

export const TOOL_MAPPING: ToolMapping[] = [
  { display: 'Barbed Bracelet', ingame: ['Barbed Wire'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478341', whichAct: 1 },
  { display: 'Compass', ingame: ['Compass'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477851', whichAct: 1 },
  { display: 'Curveclaw', ingame: ['Curve Claws', 'Curve Claws Upgraded'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478604', whichAct: 1 },
  { display: 'Dead Bug’s Purse', ingame: ['Dead Mans Purse', 'Shell Satchel'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479081', whichAct: 1 },
  { display: 'Druid’s Eye', ingame: ['Mosscreep Tool 1', 'Mosscreep Tool 2'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478255', whichAct: 1 },
  { display: 'Flea Brew', ingame: ['Flea Brew'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478025', whichAct: 1 },
  { display: 'Flintslate', ingame: ['Flintstone'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477986', whichAct: 1 },
  { display: 'Fractured Mask', ingame: ['Fractured Mask'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478607', whichAct: 1 },
  { display: 'Longpin', ingame: ['Harpoon'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478158', whichAct: 1 },
  { display: 'Magma Bell', ingame: ['Lava Charm'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477918', whichAct: 1 },
  { display: 'Magnetite Brooch', ingame: ['Rosary Magnet'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477841', whichAct: 1 },
  { display: 'Magnetite Dice', ingame: ['Magnetite Dice'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479309', whichAct: 1 },
  { display: 'Multibinder', ingame: ['Multibind'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478345', whichAct: 1 },
  { display: 'Pimpillo', ingame: ['Pimpilo'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478964', whichAct: 1 },
  { display: 'Plasmium Phial', ingame: ['Lifeblood Syringe'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478496', whichAct: 1 },
  { display: 'Pollip Pouch', ingame: ['Poison Pouch'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478294', whichAct: 1 },
  { display: 'Shard Pendant', ingame: ['Bone Necklace'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477848', whichAct: 1 },
  { display: 'Silkshot', ingame: ['WebShot Architect', 'WebShot Forge', 'WebShot Weaver'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479364', whichAct: 1 },
  { display: 'Silkspeed Anklets', ingame: ['Sprintmaster'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478216', whichAct: 1 },
  { display: 'Sting Shard', ingame: ['Sting Shard'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477917', whichAct: 1 },
  { display: 'Straight Pin', ingame: ['Straight Pin'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477899', whichAct: 1 },
  { display: 'Tacks', ingame: ['Tack'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478365', whichAct: 1 },
  { display: 'Threefold Pin', ingame: ['Tri Pin'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478058', whichAct: 1 },
  { display: 'Warding Bell', ingame: ['Bell Bind'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477935', whichAct: 1 },
  { display: 'Weavelight', ingame: ['White Ring'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479070', whichAct: 1 },
  { display: 'Weighted Belt', ingame: ['Weighted Anklet'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477947', whichAct: 1 },

  { display: 'Ascendant’s Grip', ingame: ['Wallcling'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478878', whichAct: 2 },
  { display: 'Claw Mirror', ingame: ['Dazzle Bind', 'Dazzle Bind Upgraded'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478691', whichAct: 2 },
  { display: 'Cogfly', ingame: ['Cogwork Flier'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478903', whichAct: 2 },
  { display: 'Cogwork Wheel', ingame: ['Cogwork Saw'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478725', whichAct: 2 },
  { display: 'Conchcutter', ingame: ['Conch Drill'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479230', whichAct: 2 },
  { display: 'Delver’s Drill', ingame: ['Screw Attack'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478577', whichAct: 2 },
  { display: 'Egg of Flealia', ingame: ['Flea Charm'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479439', whichAct: 2 },
  { display: 'Injector Band', ingame: ['Quickbind'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479182', whichAct: 2 },
  { display: 'Longclaw', ingame: ['Longneedle'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479240', whichAct: 2 },
  { display: 'Memory Crystal', ingame: ['Revenge Crystal'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478947', whichAct: 2 },
  { display: 'Quick Sling', ingame: ['Quick Sling'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478848', whichAct: 2 },
  { display: 'Reserve Bind', ingame: ['Reserve Bind'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479254', whichAct: 2 },
  { display: 'Rosary Cannon', ingame: ['Rosary Cannon'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478937', whichAct: 2 },
  { display: 'Sawtooth Circlet', ingame: ['Brolly Spike'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478726', whichAct: 2 },
  { display: 'Scuttlebrace', ingame: ['Scuttlebrace'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478727', whichAct: 2 },
  { display: 'Snitch Pick', ingame: ['Thief Claw'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479201', whichAct: 2 },
  { display: 'Spider Strings', ingame: ['Musician Charm'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479248', whichAct: 2 },
  { display: 'Spool Extender', ingame: ['Spool Extender'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478881', whichAct: 2 },
  { display: 'Thief’s Mark', ingame: ['Thief Charm'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478525', whichAct: 2 },
  { display: 'Throwing Ring', ingame: ['Shakra Ring'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479242', whichAct: 2 },
  { display: 'Volt Filament', ingame: ['Zap Imbuement'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479224', whichAct: 2 },
  { display: 'Voltvessels', ingame: ['Lightning Rod'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479121', whichAct: 2 },
  { display: 'Wispfire Lantern', ingame: ['Wisp Lantern'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479156', whichAct: 2 },
  { display: 'Wreath of Purity', ingame: ['Maggot Charm'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479133', whichAct: 2 },

  { display: 'Pin Badge', ingame: ['Pinstress Tool'], link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479466', whichAct: 3 }
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
  { key: 'u1', display: 'Needle upgrade 1', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=480827', whichAct: 1, ingame: [] },
  { key: 'u2', display: 'Needle upgrade 2', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478668', whichAct: 2, ingame: [] },
  { key: 'u3', display: 'Needle upgrade 3', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479233', whichAct: 2, ingame: [] },
  { key: 'u4', display: 'Needle upgrade 4', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479582', whichAct: 3, ingame: [] },
]

export const MASKS: MaskEntry[] = [
  { display: 'Mask Shard 1', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477840', type: 'flag', flag: 'PurchasedBonebottomHeartPiece' },
  { display: 'Mask Shard 2', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478091', type: 'sceneData', ingame: ['Crawl_02', 'Heart Piece'] },
  { display: 'Mask Shard 3', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477975', type: 'sceneData', ingame: ['Bone_East_20', 'Heart Piece'] },
  { display: 'Mask Shard 4', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478177', type: 'sceneData', ingame: ['Shellwood_14', 'Heart Piece'] },
  { display: 'Mask Shard 5', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477901', type: 'sceneData', ingame: ['Dock_08', 'Heart Piece'] },
  { display: 'Mask Shard 6', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478233', type: 'sceneData', ingame: ['Weave_05b', 'Heart Piece'] },
  { display: 'Mask Shard 7', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478800', type: 'quest', questName: 'Beastfly Hunt' },
  { display: 'Mask Shard 8', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478615', type: 'sceneData', ingame: ['Song_09', 'Heart Piece'] },
  { display: 'Mask Shard 9', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478671', type: 'sceneData', ingame: ['Library_05', 'Heart Piece'] },
  { display: 'Mask Shard 10', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478849', type: 'sceneData', ingame: ['Shadow_13', 'Heart Piece'] },
  { display: 'Mask Shard 11', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478841', type: 'sceneData', ingame: ['Bone_East_LavaChallenge', 'Heart Piece (1)'] },
  { display: 'Mask Shard 12', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479001', type: 'sceneData', ingame: ['Slab_17', 'Heart Piece'] },
  { display: 'Mask Shard 13', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479038', type: 'sceneData', ingame: ['Peak_04c', 'Heart Piece'] },
  { display: 'Mask Shard 14', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479151', type: 'sceneData', ingame: ['Wisp_07', 'Heart Piece'] },
  { display: 'Mask Shard 15', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478879', type: 'flag', flag: 'MerchantEnclaveShellFragment' },
  { display: 'Mask Shard 16', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478498', type: 'sceneData', ingame: ['Coral_19b', 'Heart Piece'] },
  { display: 'Mask Shard 17', whichAct: 3, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479194', type: 'quest', questName: 'Sprintmaster Race' },
  { display: 'Mask Shard 18', whichAct: 3, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479447', type: 'quest', questName: 'Ant Trapper' },
  { display: 'Mask Shard 19', whichAct: 3, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479449', type: 'quest', questName: 'Destroy Thread Cores' },
  { display: 'Mask Shard 20', whichAct: 3, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479460', type: 'sceneData', ingame: ['Peak_06', 'Heart Piece'] },
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
  { display: 'Silk Heart 1', sceneName: 'Memory_Silk_Heart_BellBeast', id: 'glow_rim_Remasker', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477881', whichAct: 1 },
  { display: 'Silk Heart 2', sceneName: 'Memory_Silk_Heart_WardBoss', id: 'glow_rim_Remasker', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479082', whichAct: 2 },
  { display: 'Silk Heart 3', sceneName: 'Memory_Silk_Heart_LaceTower', id: 'glow_rim_Remasker', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479089', whichAct: 2 }
]
export type MiscSource =
  | { type: 'flag'; flag: string }
  | { type: 'collectable'; name: string; amount: number }

export type MiscEntry = { display: string; link: string; whichAct: 1 | 2 | 3 } & MiscSource

export const MISC_ITEMS: MiscEntry[] = [
  { display: 'Sylphsong', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479654', whichAct: 2, type: 'flag', flag: 'HasBoundCrestUpgrader' },
  { display: 'Everbloom', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479387', whichAct: 3, type: 'collectable', name: 'White Flower', amount: 1 }
]

export type CrestEntry = {
  display: string;
  link: string;
  whichAct: 1 | 2 | 3;
  internalId: string;
}

export const CRESTS: CrestEntry[] = [
  { display: 'Wanderer', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478240', whichAct: 1, internalId: 'Wanderer' },
  { display: 'Reaper', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478156', whichAct: 1, internalId: 'Reaper' },
  { display: 'Beast', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478020', whichAct: 1, internalId: 'Warrior' },
  { display: 'Architect', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478745', whichAct: 2, internalId: 'Toolmaster' },
  { display: 'Witch', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478815', whichAct: 2, internalId: 'Witch' },
  { display: 'Shaman', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479384', whichAct: 3, internalId: 'Spell' }
];

export type SkillEntry = {
  display: string;
  link: string;
  whichAct: 1 | 2 | 3;
  internalId: string;
}

export const SKILLS: SkillEntry[] = [
  { display: 'Silkspear', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477871', whichAct: 1, internalId: 'Silk Spear' },
  { display: 'Thread Storm', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478061', whichAct: 1, internalId: 'Thread Sphere' },
  { display: 'Cross Stitch', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478371', whichAct: 1, internalId: 'Parry' },
  { display: 'Rune Rage', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479025', whichAct: 2, internalId: 'Silk Bomb' },
  { display: 'Sharpdart', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479079', whichAct: 2, internalId: 'Silk Charge' },
  { display: 'Pale Nails', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479606', whichAct: 3, internalId: 'Silk Boss Needle' }
];

export type ToolPouchUpgrade = BaseEntry & { key: 'u1' | 'u2' | 'u3' | 'u4'; ingame: string[] }

export const TOOL_POUCH_UPGRADES: ToolPouchUpgrade[] = [
  { key: 'u1', display: 'Tool Pouch upgrade 1', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477950', whichAct: 1, ingame: ['PurchasedPilgrimsRestToolPouch'] },
  { key: 'u3', display: 'Tool Pouch upgrade 2', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478252', whichAct: 1, ingame: ['pinGalleriesCompleted', 'Ladybug Craft Pickup'] },
  { key: 'u2', display: 'Tool Pouch upgrade 3', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479167', whichAct: 2, ingame: ['Journal'] },
  { key: 'u4', display: 'Tool Pouch upgrade 4', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479436', whichAct: 2, ingame: ['Caravan Troupe Leader Fleatopia NPC'] }
];

export type CraftingKitUpgrade = BaseEntry & { key: 'u1' | 'u2' | 'u3' | 'u4'; ingame: string[] }

export const CRAFTING_KIT_UPGRADES: CraftingKitUpgrade[] = [
  { key: 'u1', display: 'Crafting Kit upgrade 1', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477919', whichAct: 1, ingame: [] },
  { key: 'u4', display: 'Crafting Kit upgrade 2', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478348', whichAct: 1, ingame: [] },
  { key: 'u2', display: 'Crafting Kit upgrade 3', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478533', whichAct: 2, ingame: [] },
  { key: 'u3', display: 'Crafting Kit upgrade 4', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478728', whichAct: 2, ingame: [] }
]
export type AbilityEntry = {
  display: string
  link: string
  whichAct: 1 | 2 | 3
  flag: string
}

export const ABILITIES: AbilityEntry[] = [
  { display: 'Swift Step', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477915', whichAct: 1, flag: 'hasDash' },
  { display: 'Cling Grip', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478189', whichAct: 1, flag: 'hasWalljump' },
  { display: 'Needolin', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478199', whichAct: 1, flag: 'hasNeedolin' },
  { display: 'Needle Strike', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478510', whichAct: 1, flag: 'hasChargeSlash' },
  { display: 'Clawline', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478714', whichAct: 2, flag: 'hasHarpoonDash' },
  { display: 'Silk Soar', link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479288', whichAct: 3, flag: 'hasSuperJump' }
]

export type MemoryLocketSource =
  | { type: 'sceneBool'; scene: string; flag: string }
  | { type: 'flag'; flag: string }
  | { type: 'quest'; questName: string }

export type MemoryLocketEntry = { display: string; link: string; whichAct: 1 | 2 | 3 } & MemoryLocketSource

export const MEMORY_LOCKETS: MemoryLocketEntry[] = [
  { display: 'Memory Locket 1', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478246', type: 'sceneBool', scene: 'Bone_18', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 2', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478017', type: 'sceneBool', scene: 'Ant_20', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 3', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=477953', type: 'flag', flag: 'PurchasedPilgrimsRestMemoryLocket' },
  { display: 'Memory Locket 4', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478035', type: 'sceneBool', scene: 'Greymoor_16', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 5', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478222', type: 'quest', questName: 'Rock Rollers' },
  { display: 'Memory Locket 6', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478204', type: 'flag', flag: 'PurchasedBelltownMemoryLocket' },
  { display: 'Memory Locket 7', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478502', type: 'sceneBool', scene: 'Coral_02', flag: 'Collectable Item Pickup (1)' },
  { display: 'Memory Locket 8', whichAct: 1, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478493', type: 'sceneBool', scene: 'Crawl_09', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 9', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478787', type: 'sceneBool', scene: 'Shadow_20', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 10', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478372', type: 'sceneBool', scene: 'Bellway_City', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 11', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478571', type: 'sceneBool', scene: 'Under_08', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 12', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478836', type: 'sceneBool', scene: 'Dock_13', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 13', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478676', type: 'sceneBool', scene: 'Library_08', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 14', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479204', type: 'sceneBool', scene: 'Coral_23', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 15', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478039', type: 'sceneBool', scene: 'Halfway_01', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 16', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479110', type: 'sceneBool', scene: 'Arborium_05', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 17', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479017', type: 'sceneBool', scene: 'Slab_Cell_Quiet', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 18', whichAct: 2, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478851', type: 'sceneBool', scene: 'Shadow_27', flag: 'Sack Corpse Pickup' },
  { display: 'Memory Locket 19', whichAct: 3, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=478212', type: 'sceneBool', scene: 'Belltown', flag: 'Collectable Item Pickup' },
  { display: 'Memory Locket 20', whichAct: 3, link: 'https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=479196', type: 'sceneBool', scene: 'Bone_East_25', flag: 'Collectable Item Pickup' }
]