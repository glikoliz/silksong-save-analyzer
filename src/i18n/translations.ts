export interface Translations {
  // Header
  title: string
  subtitle: string
  
  // File upload
  dragAndDrop: string
  browse: string
  processing: string
  fileError: string
  dropAria: string
  dropText: string
  
  // Progress
  overallCompletion: string
  individualItems: string
  tooltipText: string
  
  // Acts
  act1: string
  act2: string
  act3: string
  all: string
  actLabel: string
  
  // Categories
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
  
  // Details panel
  details: string
  selectCategory: string
  total: string
  showAll: string
  showOnlyMissing: string
  openMap: string
  obtained: string
  notObtained: string
  
  // Fragments info
  individualShards: string
  individualFragments: string
  shards: string
  fragments: string
}

export const translations: Record<string, Translations> = {
  en: {
    // Header
    title: 'Silksong 100% Analyzer',
    subtitle: 'Upload your save file (user*.dat) from: %USERPROFILE%\\AppData\\LocalLow\\Team Cherry\\Hollow Knight Silksong',
    
    // File upload
    dragAndDrop: 'Drag and drop',
    browse: 'browse',
    processing: 'Processing...',
    fileError: 'Please select a .dat file',
    dropAria: 'Drag and drop a .dat file here',
    dropText: 'Drag and drop a user.dat file here or',
    
    // Progress
    overallCompletion: 'Overall Completion (%)',
    individualItems: 'Individual Items',
    tooltipText: 'Counts all individual items including mask shards and spool fragments\nUnlike percentage above which counts completed masks/spools only',
    
    // Acts
    act1: 'Act 1',
    act2: 'Act 2',
    act3: 'Act 3',
    all: 'All',
    actLabel: 'Act',
    
    // Categories
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
    
    // Details panel
    details: 'Details',
    selectCategory: 'Select a category',
    total: 'total',
    showAll: 'Show all',
    showOnlyMissing: 'Show only missing',
    openMap: 'Open map',
    obtained: 'obtained',
    notObtained: 'not obtained',
    
    // Fragments info
    individualShards: '(individual shards)',
    individualFragments: '(individual fragments)',
    shards: 'shards',
    fragments: 'fragments'
  },
  
  ru: {
    // Header
    title: 'Анализатор 100% Silksong',
    subtitle: 'Загрузите файл сохранения (user*.dat) из: %USERPROFILE%\\AppData\\LocalLow\\Team Cherry\\Hollow Knight Silksong',
    
    // File upload
    dragAndDrop: 'Перетащите',
    browse: 'выберите файл',
    processing: 'Обработка...',
    fileError: 'Пожалуйста, выберите .dat файл',
    dropAria: 'Перетащите .dat файл сюда',
    dropText: 'Перетащите сюда файл user.dat или',
    
    // Progress
    overallCompletion: 'Общий прогресс (%)',
    individualItems: 'Отдельные предметы',
    tooltipText: 'Считает все отдельные предметы, включая осколки масок и фрагменты катушек\nВ отличие от процентов выше, которые считают только завершенные маски/катушки',
    
    // Acts
    act1: 'Акт 1',
    act2: 'Акт 2',
    act3: 'Акт 3',
    all: 'Все',
    actLabel: 'Акт',
    
    // Categories
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
    
    // Details panel
    details: 'Подробности',
    selectCategory: 'Выберите категорию',
    total: 'всего',
    showAll: 'Показать все',
    showOnlyMissing: 'Показать только отсутствующие',
    openMap: 'Открыть карту',
    obtained: 'получено',
    notObtained: 'не получено',
    
    // Fragments info
    individualShards: '(отдельные осколки)',
    individualFragments: '(отдельные фрагменты)',
    shards: 'осколков',
    fragments: 'фрагментов'
  }
}
