import type { ReactNode } from 'react'

import { AuthHeroPanel } from './AuthHeroPanel'
import { cn } from '@/lib/utils'

type AuthCardLayoutProps = {
  children: ReactNode
  className?: string
  /** Wider form column for multi-field steps */
  formWide?: boolean
}

export function AuthCardLayout({ children, className, formWide }: AuthCardLayoutProps) {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#F8FAFC]">
      <div
        className={cn(
          'mx-auto flex h-full min-h-0 w-full max-w-[1440px] flex-col lg:flex-row',
          className,
        )}
      >
        <AuthHeroPanel />
        {/* Figma: white form column; scroll inside column only so tall forms are not clipped */}
        <div className="flex h-full min-h-0 w-full flex-1 flex-col bg-white lg:w-1/2 xl:w-[45%]">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 sm:py-10 lg:px-12 xl:px-14">
            <div
              className={cn(
                'mx-auto flex min-h-full w-full flex-col items-start',
                formWide ? 'max-w-[520px]' : 'max-w-[454px]',
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
