import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Navbar } from "@/common/Navbar"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constant"
import { cn } from "@/lib/utils"

import { STEP_LABELS, STORAGE_KEY } from "./constants"
import { OnboardingProvider, useOnboarding } from "./OnboardingContext"
import CompleteStep from "./steps/CompleteStep"
import DetailStep from "./steps/DetailStep"
import DocumentStep from "./steps/DocumentStep"
import PreferencesStep from "./steps/PreferencesStep"
import ProfessionalStep from "./steps/ProfessionalStep"
import ResumeStep from "./steps/ResumeStep"
import RoleStep from "./steps/RoleStep"
import { submitOnboarding } from "./submitOnboarding"
import { validateStep } from "./validation"

const FORM_STEP_COUNT = 6

const stepComponents = [RoleStep, DetailStep, ProfessionalStep, ResumeStep, DocumentStep, PreferencesStep]

function OnboardingWizard() {
  const { data, files } = useOnboarding()
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const showForm = !complete

  useEffect(() => {
    mainRef.current?.focus()
  }, [step, complete])

  const goNext = useCallback(async () => {
    setError(null)
    const err = validateStep(step, data, files)
    if (err) {
      setError(err)
      return
    }
    if (step < FORM_STEP_COUNT - 1) {
      setStep((s) => s + 1)
      return
    }
    setSubmitting(true)
    try {
      await submitOnboarding(data, files)
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      setComplete(true)
    } catch {
      setError("Something went wrong while saving your profile. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }, [step, data, files])

  const goBack = useCallback(() => {
    setError(null)
    if (step > 0) setStep((s) => s - 1)
  }, [step])

  const Current = stepComponents[step] ?? RoleStep

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div>

      <main
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto max-w-3xl px-4 pb-16 pt-2 outline-none sm:px-6 lg:max-w-4xl"
        aria-labelledby="onboarding-title"
      >
        {showForm ? (
          <>
            <div className="mb-8 text-center sm:mb-10 sm:text-left">
              <p className="font-plus-jakarta-sans text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
                Profile setup
              </p>
              <h1 id="onboarding-title" className="mt-1 font-plus-jakarta-sans text-2xl font-semibold text-[#0F172A] sm:text-3xl">
                Complete your onboarding
              </h1>
              <p className="mt-2 max-w-xl font-plus-jakarta-sans text-sm text-[#737373] sm:text-base">
                A few details help us match you to the right roles. You can update everything later from your profile.
              </p>
            </div>

            <ol
              className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-1"
              aria-label="Onboarding progress"
            >
              {STEP_LABELS.map((label, i) => {
                const done = i < step
                const active = i === step
                return (
                  <li key={label} className="flex items-center">
                    {i > 0 ? (
                      <span className="mx-1 hidden h-px w-4 bg-[#E5E5E5] sm:block" aria-hidden />
                    ) : null}
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-plus-jakarta-sans text-xs font-medium sm:text-sm",
                        done && "border-[#0D9488]/30 bg-[#f0fdfa] text-[#0D9488]",
                        active && "border-[#0D9488] bg-white text-[#0F172A] shadow-sm",
                        !done && !active && "border-[#E5E5E5] bg-white text-[#737373]",
                      )}
                      aria-current={active ? "step" : undefined}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                          done && "bg-[#0D9488] text-white",
                          active && "bg-[#0F172A] text-white",
                          !done && !active && "bg-[#F5F5F5] text-[#737373]",
                        )}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      <span className="max-sm:hidden">{label}</span>
                    </span>
                  </li>
                )
              })}
            </ol>

            <div
              className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-8"
              role="region"
              aria-live="polite"
              aria-label={STEP_LABELS[step]}
            >
              <Current />
              {error ? (
                <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-plus-jakarta-sans text-sm text-red-800">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 w-full font-plus-jakarta-sans sm:w-auto"
                onClick={goBack}
                disabled={step === 0 || submitting}
              >
                <ChevronLeft className="mr-1 h-4 w-4" aria-hidden />
                Back
              </Button>
              <Button
                type="button"
                size="lg"
                className="h-11 w-full bg-[#0D9488] font-plus-jakarta-sans font-semibold text-white hover:bg-[#0D9488]/90 sm:w-auto sm:min-w-[160px]"
                onClick={goNext}
                disabled={submitting}
              >
                {step === FORM_STEP_COUNT - 1 ? (submitting ? "Saving…" : "Finish") : "Continue"}
                {!submitting && step < FORM_STEP_COUNT - 1 ? (
                  <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
                ) : null}
              </Button>
            </div>

            <p className="mt-6 text-center font-plus-jakarta-sans text-xs text-[#A3A3A3] sm:text-left">
              Step {step + 1} of {FORM_STEP_COUNT}
            </p>
          </>
        ) : (
          <CompleteStep homePath={ROUTES.HEALTHCARE_PROFESSIONAL} />
        )}
      </main>
    </div>
  )
}

const OnBoardingForm = () => {
  return (
    <OnboardingProvider>
      <OnboardingWizard />
    </OnboardingProvider>
  )
}

export default OnBoardingForm
