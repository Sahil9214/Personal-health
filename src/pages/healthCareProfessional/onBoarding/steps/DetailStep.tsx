import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { formHintClassName, formLabelClassName, inputClassName } from "../constants"
import { useOnboarding } from "../OnboardingContext"

const DetailStep = () => {
  const { data, updateField } = useOnboarding()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-plus-jakarta-sans text-lg font-semibold text-[#0F172A]">About you</h2>
        <p className={cn(formHintClassName, "mt-1")}>This appears on your profile and helps employers recognize you.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={formLabelClassName} htmlFor="ob-full-name">
            Full name
          </label>
          <Input
            id="ob-full-name"
            autoComplete="name"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="As per ID / registration"
            className={cn(inputClassName, "mt-2")}
          />
        </div>
        <div>
          <label className={formLabelClassName} htmlFor="ob-city">
            City
          </label>
          <Input
            id="ob-city"
            autoComplete="address-level2"
            value={data.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="Current city"
            className={cn(inputClassName, "mt-2")}
          />
        </div>
        <div>
          <label className={formLabelClassName} htmlFor="ob-phone">
            Mobile <span className="font-normal text-[#A3A3A3]">(optional)</span>
          </label>
          <Input
            id="ob-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+91 …"
            className={cn(inputClassName, "mt-2")}
          />
        </div>
      </div>
    </div>
  )
}

export default DetailStep
