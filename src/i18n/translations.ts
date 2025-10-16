export interface Translations {
  
  title: string
  subtitle: string
  
  
  dragAndDrop: string
  browse: string
  processing: string
  fileError: string
  dropAria: string
  dropText: string
  
  
  overallCompletion: string
  individualItems: string
  tooltipText: string
  
  
  act1: string
  act2: string
  act3: string
  all: string
  actLabel: string
  
  
  needleUpgrades: string
  ancientMasks: string
  silkSpool: string
  silkHearts: string
  miscellaneous: string
  crests: string
  skills: string
  craftingKitUpgrades: string
  toolPouchUpgrades: string
  abilities: string
  tools: string
  
  
  details: string
  selectCategory: string
  total: string
  showAll: string
  showOnlyMissing: string
  openMap: string
  obtained: string
  notObtained: string
  
  
  individualShards: string
  individualFragments: string
  shards: string
  fragments: string

  
  huntersJournal: string
  hjFound: string
  hjNotFound: string
  hjIncomplete: string
  hjKills: string
  hjTarget: string
  hjOptional: string
  hjMaxTooltip: string
  hjMaxLabel: string
  hjKilledCount: string
  hjFoundCount: string
}

export const translations: Record<string, Translations> = {
  en: {
    
    title: 'Silksong 100% Analyzer',
    subtitle: 'Upload your save file (user*.dat) from: %USERPROFILE%\\AppData\\LocalLow\\Team Cherry\\Hollow Knight Silksong',
    
    
    dragAndDrop: 'Drag and drop',
    browse: 'browse',
    processing: 'Processing...',
    fileError: 'Please select a .dat file',
    dropAria: 'Drag and drop a .dat file here',
    dropText: 'Drag and drop a user.dat file here or',
    
    
    overallCompletion: 'Overall Completion (%)',
    individualItems: 'Individual Items',
    tooltipText: 'Counts all individual items including mask shards and spool fragments\nUnlike percentage above which counts completed masks/spools only',
    
    
    act1: 'Act 1',
    act2: 'Act 2',
    act3: 'Act 3',
    all: 'All',
    actLabel: 'Act',
    
    
    needleUpgrades: 'Needle upgrades',
    ancientMasks: 'Ancient Masks',
    silkSpool: 'Silk Spool',
    silkHearts: 'Silk Hearts',
    miscellaneous: 'Miscellaneous',
    crests: 'Crests',
    skills: 'Skills',
    craftingKitUpgrades: 'Crafting Kit Upgrades',
    toolPouchUpgrades: 'Tool Pouch Upgrades',
    abilities: 'Abilities',
    tools: 'Tools',
    
    
    details: 'Details',
    selectCategory: 'Select a category',
    total: 'total',
    showAll: 'Show all',
    showOnlyMissing: 'Show only missing',
    openMap: 'Open map',
    obtained: 'obtained',
    notObtained: 'not obtained',
    
    
    individualShards: '(individual shards)',
    individualFragments: '(individual fragments)',
    shards: 'shards',
    fragments: 'fragments',

    
    huntersJournal: 'Hunter\'s Journal',
    hjFound: 'Found',
    hjNotFound: 'Not found',
    hjIncomplete: 'Not fully killed',
    hjKills: 'Kills',
    hjTarget: 'Target',
    hjOptional: 'Optional',
    hjMaxTooltip: '7 optional enemies that can be skipped: Shakra, Garmond & Zaza, Summoned Saviour (Steel Soul mode only), Flintbeetle, Palestag, Lost Garmond, Lost Lace',
    hjMaxLabel: '(237 max)',
    hjKilledCount: 'Killed',
    hjFoundCount: 'Found'
  },
  
  ru: {
    
    title: 'Анализатор 100% Silksong',
    subtitle: 'Загрузите файл сохранения (user*.dat) из: %USERPROFILE%\\AppData\\LocalLow\\Team Cherry\\Hollow Knight Silksong',
    
    
    dragAndDrop: 'Перетащите',
    browse: 'выберите файл',
    processing: 'Обработка...',
    fileError: 'Пожалуйста, выберите .dat файл',
    dropAria: 'Перетащите .dat файл сюда',
    dropText: 'Перетащите сюда файл user.dat или',
    
    
    overallCompletion: 'Общий прогресс (%)',
    individualItems: 'Отдельные предметы',
    tooltipText: 'Считает все отдельные предметы, включая осколки масок и фрагменты катушек\nВ отличие от процентов выше, которые считают только завершенные маски/катушки',
    
    
    act1: 'Акт 1',
    act2: 'Акт 2',
    act3: 'Акт 3',
    all: 'Все',
    actLabel: 'Акт',
    
    
    needleUpgrades: 'Улучшения иглы',
    ancientMasks: 'Древние маски',
    silkSpool: 'Шелковая катушка',
    silkHearts: 'Шелковые сердца',
    miscellaneous: 'Разное',
    crests: 'Знаки',
    skills: 'Умения',
    craftingKitUpgrades: 'Наборы умельца',
    toolPouchUpgrades: 'Сумки для инструментов',
    abilities: 'Способности',
    tools: 'Инструменты',
    
    
    details: 'Подробности',
    selectCategory: 'Выберите категорию',
    total: 'всего',
    showAll: 'Показать все',
    showOnlyMissing: 'Показать только отсутствующие',
    openMap: 'Открыть карту',
    obtained: 'получено',
    notObtained: 'не получено',
    
    
    individualShards: '(отдельные осколки)',
    individualFragments: '(отдельные фрагменты)',
    shards: 'осколков',
    fragments: 'фрагментов',

    
    huntersJournal: 'Журнал охотника',
    hjFound: 'Найденные',
    hjNotFound: 'Не найденные',
    hjIncomplete: 'Недостаточно убийств',
    hjKills: 'Убийств',
    hjTarget: 'Цель',
    hjOptional: 'Необязательный',
    hjMaxTooltip: '7 необязательных врагов, которых можно пропустить: Шакра, Гармонд и Заза, Призванный Спаситель (эксклюзив стальной души), Кремнежук, Светлорожка, Пропащий Гармонд, Пропащая Лейс',
    hjMaxLabel: '(237 макс)',
    hjKilledCount: 'Убито',
    hjFoundCount: 'Найдено'
  }
}
