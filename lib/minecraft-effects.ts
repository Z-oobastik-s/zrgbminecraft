export type EffectRow = {
  id: string
  names: { ru: string; en: string; ua: string }
  kind: 'positive' | 'negative'
}

/** Status effect registry ids (Java Edition), grouped for admin reference. */
export const MINECRAFT_EFFECTS: EffectRow[] = [
  {
    id: 'speed',
    kind: 'positive',
    names: { ru: 'Скорость', en: 'Speed', ua: 'Швидкість' },
  },
  {
    id: 'haste',
    kind: 'positive',
    names: { ru: 'Спешка', en: 'Haste', ua: 'Поспіх' },
  },
  {
    id: 'strength',
    kind: 'positive',
    names: { ru: 'Сила', en: 'Strength', ua: 'Сила' },
  },
  {
    id: 'instant_health',
    kind: 'positive',
    names: { ru: 'Исцеление', en: 'Instant Health', ua: 'Зцілення' },
  },
  {
    id: 'jump_boost',
    kind: 'positive',
    names: { ru: 'Прыгучесть', en: 'Jump Boost', ua: 'Стрибучість' },
  },
  {
    id: 'regeneration',
    kind: 'positive',
    names: { ru: 'Регенерация', en: 'Regeneration', ua: 'Регенерація' },
  },
  {
    id: 'resistance',
    kind: 'positive',
    names: { ru: 'Сопротивление', en: 'Resistance', ua: 'Стійкість' },
  },
  {
    id: 'fire_resistance',
    kind: 'positive',
    names: { ru: 'Огнестойкость', en: 'Fire Resistance', ua: 'Вогнестійкість' },
  },
  {
    id: 'water_breathing',
    kind: 'positive',
    names: { ru: 'Водное дыхание', en: 'Water Breathing', ua: 'Підводне дихання' },
  },
  {
    id: 'breath_of_the_nautilus',
    kind: 'positive',
    names: {
      ru: 'Дыхание наутилуса',
      en: 'Breath of the Nautilus',
      ua: 'Дихання наутилуса',
    },
  },
  {
    id: 'invisibility',
    kind: 'positive',
    names: { ru: 'Невидимость', en: 'Invisibility', ua: 'Невидимість' },
  },
  {
    id: 'night_vision',
    kind: 'positive',
    names: { ru: 'Ночное зрение', en: 'Night Vision', ua: 'Нічний зір' },
  },
  {
    id: 'luck',
    kind: 'positive',
    names: { ru: 'Удача', en: 'Luck', ua: 'Удача' },
  },
  {
    id: 'slow_falling',
    kind: 'positive',
    names: { ru: 'Медленное падение', en: 'Slow Falling', ua: 'Повільне падіння' },
  },
  {
    id: 'conduit_power',
    kind: 'positive',
    names: { ru: 'Сила морского проводника', en: 'Conduit Power', ua: 'Сила провідника' },
  },
  {
    id: 'dolphins_grace',
    kind: 'positive',
    names: { ru: 'Грация дельфина', en: "Dolphin's Grace", ua: 'Милість дельфіна' },
  },
  {
    id: 'hero_of_the_village',
    kind: 'positive',
    names: { ru: 'Герой деревни', en: 'Hero of the Village', ua: 'Герой села' },
  },
  {
    id: 'saturation',
    kind: 'positive',
    names: { ru: 'Насыщение', en: 'Saturation', ua: 'Насичення' },
  },
  {
    id: 'health_boost',
    kind: 'positive',
    names: { ru: 'Здоровье', en: 'Health Boost', ua: 'Здоров\'я' },
  },
  {
    id: 'absorption',
    kind: 'positive',
    names: { ru: 'Поглощение', en: 'Absorption', ua: 'Поглинання' },
  },
  {
    id: 'slowness',
    kind: 'negative',
    names: { ru: 'Замедление', en: 'Slowness', ua: 'Повільність' },
  },
  {
    id: 'mining_fatigue',
    kind: 'negative',
    names: { ru: 'Утомление', en: 'Mining Fatigue', ua: 'Втома' },
  },
  {
    id: 'instant_damage',
    kind: 'negative',
    names: { ru: 'Моментальный урон', en: 'Instant Damage', ua: 'Миттєва шкода' },
  },
  {
    id: 'nausea',
    kind: 'negative',
    names: { ru: 'Тошнота', en: 'Nausea', ua: 'Нудота' },
  },
  {
    id: 'blindness',
    kind: 'negative',
    names: { ru: 'Слепота', en: 'Blindness', ua: 'Сліпота' },
  },
  {
    id: 'hunger',
    kind: 'negative',
    names: { ru: 'Голод', en: 'Hunger', ua: 'Голод' },
  },
  {
    id: 'weakness',
    kind: 'negative',
    names: { ru: 'Слабость', en: 'Weakness', ua: 'Слабкість' },
  },
  {
    id: 'poison',
    kind: 'negative',
    names: { ru: 'Отравление', en: 'Poison', ua: 'Отруєння' },
  },
  {
    id: 'wither',
    kind: 'negative',
    names: { ru: 'Иссушение', en: 'Wither', ua: 'Висушення' },
  },
  {
    id: 'levitation',
    kind: 'negative',
    names: { ru: 'Левитация', en: 'Levitation', ua: 'Левітація' },
  },
  {
    id: 'darkness',
    kind: 'negative',
    names: { ru: 'Тьма', en: 'Darkness', ua: 'Темрява' },
  },
  {
    id: 'bad_omen',
    kind: 'negative',
    names: { ru: 'Дурное знамение', en: 'Bad Omen', ua: 'Зле знамення' },
  },
  {
    id: 'raid_omen',
    kind: 'negative',
    names: {
      ru: 'Предвестие рейда',
      en: 'Raid Omen',
      ua: 'Передвісник рейду',
    },
  },
  {
    id: 'trial_omen',
    kind: 'negative',
    names: {
      ru: 'Знамение испытания',
      en: 'Trial Omen',
      ua: 'Знамення випробування',
    },
  },
  {
    id: 'unluck',
    kind: 'negative',
    names: { ru: 'Неудача', en: 'Bad Luck', ua: 'Невдача' },
  },
  {
    id: 'glowing',
    kind: 'negative',
    names: { ru: 'Свечение', en: 'Glowing', ua: 'Світіння' },
  },
  {
    id: 'infested',
    kind: 'negative',
    names: { ru: 'Заражение', en: 'Infested', ua: 'Зараження' },
  },
  {
    id: 'oozing',
    kind: 'negative',
    names: { ru: 'Слизь', en: 'Oozing', ua: 'Слиз' },
  },
  {
    id: 'weaving',
    kind: 'negative',
    names: { ru: 'Плетение', en: 'Weaving', ua: 'Плетіння' },
  },
  {
    id: 'wind_charged',
    kind: 'negative',
    names: { ru: 'Заряд ветра', en: 'Wind Charged', ua: 'Заряд вітру' },
  },
]
