import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { formHintClassName, formLabelClassName, inputClassName } from "../constants"
import { useOnboarding } from "../OnboardingContext"

const ProfessionalStep = () => {
  const { data, updateField } = useOnboarding()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-plus-jakarta-sans text-lg font-semibold text-[#0F172A]">Professional credentials</h2>
        <p className={cn(formHintClassName, "mt-1")}>
          Used for verification and to surface jobs that match your license and specialty.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={formLabelClassName} htmlFor="ob-specialty">
            Primary specialty / department
          </label>
          <Input
            id="ob-specialty"
            value={data.specialty}
            onChange={(e) => updateField("specialty", e.target.value)}
            placeholder="e.g. Internal medicine, ICU, Pediatrics"
            className={cn(inputClassName, "mt-2")}
          />
        </div>
        <div>
          <label className={formLabelClassName} htmlFor="ob-years">
            Years of experience
          </label>
          <Input
            id="ob-years"
            inputMode="numeric"
            value={data.yearsExperience}
            onChange={(e) => updateField("yearsExperience", e.target.value.replace(/\D/g, "").slice(0, 2))}
            placeholder="0–60"
            className={cn(inputClassName, "mt-2")}
          />
        </div>
        <div>
          <label className={formLabelClassName} htmlFor="ob-council">
            Registering council / authority
          </label>
          <Input
            id="ob-council"
            value={data.councilName}
            onChange={(e) => updateField("councilName", e.target.value)}
            placeholder="e.g. State medical council, INC, AIOTA"
            className={cn(inputClassName, "mt-2")}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={formLabelClassName} htmlFor="ob-license">
            Registration or license number
          </label>
          <Input
            id="ob-license"
            value={data.licenseNumber}
            onChange={(e) => updateField("licenseNumber", e.target.value)}
            placeholder="As shown on your certificate"
            autoComplete="off"
            className={cn(inputClassName, "mt-2")}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfessionalStep
