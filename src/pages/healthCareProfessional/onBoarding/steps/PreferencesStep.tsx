import { cn } from "@/lib/utils"

import { formHintClassName, formLabelClassName } from "../constants"
import type { WorkTypePreference } from "../types"
import { useOnboarding } from "../OnboardingContext"

const WORK_TYPES: { value: WorkTypePreference; label: string; hint: string }[] = [
  { value: "full_time", label: "Full-time", hint: "Standard employment" },
  { value: "part_time", label: "Part-time", hint: "Reduced hours" },
  { value: "contract", label: "Contract", hint: "Fixed-term roles" },
  { value: "locum", label: "Locum / shifts", hint: "Short assignments" },
]

const NOTICE_OPTIONS = [
  { value: "immediate", label: "Immediately available" },
  { value: "2_weeks", label: "Within 2 weeks" },
  { value: "1_month", label: "Within 1 month" },
  { value: "2_months_plus", label: "More than 1 month" },
] as const

const PreferencesStep = () => {
  const { data, updateField } = useOnboarding()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-plus-jakarta-sans text-lg font-semibold text-[#0F172A]">Work preferences</h2>
        <p className={cn(formHintClassName, "mt-1")}>
          We use this for job alerts—you can refine filters anytime on the jobs board.
        </p>
      </div>

      <div>
        <p className={formLabelClassName}>Preferred work type</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Preferred work type">
          {WORK_TYPES.map(({ value, label, hint }) => {
            const selected = data.workType === value
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateField("workType", value)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]/30",
                  selected
                    ? "border-[#0D9488] bg-[#f0fdfa]/50 shadow-[0_0_0_1px_rgba(13,148,136,0.12)]"
                    : "border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#0D9488]/35",
                )}
              >
                <span className="block font-plus-jakarta-sans text-sm font-semibold text-[#0F172A]">{label}</span>
                <span className="mt-0.5 block font-plus-jakarta-sans text-xs text-[#737373]">{hint}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className={formLabelClassName} htmlFor="ob-notice">
          Availability / notice period
        </label>
        <select
          id="ob-notice"
          value={data.noticePeriod}
          onChange={(e) => updateField("noticePeriod", e.target.value)}
          className={cn(
            "mt-2 flex h-10 w-full rounded-xl border border-[#D4D4D4] bg-white px-3 font-plus-jakarta-sans text-sm font-medium text-[#0F172A] shadow-sm outline-none focus-visible:border-[#0D9488] focus-visible:ring-2 focus-visible:ring-[#0D9488]/20",
            !data.noticePeriod && "text-[#A3A3A3]",
          )}
        >
          <option value="">Select…</option>
          {NOTICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className={formLabelClassName}>Open to relocating for the right role?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ] as const
          ).map(({ value, label }) => {
            const selected = data.openToRelocate === value
            return (
              <button
                key={String(value)}
                type="button"
                onClick={() => updateField("openToRelocate", value)}
                className={cn(
                  "min-h-11 rounded-xl border px-5 py-2.5 font-plus-jakarta-sans text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]/30",
                  selected
                    ? "border-[#0D9488] bg-[#0D9488] text-white"
                    : "border-[#E5E5E5] bg-white text-[#0F172A] hover:border-[#0D9488]/40",
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PreferencesStep
