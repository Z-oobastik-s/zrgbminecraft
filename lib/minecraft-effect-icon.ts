import { assetUrl } from '@/lib/asset-url'

/**
 * Files in public/minecraft-effects/: `{effectId}_sm.png` (Java registry id).
 * To map a different filename, add an entry to ICON_FILE_BASE.
 */
const ICON_FILE_BASE: Partial<Record<string, string>> = {
  // example: some_pack_name: 'renamed_in_pack',
}

export function minecraftEffectIconSrc(effectId: string): string {
  const base = ICON_FILE_BASE[effectId] ?? effectId
  return assetUrl(`/minecraft-effects/${base}_sm.png`)
}
