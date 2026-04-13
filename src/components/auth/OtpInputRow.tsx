import { type ClipboardEvent, type KeyboardEvent, useRef } from 'react'

import { cn } from '@/lib/utils'

const GROUPS: [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
]

type OtpInputRowProps = {
  value: string
  onChange: (next: string) => void
  disabled?: boolean
  className?: string
}

export function OtpInputRow({ value, onChange, disabled, className }: OtpInputRowProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const v = value.replace(/\D/g, '').slice(0, 6)
  const chars = Array.from({ length: 6 }, (_, i) => v[i] ?? '')

  const focusAt = (i: number) => {
    const el = inputsRef.current[i]
    el?.focus()
    el?.select()
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length > 0) {
      e.preventDefault()
      onChange(text)
      focusAt(Math.min(text.length, 5))
    }
  }

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (digits.length === 0) {
      onChange(v.slice(0, index) + v.slice(index + 1))
      return
    }
    if (digits.length > 1) {
      const merged = (v.slice(0, index) + digits + v.slice(index + 1)).replace(/\D/g, '').slice(0, 6)
      onChange(merged)
      focusAt(Math.min(index + digits.length - 1, 5))
      return
    }
    const next = (v.slice(0, index) + digits + v.slice(index + 1)).replace(/\D/g, '').slice(0, 6)
    onChange(next)
    if (index < 5) focusAt(index + 1)
  }

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!v[index] && index > 0) {
        e.preventDefault()
        onChange(v.slice(0, index - 1) + v.slice(index))
        focusAt(index - 1)
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) focusAt(index - 1)
    if (e.key === 'ArrowRight' && index < 5) focusAt(index + 1)
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {GROUPS.map((group, gIdx) => (
        <div key={gIdx} className="flex items-center gap-2">
          {group.map((digitIndex) => (
            <input
              key={digitIndex}
              ref={(el) => {
                inputsRef.current[digitIndex] = el
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              disabled={disabled}
              className={cn(
                'box-border size-[48.14px] shrink-0 rounded-lg border border-[#E5E5E5] bg-white text-center text-sm font-normal leading-5 tabular-nums tracking-normal text-[#0A0A0A] outline-none transition-[border-color,box-shadow] [font-family:var(--font-geist-otp)] focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/25',
                disabled && 'opacity-60',
              )}
              value={chars[digitIndex]}
              onChange={(e) => handleChange(digitIndex, e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => onKeyDown(digitIndex, e)}
              onFocus={(e) => e.target.select()}
              aria-label={`Digit ${digitIndex + 1}`}
            />
          ))}
          {gIdx < GROUPS.length - 1 ? (
            <span className="select-none text-lg font-medium text-[#94A3B8]" aria-hidden>
              -
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
