import heroImagesvg from "@/assets/svg/login.svg"
import { cn } from '@/lib/utils'

type AuthHeroPanelProps = {
  className?: string
  imageClassName?: string
  alt?: string
}

export const AuthHeroPanel = ({
  className,
  imageClassName,
  alt = 'Healthcare professionals'
}: AuthHeroPanelProps) => {
  return (
    <div
      className={cn(
        'relative hidden h-full min-h-0 w-full shrink-0 lg:block lg:w-1/2 xl:w-[55%]',
        className
      )}
    >
      <div className="h-full w-full p-2">
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#E5E5E5]">

          <img
            src={heroImagesvg}
            alt={alt}
            className={cn(
              'absolute inset-0 h-full w-full object-cover',
              imageClassName
            )}
          />

        </div>
      </div>
    </div>
  )
}