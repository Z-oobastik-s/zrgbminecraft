export type EnchantItem =
  | 'sword'
  | 'pickaxe'
  | 'axe'
  | 'shovel'
  | 'hoe'
  | 'bow'
  | 'crossbow'
  | 'trident'
  | 'helmet'
  | 'chestplate'
  | 'leggings'
  | 'boots'
  | 'shears'
  | 'shield'
  | 'elytra'
  | 'fishing_rod'
  | 'flint'
  | 'mace'

export type EnchantmentRow = {
  id: string
  max: number
  items: EnchantItem[]
  names: { ru: string; en: string; ua: string }
}

/** Java Edition registry ids (1.21+), same order as legacy reference table. */
export const MINECRAFT_ENCHANTMENTS: EnchantmentRow[] = [
  {
    id: 'sweeping_edge',
    max: 3,
    items: ['sword'],
    names: { ru: 'Разящий клинок', en: 'Sweeping Edge', ua: 'Розкійний клинок' },
  },
  {
    id: 'knockback',
    max: 2,
    items: ['sword'],
    names: { ru: 'Отбрасывание', en: 'Knockback', ua: 'Відкидування' },
  },
  {
    id: 'sharpness',
    max: 5,
    items: ['sword'],
    names: { ru: 'Острота', en: 'Sharpness', ua: 'Гострота' },
  },
  {
    id: 'smite',
    max: 5,
    items: ['sword'],
    names: { ru: 'Небесная кара', en: 'Smite', ua: 'Небесна кара' },
  },
  {
    id: 'looting',
    max: 3,
    items: ['sword'],
    names: { ru: 'Добыча', en: 'Looting', ua: 'Добича' },
  },
  {
    id: 'fire_aspect',
    max: 2,
    items: ['sword'],
    names: { ru: 'Заговор огня', en: 'Fire Aspect', ua: 'Заговір вогню' },
  },
  {
    id: 'bane_of_arthropods',
    max: 5,
    items: ['sword'],
    names: { ru: 'Бич членистоногих', en: 'Bane of Arthropods', ua: 'Загибель членистоногих' },
  },
  {
    id: 'efficiency',
    max: 5,
    items: ['pickaxe', 'axe', 'shovel', 'hoe'],
    names: { ru: 'Эффективность', en: 'Efficiency', ua: 'Ефективність' },
  },
  {
    id: 'silk_touch',
    max: 1,
    items: ['pickaxe', 'axe', 'shovel', 'hoe'],
    names: { ru: 'Шёлковое касание', en: 'Silk Touch', ua: 'Шовковий дотик' },
  },
  {
    id: 'fortune',
    max: 3,
    items: ['pickaxe', 'axe', 'shovel', 'hoe'],
    names: { ru: 'Удача', en: 'Fortune', ua: 'Удача' },
  },
  {
    id: 'punch',
    max: 2,
    items: ['bow'],
    names: { ru: 'Отдача', en: 'Punch', ua: 'Віддача' },
  },
  {
    id: 'power',
    max: 5,
    items: ['bow'],
    names: { ru: 'Сила', en: 'Power', ua: 'Сила' },
  },
  {
    id: 'flame',
    max: 1,
    items: ['bow'],
    names: { ru: 'Воспламенение', en: 'Flame', ua: 'Запалення' },
  },
  {
    id: 'infinity',
    max: 1,
    items: ['bow'],
    names: { ru: 'Бесконечность', en: 'Infinity', ua: 'Нескінченність' },
  },
  {
    id: 'piercing',
    max: 4,
    items: ['crossbow'],
    names: { ru: 'Пронзающая стрела', en: 'Piercing', ua: 'Пронизлива стріла' },
  },
  {
    id: 'multishot',
    max: 1,
    items: ['crossbow'],
    names: { ru: 'Мультишот', en: 'Multishot', ua: 'Мультипостріл' },
  },
  {
    id: 'quick_charge',
    max: 3,
    items: ['crossbow'],
    names: { ru: 'Быстрая перезарядка', en: 'Quick Charge', ua: 'Швидке перезаряджання' },
  },
  {
    id: 'riptide',
    max: 3,
    items: ['trident'],
    names: { ru: 'Тягун', en: 'Riptide', ua: 'Тягун' },
  },
  {
    id: 'impaling',
    max: 5,
    items: ['trident'],
    names: { ru: 'Пронзатель', en: 'Impaling', ua: 'Пронизувач' },
  },
  {
    id: 'channeling',
    max: 1,
    items: ['trident'],
    names: { ru: 'Громовержец', en: 'Channeling', ua: 'Громовержець' },
  },
  {
    id: 'loyalty',
    max: 3,
    items: ['trident'],
    names: { ru: 'Верность', en: 'Loyalty', ua: 'Вірність' },
  },
  {
    id: 'unbreaking',
    max: 3,
    items: [
      'sword',
      'pickaxe',
      'axe',
      'shovel',
      'hoe',
      'helmet',
      'chestplate',
      'leggings',
      'boots',
      'bow',
      'trident',
      'shears',
      'shield',
      'elytra',
      'fishing_rod',
      'flint',
    ],
    names: { ru: 'Прочность', en: 'Unbreaking', ua: 'Міцність' },
  },
  {
    id: 'mending',
    max: 1,
    items: [
      'sword',
      'pickaxe',
      'axe',
      'shovel',
      'hoe',
      'helmet',
      'chestplate',
      'leggings',
      'boots',
      'bow',
      'trident',
      'shears',
      'shield',
      'elytra',
      'fishing_rod',
      'flint',
    ],
    names: { ru: 'Починка', en: 'Mending', ua: 'Ремонт' },
  },
  {
    id: 'vanishing_curse',
    max: 1,
    items: [
      'sword',
      'pickaxe',
      'axe',
      'shovel',
      'hoe',
      'helmet',
      'chestplate',
      'leggings',
      'boots',
      'bow',
      'trident',
      'shears',
      'shield',
      'elytra',
      'fishing_rod',
      'flint',
    ],
    names: { ru: 'Проклятие утраты', en: 'Curse of Vanishing', ua: 'Прокляття втрати' },
  },
  {
    id: 'binding_curse',
    max: 1,
    items: ['helmet', 'chestplate', 'leggings', 'boots'],
    names: { ru: 'Проклятие несъёмности', en: 'Curse of Binding', ua: 'Прокляття прив\'язки' },
  },
  {
    id: 'fire_protection',
    max: 4,
    items: ['helmet', 'chestplate', 'leggings', 'boots'],
    names: { ru: 'Огнеупорность', en: 'Fire Protection', ua: 'Вогнетривкість' },
  },
  {
    id: 'projectile_protection',
    max: 4,
    items: ['helmet', 'chestplate', 'leggings', 'boots'],
    names: { ru: 'Защита от снарядов', en: 'Projectile Protection', ua: 'Захист від снарядів' },
  },
  {
    id: 'protection',
    max: 4,
    items: ['helmet', 'chestplate', 'leggings', 'boots'],
    names: { ru: 'Защита', en: 'Protection', ua: 'Захист' },
  },
  {
    id: 'blast_protection',
    max: 4,
    items: ['helmet', 'chestplate', 'leggings', 'boots'],
    names: { ru: 'Взрывоустойчивость', en: 'Blast Protection', ua: 'Вибухостійкість' },
  },
  {
    id: 'respiration',
    max: 3,
    items: ['helmet'],
    names: { ru: 'Подводное дыхание', en: 'Respiration', ua: 'Підводне дихання' },
  },
  {
    id: 'aqua_affinity',
    max: 1,
    items: ['helmet'],
    names: { ru: 'Подводник', en: 'Aqua Affinity', ua: 'Водна врівноваженість' },
  },
  {
    id: 'thorns',
    max: 3,
    items: ['chestplate'],
    names: { ru: 'Шипы', en: 'Thorns', ua: 'Шипи' },
  },
  {
    id: 'swift_sneak',
    max: 3,
    items: ['leggings'],
    names: { ru: 'Проворство', en: 'Swift Sneak', ua: 'Проворство' },
  },
  {
    id: 'soul_speed',
    max: 3,
    items: ['boots'],
    names: { ru: 'Скорость души', en: 'Soul Speed', ua: 'Швидкість душ' },
  },
  {
    id: 'frost_walker',
    max: 2,
    items: ['boots'],
    names: { ru: 'Ледеход', en: 'Frost Walker', ua: 'Льодохід' },
  },
  {
    id: 'feather_falling',
    max: 4,
    items: ['boots'],
    names: { ru: 'Невесомость', en: 'Feather Falling', ua: 'Невагомість' },
  },
  {
    id: 'depth_strider',
    max: 3,
    items: ['boots'],
    names: { ru: 'Подводная хотьба', en: 'Depth Strider', ua: 'Підводна хода' },
  },
  {
    id: 'breach',
    max: 4,
    items: ['mace'],
    names: { ru: 'Пробитие', en: 'Breach', ua: 'Пробиття' },
  },
  {
    id: 'density',
    max: 5,
    items: ['mace'],
    names: { ru: 'Плотность', en: 'Density', ua: 'Щільність' },
  },
  {
    id: 'wind_burst',
    max: 3,
    items: ['mace'],
    names: { ru: 'Шквал', en: 'Wind Burst', ua: 'Шквал' },
  },
  {
    id: 'lure',
    max: 3,
    items: ['fishing_rod'],
    names: { ru: 'Приманка', en: 'Lure', ua: 'Приманка' },
  },
  {
    id: 'luck_of_the_sea',
    max: 3,
    items: ['fishing_rod'],
    names: { ru: 'Морская удача', en: 'Luck of the Sea', ua: 'Морська удача' },
  },
]
