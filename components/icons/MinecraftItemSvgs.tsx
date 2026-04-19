import type { ReactNode } from 'react'
import type { EnchantItem } from '@/lib/minecraft-enchantments'

const cls = 'h-3.5 w-3.5 shrink-0 text-sky-200/80'

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 16 16" className={cls} fill="currentColor" aria-hidden>
      {children}
    </svg>
  )
}

function Sword() {
  return (
    <Svg>
      <path
        fill="currentColor"
        d="M10.5 1.2L12 2.7 5.2 9.5 3.8 8.1 10.5 1.2z"
      />
      <path
        fill="currentColor"
        opacity="0.75"
        d="M5.5 9.8L3 14.8l1.2 1.2 4.2-2.2-3-4z"
      />
    </Svg>
  )
}

function Pickaxe() {
  return (
    <Svg>
      <path d="M3 2.5L6.5 6 5 7.5 1.5 4 3 2.5z" />
      <path d="M6 6.5L13 13.5 12 14.5 5 7.5 6 6.5z" opacity="0.85" />
    </Svg>
  )
}

function Axe() {
  return (
    <Svg>
      <path d="M10 1.5c1.5 1 2.5 2.8 2.5 4.5H11c0-1.2-.6-2.3-1.5-3L10 1.5z" />
      <path d="M9 4.5L4 14h1.5l4.5-8.5L9 4.5z" opacity="0.8" />
    </Svg>
  )
}

function Shovel() {
  return (
    <Svg>
      <path d="M7.5 2C9 3 10 4.5 10 6.5c0 2-1 3.5-2.5 4.5L7 14H9l1-2.5c2-1 3-3 3-5.5C13 3 10.5 1 8 1l-.5 1z" />
    </Svg>
  )
}

function Hoe() {
  return (
    <Svg>
      <path d="M11 2v3c0 1.5-.8 2.8-2 3.5L5 14h1.5l3-4.5c1.8-.9 3-2.7 3-5V2h-1.5z" />
    </Svg>
  )
}

function Bow() {
  return (
    <Svg>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        d="M13 2.5C10 5 10 11 13 13.5"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        d="M3 8h7"
      />
    </Svg>
  )
}

function Crossbow() {
  return (
    <Svg>
      <rect
        x="2"
        y="5"
        width="11"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        d="M7.5 5V3M4 8H2M14 8h-2"
      />
    </Svg>
  )
}

function Trident() {
  return (
    <Svg>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        d="M8 1.5v11"
      />
      <path
        fill="currentColor"
        d="M5 1.5h6v2H5v-2zm-1 3.5h8v1.5H4V5z"
      />
      <path fill="currentColor" opacity="0.85" d="M7 13h2v2H7v-2z" />
    </Svg>
  )
}

function Helmet() {
  return (
    <Svg>
      <path d="M3 7c0-3 2.2-5 5-5s5 2 5 5v1H3V7z" />
      <path d="M4 9h8v1.5H4V9z" opacity="0.5" />
    </Svg>
  )
}

function Chestplate() {
  return (
    <Svg>
      <path d="M4 3h8v9H4V3zm1.5 2.5V11h7V5.5h-7z" />
      <path d="M6 6h4v4H6V6z" opacity="0.35" />
    </Svg>
  )
}

function Leggings() {
  return (
    <Svg>
      <path d="M5 3h6v3H5V3zm0 4h2.5v7H5V7zm3.5 0H11v7H8.5V7z" />
    </Svg>
  )
}

function Boots() {
  return (
    <Svg>
      <path d="M4 10c0-2 1.5-3 4-3s4 1 4 3v3H4v-3z" />
      <path d="M3 13h10v1.5H3V13z" opacity="0.6" />
    </Svg>
  )
}

function Shears() {
  return (
    <Svg>
      <circle cx="5.5" cy="5" r="2" />
      <circle cx="10.5" cy="5" r="2" />
      <path d="M6.5 6.5L9.5 11M9.5 6.5L6.5 11" stroke="currentColor" strokeWidth="1" fill="none" />
    </Svg>
  )
}

function ShieldIcon() {
  return (
    <Svg>
      <path d="M8 1.5L4 3v5c0 3 2 5.5 4 6.5 2-1 4-3.5 4-6.5V3L8 1.5z" />
      <path d="M8 4v6" stroke="currentColor" strokeWidth="0.8" opacity="0.35" fill="none" />
    </Svg>
  )
}

function Elytra() {
  return (
    <Svg>
      <path d="M8 4c-2.5 0-4.5 2-5 5l1.5.5c.5-2 2-3.5 3.5-4V4z" opacity="0.9" />
      <path d="M8 4c2.5 0 4.5 2 5 5l-1.5.5c-.5-2-2-3.5-3.5-4V4z" opacity="0.9" />
      <path d="M6 12h4v2H6v-2z" />
    </Svg>
  )
}

function FishingRod() {
  return (
    <Svg>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        d="M12 2c-1 3-3 6-6 8"
      />
      <circle cx="6.5" cy="10.5" r="1.3" fill="currentColor" opacity="0.85" />
    </Svg>
  )
}

function Flint() {
  return (
    <Svg>
      <path d="M9 2L6 8l2 6 3-5 1-5-3-2z" />
      <path d="M6 8l3 1" stroke="currentColor" strokeWidth="0.6" opacity="0.4" fill="none" />
    </Svg>
  )
}

function Mace() {
  return (
    <Svg>
      <rect x="7" y="2" width="2" height="10" rx="0.5" />
      <rect x="4" y="1" width="8" height="4" rx="1" />
    </Svg>
  )
}

const MAP: Record<EnchantItem, () => ReactNode> = {
  sword: Sword,
  pickaxe: Pickaxe,
  axe: Axe,
  shovel: Shovel,
  hoe: Hoe,
  bow: Bow,
  crossbow: Crossbow,
  trident: Trident,
  helmet: Helmet,
  chestplate: Chestplate,
  leggings: Leggings,
  boots: Boots,
  shears: Shears,
  shield: ShieldIcon,
  elytra: Elytra,
  fishing_rod: FishingRod,
  flint: Flint,
  mace: Mace,
}

export function MinecraftItemIcon({ item }: { item: EnchantItem }) {
  const Cmp = MAP[item]
  return <Cmp />
}
