'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Copy, Check, Shuffle, Palette, X } from 'lucide-react'
import type { CodeFormat } from '@/lib/rgb-generator'
import {
  FormattingOptions,
  RGBColor,
  generateRainbowGradient,
  generateSingleColor,
  generateRandomColor,
  generateRandomGradientColors,
  generateGradientText,
  buildPreviewSegments,
} from '@/lib/rgb-generator'
import { ColorPalette } from './ColorPalette'
import { FormatSelector } from './FormatSelector'
import { FormattingButtons } from './FormattingButtons'

export function Generator() {
  const t = useTranslations('generator')

  const [inputText, setInputText] = useState('')
  const [format, setFormat] = useState<CodeFormat>('ampersand')
  const [formatting, setFormatting] = useState<FormattingOptions>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    obfuscated: false,
  })
  const [selectedColor, setSelectedColor] = useState<RGBColor | null>(null)
  const [gradientColors, setGradientColors] = useState<RGBColor[]>([])
  const [useGradient, setUseGradient] = useState(false)
  const [useRainbow, setUseRainbow] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPalette, setShowPalette] = useState(false)
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current)
    },
    []
  )

  const outputText = useMemo(() => {
    if (!inputText.trim()) return ''

    if (useRainbow) {
      return generateRainbowGradient(inputText, format, formatting)
    }

    if (useGradient && gradientColors.length > 0) {
      return generateGradientText(inputText, gradientColors, format, formatting)
    }

    if (selectedColor) {
      return generateSingleColor(inputText, selectedColor, format, formatting)
    }

    return inputText
  }, [inputText, format, formatting, selectedColor, gradientColors, useGradient, useRainbow])

  const previewSegments = useMemo(
    () =>
      buildPreviewSegments(
        inputText,
        selectedColor,
        gradientColors,
        useGradient,
        useRainbow
      ),
    [inputText, selectedColor, gradientColors, useGradient, useRainbow]
  )

  const copyToClipboard = useCallback(async () => {
    if (!outputText) return

    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current)
      copyResetTimeoutRef.current = setTimeout(() => {
        setCopied(false)
        copyResetTimeoutRef.current = null
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [outputText])

  const handleRandom = useCallback(() => {
    setUseRainbow(false)
    setUseGradient(false)
    setSelectedColor(null)
    setGradientColors([])

    if (Math.random() < 0.7) {
      setSelectedColor(generateRandomColor())
    } else {
      const colors = generateRandomGradientColors()
      setGradientColors(colors)
      setUseGradient(true)
    }
  }, [])

  const toggleFormatting = useCallback((key: keyof FormattingOptions) => {
    setFormatting((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }, [])

  const handleColorSelect = useCallback((color: RGBColor) => {
    setSelectedColor(color)
    setUseGradient(false)
    setUseRainbow(false)
    setGradientColors([])
    setShowPalette(false)
  }, [])

  const toggleRainbow = useCallback(() => {
    setUseRainbow(!useRainbow)
    setUseGradient(false)
    setSelectedColor(null)
    setGradientColors([])
  }, [useRainbow])

  const previewClass =
    `minecraft-preview inline text-[clamp(0.95rem,2.2vmin,1.35rem)] leading-snug tracking-wide ` +
    `${formatting.bold ? 'font-bold ' : ''}` +
    `${formatting.italic ? 'italic ' : ''}` +
    `${formatting.underline ? 'underline ' : ''}` +
    `${formatting.strikethrough ? 'line-through ' : ''}` +
    `${formatting.obfuscated ? 'mc-obfuscated ' : ''}`

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
      <div className="glass-effect flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl p-2 shadow-xl sm:p-3">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
          <div className="flex min-h-0 min-w-0 flex-col gap-2 overflow-y-auto lg:overflow-hidden">
            <div className="shrink-0">
              <FormatSelector format={format} onFormatChange={setFormat} />
            </div>
            <div className="shrink-0">
              <FormattingButtons
                formatting={formatting}
                onToggle={toggleFormatting}
              />
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowPalette(true)}
                className="flex items-center gap-1 rounded-md bg-dark-200 px-2 py-1 text-xs text-dark-400 hover:bg-dark-300 hover:text-white"
              >
                <Palette className="h-3.5 w-3.5" />
                <span>{t('colorPalette')}</span>
              </button>
              <button
                type="button"
                onClick={toggleRainbow}
                className={`rounded-md px-2 py-1 text-xs transition-all ${
                  useRainbow
                    ? 'bg-gradient-to-r from-red-500 via-green-500 to-purple-500 text-white'
                    : 'bg-dark-200 text-dark-400 hover:bg-dark-300 hover:text-white'
                }`}
              >
                <span className="mr-1">🌈</span>
                {t('rainbow')}
              </button>
              <button
                type="button"
                onClick={handleRandom}
                className="flex items-center gap-1 rounded-md bg-primary-500 px-2 py-1 text-xs text-white hover:bg-primary-600"
              >
                <Shuffle className="h-3.5 w-3.5" />
                {t('random')}
              </button>
            </div>

            {(selectedColor || gradientColors.length > 0) && (
              <div className="shrink-0 rounded-md bg-dark-100/80 px-2 py-1.5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-dark-400">
                  {selectedColor && (
                    <>
                      <span className="text-dark-500">RGB</span>
                      <span
                        className="inline-block h-4 w-4 rounded border border-dark-300"
                        style={{
                          backgroundColor: `rgb(${selectedColor.r},${selectedColor.g},${selectedColor.b})`,
                        }}
                      />
                      <span>
                        {selectedColor.r},{selectedColor.g},{selectedColor.b}
                      </span>
                    </>
                  )}
                  {gradientColors.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-dark-500">∇</span>
                      {gradientColors.map((color, idx) => (
                        <span
                          key={idx}
                          className="inline-block h-3.5 w-3.5 rounded border border-dark-300"
                          style={{
                            backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex min-h-0 min-w-0 flex-col gap-2">
            <div className="flex min-h-0 flex-1 flex-col gap-1">
              <label className="text-[11px] font-medium uppercase tracking-wide text-dark-500">
                {t('inputLabel')}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('inputPlaceholder')}
                rows={3}
                className="min-h-[3.5rem] w-full flex-1 resize-none rounded-md border border-dark-200 bg-dark-100 px-2 py-1.5 text-sm text-white placeholder-dark-500 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-1">
              <label className="text-[11px] font-medium uppercase tracking-wide text-dark-500">
                {t('outputLabel')}
              </label>
              <div className="relative min-h-[3.5rem] flex-1">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder={t('outputPlaceholder')}
                  onClick={copyToClipboard}
                  rows={3}
                  className="h-full min-h-[3.5rem] w-full cursor-pointer resize-none rounded-md border border-dark-200 bg-dark-100 px-2 py-1.5 pr-24 font-mono text-[11px] leading-relaxed text-dark-600 hover:bg-dark-200/40"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded-md bg-primary-500 px-2 py-1 text-[11px] text-white hover:bg-primary-600"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      {t('copied')}
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      {t('copy')}
                    </>
                  )}
                </button>
              </div>
            </div>

            {inputText.trim() && (
              <div className="shrink-0 rounded-md border border-dark-200 bg-dark-50/80 px-2 py-2">
                <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-dark-500">
                  {t('preview')}
                </p>
                <div className="min-h-[1.75rem] rounded bg-dark-100/90 px-2 py-1.5">
                  <p className={previewClass}>
                    {previewSegments.map((seg, i) => (
                      <span
                        key={`${i}-${seg.char}`}
                        style={{
                          color: `rgb(${seg.color.r},${seg.color.g},${seg.color.b})`,
                        }}
                      >
                        {seg.char === ' ' ? '\u00A0' : seg.char}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPalette && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-3"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-xl border border-dark-200 bg-dark-50 p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2 top-2 rounded-md p-1 text-dark-400 hover:bg-dark-200 hover:text-white"
              onClick={() => setShowPalette(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <ColorPalette onColorSelect={handleColorSelect} />
          </div>
        </div>
      )}
    </div>
  )
}
