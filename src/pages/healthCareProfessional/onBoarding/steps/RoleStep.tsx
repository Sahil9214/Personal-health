import { Stethoscope, HeartPulse, Brain, Activity, Building2, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import type { HealthcareRole } from "../types"
import { useOnboarding } from "../OnboardingContext"
import { formHintClassName } from "../constants"

const ROLES: { value: HealthcareRole; label: string; description: string; icon: typeof Stethoscope }[] = [
  { value: "physician", label: "Physician / surgeon", description: "MBBS, MD, MS, DNB, or equivalent", icon: Stethoscope },
  { value: "nurse", label: "Nursing", description: "Staff nurse, nurse practitioner, educator", icon: HeartPulse },
  { value: "therapist", label: "Therapist", description: "Physio, occupational, speech, mental health", icon: Brain },
  { value: "allied_health", label: "Allied health", description: "Lab, radiology, pharmacy, technicians", icon: Activity },
  { value: "administrator", label: "Administrator", description: "Hospital ops, quality, health IT", icon: Building2 },
  { value: "other", label: "Other", description: "Tell us more in the next steps", icon: HelpCircle },
]

const RoleStep = () => {
  const { data, updateField } = useOnboarding()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-plus-jakarta-sans text-lg font-semibold text-[#0F172A]">What best describes you?</h2>
        <p className={cn(formHintClassName, "mt-1")}>Choose one—we use this to tailor job matches and compliance checks.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Professional role">
        {ROLES.map(({ value, label, description, icon: Icon }) => {
          const selected = data.role === value
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => updateField("role", value)}
              className={cn(
                "flex w-full flex-col items-start gap-2 rounded-xl border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488]/30",
                selected
                  ? "border-[#0D9488] bg-[#f0fdfa]/50 shadow-[0_0_0_1px_rgba(13,148,136,0.15)]"
                  : "border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#0D9488]/40 hover:bg-white",
              )}
            >
              <span className="flex w-full items-start gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    selected ? "bg-[#0D9488] text-white" : "bg-white text-[#0D9488] ring-1 ring-[#E5E5E5]",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-plus-jakarta-sans text-sm font-semibold text-[#0F172A]">{label}</span>
                  <span className="mt-0.5 block font-plus-jakarta-sans text-xs font-medium leading-snug text-[#737373]">
                    {description}
                  </span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RoleStep
