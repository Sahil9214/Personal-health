import { CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

type CompleteStepProps = {
  homePath: string
}

const CompleteStep = ({ homePath }: CompleteStepProps) => {
  return (
    <div className="flex flex-col items-center px-2 py-8 text-center sm:py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdfa] ring-8 ring-[#f0fdfa]/60">
        <CheckCircle2 className="h-9 w-9 text-[#0D9488]" aria-hidden />
      </div>
      <h2
        id="onboarding-title"
        className="mt-8 font-plus-jakarta-sans text-2xl font-semibold text-[#0F172A] sm:text-3xl"
      >
        You&apos;re all set
      </h2>
      <p className="mt-3 max-w-md font-plus-jakarta-sans text-base leading-relaxed text-[#737373]">
        Your profile is saved. Explore roles that fit your credentials, and finish verification anytime from settings to
        unlock the full marketplace.
      </p>
      <Button
        asChild
        size="lg"
        className="mt-10 h-11 min-w-[200px] bg-[#0D9488] font-plus-jakarta-sans font-semibold text-white hover:bg-[#0D9488]/90"
      >
        <Link to={homePath}>Go to dashboard</Link>
      </Button>
    </div>
  )
}

export default CompleteStep
