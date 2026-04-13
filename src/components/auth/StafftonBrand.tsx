import stafftonLogo from '@/assets/svg/staffton-logo-login.svg'
import { cn } from '@/lib/utils'

type StafftonBrandProps = {
  className?: string
  /** Figma: “CONNECTING HEALTHCARE PROFESSIONALS” under logo */
  showTagline?: boolean
}

export function StafftonBrand({ className }: StafftonBrandProps) {
  return (
    <div className={cn('flex flex-col items-start gap-1.5', className)}>
      <img
        src={stafftonLogo}
        alt="STAFFTON"
        className="h-9 w-auto max-w-[200px] sm:h-10"
        width={189}
        height={44}
      />
   
    </div>
  )
}
