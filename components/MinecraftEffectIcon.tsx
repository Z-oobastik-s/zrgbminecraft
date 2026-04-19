'use client'

import { useState } from 'react'
import Image from 'next/image'
import { minecraftEffectIconSrc } from '@/lib/minecraft-effect-icon'
import { EffectGlyph } from '@/components/icons/EffectGlyphs'

export function MinecraftEffectIcon({
  id,
  kind,
}: {
  id: string
  kind: 'positive' | 'negative'
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <EffectGlyph id={id} kind={kind} />
  }

  return (
    <Image
      src={minecraftEffectIconSrc(id)}
      alt=""
      width={18}
      height={18}
      unoptimized
      className="h-[18px] w-[18px] shrink-0 object-contain [image-rendering:pixelated]"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
