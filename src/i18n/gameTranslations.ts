export type GameCategory =
  | 'tools'
  | 'nail'
  | 'toolPouch'
  | 'craftingKit'
  | 'ancientMasks'
  | 'silkSpool'
  | 'silkHearts'
  | 'misc'
  | 'crests'
  | 'skills'
  | 'abilities'

export type GameTranslations = Record<GameCategory, Record<string, { name?: string; desc?: string }>>

export const gameTranslations: Record<'en' | 'ru', GameTranslations> = {
  en: {
    tools: {
      // 'Barbed Bracelet': { name: 'Barbed Bracelet', desc: '' },
    },
    nail: {
      // 'Needle upgrade 1': { name: 'Needle upgrade 1', desc: '' },
    },
    toolPouch: {},
    craftingKit: {},
    ancientMasks: {},
    silkSpool: {},
    silkHearts: {},
    misc: {},
    crests: {},
    skills: {},
    abilities: {},
  },
  ru: {
    tools: {
      'Barbed Bracelet': { name: 'Колючий браслет' },
      'Compass': { name: 'Компас' },
      'Curveclaw': { name: 'Загнутый коготь' },
      'Dead Bug’s Purse': { name: 'Кошелёк мёртвого жука' },
      'Druid’s Eye': { name: 'Око друида' },
      'Flea Brew': { name: 'Блошиный отвар' },
      'Flintslate': { name: 'Кремневая пластина' },
      'Fractured Mask': { name: 'Потрескавшаяся маска' },
      'Longpin': { name: 'Длинная булавка' },
      'Magma Bell': { name: 'Магмовый колокольчик' },
      'Magnetite Brooch': { name: 'Магнетитовая брошь' },
      'Magnetite Dice': { name: 'Магнетитовые кубики' },
      'Multibinder': { name: 'Мультисвязыватель' },
      'Pimpillo': { name: 'Бумдушка' },
      'Plasmium Phial': { name: 'Сосуд с плазмиумом' },
      'Pollip Pouch': { name: 'Полиповый мешочек' },
      'Shard Pendant': { name: 'Осколочная подвеска' },
      'Silkshot': { name: 'Шёлкострел' },
      'Silkspeed Anklets': { name: 'Скорошёлковые анклеты' },
      'Sting Shard': { name: 'Осколок жала' },
      'Straight Pin': { name: 'Прямая булавка' },
      'Tacks': { name: 'Колючки' },
      'Threefold Pin': { name: 'Тройная булавка' },
      'Warding Bell': { name: 'Охранный колокольчик' },
      'Weavelight': { name: 'Ткачесвет' },
      'Weighted Belt': { name: 'Увесистая обвязка' },
      'Ascendant’s Grip': { name: 'Зацеп скалолаза' },
      'Claw Mirror': { name: 'Когтистое зеркало' },
      'Cogfly': { name: 'Заводная муха' },
      'Cogwork Wheel': { name: 'Заводное колесо' },
      'Conchcutter': { name: 'Ракушечный резак' },
      'Delver’s Drill': { name: 'Бур копателя' },
      'Egg of Flealia': { name: 'Яйцо блохалии' },
      'Injector Band': { name: 'Инъекторная повязка' },
      'Longclaw': { name: 'Длинный коготь' },
      'Memory Crystal': { name: 'Кристалл памяти' },
      'Quick Sling': { name: 'Быстрая праща' },
      'Reserve Bind': { name: 'Резерв для связывания' },
      'Rosary Cannon': { name: 'Бусинная пушка' },
      'Sawtooth Circlet': { name: 'Зубчатый обод' },
      'Scuttlebrace': { name: 'Панцирный корсет' },
      'Snitch Pick': { name: 'Доставатель' },
      'Spider Strings': { name: 'Паучьи струны' },
      'Spool Extender': { name: 'Удлинитель катушки' },
      'Thief’s Mark': { name: 'Метка вора' },
      'Throwing Ring': { name: 'Метательное кольцо' },
      'Volt Filament': { name: 'Вольт-жила' },
      'Voltvessels': { name: 'Вольт-шары' },
      'Wispfire Lantern': { name: 'Трутовый фонарь' },
      'Wreath of Purity': { name: 'Венец чистоты' },
      'Pin Badge': { name: 'Значок с булавкой' },
    },
    nail: {
      'Needle upgrade 1': { name: 'Улучшение иглы 1' },
      'Needle upgrade 2': { name: 'Улучшение иглы 2' },
      'Needle upgrade 3': { name: 'Улучшение иглы 3' },
      'Needle upgrade 4': { name: 'Улучшение иглы 4' },
    },
    toolPouch: {
      'Tool Pouch upgrade 1': { name: 'Сумка с инструментами 1' },
      'Tool Pouch upgrade 2': { name: 'Сумка с инструментами 2' },
      'Tool Pouch upgrade 3': { name: 'Сумка с инструментами 3' },
      'Tool Pouch upgrade 4': { name: 'Сумка с инструментами 4' },
    },
    craftingKit: {
      'Crafting Kit upgrade 1': { name: 'Набор умельца 1' },
      'Crafting Kit upgrade 2': { name: 'Набор умельца 2' },
      'Crafting Kit upgrade 3': { name: 'Набор умельца 3' },
      'Crafting Kit upgrade 4': { name: 'Набор умельца 4' },
    },
    ancientMasks: {
      'Mask Shard 1': { name: 'Обломок маски 1' },
      'Mask Shard 2': { name: 'Обломок маски 2' },
      'Mask Shard 3': { name: 'Обломок маски 3' },
      'Mask Shard 4': { name: 'Обломок маски 4' },
      'Mask Shard 5': { name: 'Обломок маски 5' },
      'Mask Shard 6': { name: 'Обломок маски 6' },
      'Mask Shard 7': { name: 'Обломок маски 7' },
      'Mask Shard 8': { name: 'Обломок маски 8' },
      'Mask Shard 9': { name: 'Обломок маски 9' },
      'Mask Shard 10': { name: 'Обломок маски 10' },
      'Mask Shard 11': { name: 'Обломок маски 11' },
      'Mask Shard 12': { name: 'Обломок маски 12' },
      'Mask Shard 13': { name: 'Обломок маски 13' },
      'Mask Shard 14': { name: 'Обломок маски 14' },
      'Mask Shard 15': { name: 'Обломок маски 15' },
      'Mask Shard 16': { name: 'Обломок маски 16' },
      'Mask Shard 17': { name: 'Обломок маски 17' },
      'Mask Shard 18': { name: 'Обломок маски 18' },
      'Mask Shard 19': { name: 'Обломок маски 19' },
      'Mask Shard 20': { name: 'Обломок маски 20' },
    },
    silkSpool: {
      'Spool Fragment: Bonebottom': { name: 'Обломок катушки: Костяная Низина' },
      'Spool Fragment: Deep Docks': { name: 'Обломок катушки: Глубокие Доки' },
      'Spool Fragment: Greymoor': { name: 'Обломок катушки: Мрачная топь' },
      'Spool Fragment: Slab': { name: 'Обломок катушки: Плита' },
      'Spool Fragment: Weavenest Atla': { name: 'Обломок катушки: Ткачедом Атла' },
      'Spool Fragment: Bellhart': { name: 'Обломок катушки: Звонвилль' },
      'Spool Fragment: Fleamaster reward': { name: 'Обломок катушки: Блошиный караван' },
      'Spool Fragment: Cogwork Core': { name: 'Обломок катушки: Механическое ядро' },
      'Spool Fragment: Underworks(right)': { name: 'Обломок катушки: Нижние цеха(Справа)' },
      'Spool Fragment: Grand Gate': { name: 'Обломок катушки: Большие врата' },
      'Spool Fragment: Underworks(arena)': { name: 'Обломок катушки: Нижние цеха(Арена)' },
      'Spool Fragment: Whiteward': { name: 'Обломок катушки: Белые покои' },
      'Spool Fragment: Whiteward Sherma': { name: 'Обломок катушки: Белые покои(Спасение шермы)' },
      'Spool Fragment: Deep Docks(bottom right)': { name: 'Обломок катушки: Глубокие доки(Нижний правый угол)' },
      'Spool Fragment: High Halls': { name: 'Обломок катушки: Высокие залы' },
      'Spool Fragment: Memorium': { name: 'Обломок катушки: Мемориум' },
      'Spool Fragment: Blasted Steps': { name: 'Обломок катушки: Подточенные ступени' },
      'Spool Fragment: Songclave': { name: 'Обломок катушки: Уголок песни' },
    },
    silkHearts: {
      'Silk Heart 1': { name: 'Шёлковое сердце 1' },
      'Silk Heart 2': { name: 'Шёлковое сердце 2' },
      'Silk Heart 3': { name: 'Шёлковое сердце 3' },
    },
    misc: {
      'Sylphsong': { name: 'Песнь сильфиды' },
      'Everbloom': { name: 'Вечноцвет' },
    },
    crests: {
      'Wanderer': { name: 'Странница' },
      'Reaper': { name: 'Жнец' },
      'Beast': { name: 'Зверь' },
      'Architect': { name: 'Архитектор' },
      'Witch': { name: 'Ведьма' },
      'Shaman': { name: 'Шаман' },
    },
    skills: {
      'Silkspear': { name: 'Шёлковое копьё' },
      'Thread Storm': { name: 'Буйство нитей' },
      'Cross Stitch': { name: 'Поперечный стежок' },
      'Rune Rage': { name: 'Ярость рун' },
      'Sharpdart': { name: 'Острожал' },
      'Pale Nails': { name: 'Светлые коготки' },
    },
    abilities: {
      'Swift Step': { name: 'Быстрый шаг' },
      'Cling Grip': { name: 'Цепкий захват' },
      'Needolin': { name: 'Иглончель' },
      'Needle Strike': { name: 'Сфокусированный удар' },
      'Clawline': { name: 'Цепкая нить' },
      'Silk Soar': { name: 'Окрыляющий шёлк' },
    },
  },
}

export function makeGameTr(language: 'en' | 'ru') {
  const dict = gameTranslations[language] ?? gameTranslations.en
  return {
    name(cat: GameCategory, key: string, fallback: string): string {
      return dict[cat]?.[key]?.name || fallback
    },
    desc(cat: GameCategory, key: string, fallback: string): string {
      return dict[cat]?.[key]?.desc || fallback
    },
  }
}
