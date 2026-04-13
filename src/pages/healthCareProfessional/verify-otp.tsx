import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel"
import { StafftonBrand } from "@/components/auth/StafftonBrand"
import { ROUTES } from "@/lib/constant"
import { cn } from "@/lib/utils"

const OTP_LENGTH = 6
const RESEND_SECONDS = 27

const slotClassName =
  "box-border flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white text-center font-[family-name:var(--font-geist-otp)] text-sm font-normal text-[#0A0A0A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none transition-[border,box-shadow] focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 sm:h-[48.14px] sm:w-[48.14px]"

function VerifyOtp() {
  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LENGTH).fill(""))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 0 : s - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const focusSlot = (index: number) => {
    inputsRef.current[index]?.focus()
  }

  const setDigitAt = (index: number, digit: string) => {
    setOtp((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
  }

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "")
    if (digits.length === 0) {
      setDigitAt(index, "")
      return
    }
    if (digits.length >= OTP_LENGTH) {
      const arr = digits.slice(0, OTP_LENGTH).split("")
      setOtp(arr)
      focusSlot(OTP_LENGTH - 1)
      return
    }
    const digit = digits.slice(-1)
    setDigitAt(index, digit)
    if (digit && index < OTP_LENGTH - 1) {
      focusSlot(index + 1)
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusSlot(index - 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!text) return
    const arr = text.split("")
    setOtp((prev) => {
      const next = [...prev]
      arr.forEach((d, i) => {
        if (i < OTP_LENGTH) next[i] = d
      })
      return next
    })
    focusSlot(Math.min(arr.length, OTP_LENGTH) - 1)
  }

  const handleResend = () => {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
    setOtp(Array(OTP_LENGTH).fill(""))
    focusSlot(0)
  }

  return (
    <div className="h-screen w-full bg-[#F8FAFC] lg:overflow-hidden">
      <div className="mx-auto flex h-full w-full flex-col lg:flex-row">
        <AuthHeroPanel />

        <div className="flex w-full flex-1 flex-col items-stretch overflow-y-auto px-6 pb-8 pt-10 sm:pb-10 sm:pt-12 lg:min-h-0 lg:w-1/2 lg:overflow-hidden lg:px-12 xl:w-[45%] xl:px-16">
          <div className="mx-auto flex w-full max-w-[min(550px,100%)] flex-col justify-between space-y-10 sm:space-y-16 lg:space-y-32 max-lg:mr-0 lg:mr-20">
            <StafftonBrand className="shrink-0 lg:items-start" showTagline={false} />
            <div className="flex w-full max-w-[454px] flex-col space-y-6 mt-20">
              <div className="flex flex-col gap-2">
                <h1 className="font-plus-jakarta-sans text-[28px] font-semibold leading-[1.19] tracking-[-0.2px] text-[#0F172A] sm:text-[32px] sm:leading-[38px]">
                  Verify Your Number
                </h1>
                <p className="font-plus-jakarta-sans text-base font-medium leading-6 text-secondary">
                  Enter the 6-digit OTP sent to your mobile
                </p>
              </div>

              <form
                className="flex w-full flex-col items-center gap-3"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <div className="flex w-full max-w-[454px] flex-col gap-2">
                  <label
                    htmlFor="otp-0"
                    className="font-plus-jakarta-sans text-sm font-normal leading-5 text-[#0A0A0A]"
                  >
                    Enter Otp
                  </label>
                  <div
                    className="flex w-full max-w-[454px] flex-row flex-wrap items-center justify-center gap-2 sm:justify-between sm:gap-2"
                    onPaste={handlePaste}
                  >
                    {otp.map((value, index) => (
                      <div key={index} className="contents">
                        <input
                          ref={(el) => {
                            inputsRef.current[index] = el
                          }}
                          id={index === 0 ? "otp-0" : undefined}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={value}
                          aria-label={`Digit ${index + 1}`}
                          className={cn(slotClassName)}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                        {index === 1 ? (
                          <span
                            className="hidden h-0 w-[34px] shrink-0 border-t border-[#D4D4D4] sm:block"
                            aria-hidden
                          />
                        ) : null}
                        {index === 3 ? (
                          <span
                            className="hidden h-0 w-[35px] shrink-0 border-t border-[#D4D4D4] sm:block"
                            aria-hidden
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full max-w-[454px] rounded-xl bg-[#0D9488] px-6 py-3 font-plus-jakarta-sans text-base font-bold leading-6 text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  Verify OTP
                </button>

                <div className="flex w-full max-w-[454px] flex-row flex-wrap items-start justify-between gap-3 gap-y-2">
                  <Link
                    to={`${ROUTES.HEALTHCARE_PROFESSIONAL}/register`}
                    className="inline-flex items-center gap-1 font-plus-jakarta-sans text-sm font-medium leading-5 text-[#0D9488] underline decoration-[#0D9488] underline-offset-2 hover:opacity-90"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0 text-[#0D9488]" strokeWidth={1.5} />
                    Edit Details
                  </Link>
                  {secondsLeft > 0 ? (
                    <span className="font-plus-jakarta-sans text-sm font-medium leading-5 text-[#0D9488] underline decoration-[#0D9488] underline-offset-2">
                      Resend OTP in {secondsLeft}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-plus-jakarta-sans text-sm font-medium leading-5 text-[#0D9488] underline decoration-[#0D9488] underline-offset-2 hover:opacity-90"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp
