'use client'

import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  Anchor,
  ArrowBigRight,
  Axe,
  Crosshair,
  Fish,
  Flame,
  Footprints,
  Hammer,
  HardHat,
  Layers,
  Pickaxe,
  Plane,
  Scissors,
  Shield,
  Shirt,
  Shovel,
  Sword,
  Wheat,
} from 'lucide-react'
import type { EnchantItem } from '@/lib/minecraft-enchantments'

const iconClass = 'h-3 w-3 shrink-0 text-zinc-400'

const MAP: Record<EnchantItem, ComponentType<LucideProps>> = {
  sword: Sword,
  pickaxe: Pickaxe,
  axe: Axe,
  shovel: Shovel,
  hoe: Wheat,
  bow: ArrowBigRight,
  crossbow: Crosshair,
  trident: Anchor,
  helmet: HardHat,
  chestplate: Shirt,
  leggings: Layers,
  boots: Footprints,
  shears: Scissors,
  shield: Shield,
  elytra: Plane,
  fishing_rod: Fish,
  flint: Flame,
  mace: Hammer,
}

export function EnchantmentItemIcons({ items }: { items: EnchantItem[] }) {
  return (
    <span className="inline-flex flex-wrap items-center justify-end gap-0.5" title={items.join(', ')}>
      {items.map((k) => {
        const Cmp = MAP[k]
        return <Cmp key={k} className={iconClass} aria-hidden />
      })}
    </span>
  )
}
