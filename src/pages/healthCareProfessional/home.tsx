import { AuthHeroPanel } from '@/components/auth/AuthHeroPanel'
import { StafftonBrand } from '@/components/auth/StafftonBrand'
import { AuthButton } from '@/components/Button/authButton'
import { ROUTES } from '@/lib/constant'

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-[#F8FAFC] lg:overflow-hidden">
      <div className="mx-auto flex h-full w-full flex-col lg:flex-row">
        <AuthHeroPanel />

        <div className="flex w-full items-center justify-center overflow-y-auto px-6 py-8 sm:py-10 lg:w-1/2 lg:overflow-hidden lg:px-12 xl:w-[45%] xl:px-16">
          <div className="mx-auto w-full max-w-[454px] space-y-8">
            <StafftonBrand className="lg:items-start" showTagline={false} />

            <div className="space-y-3">
              <h1 className="max-w-[400px] font-plus-jakarta-sans text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl lg:text-6xl">
                Find Healthcare Jobs
              </h1>

              <p className="font-plus-jakarta-sans text-sm text-[#737373] sm:text-base">
                That Match Your Skills India&apos;s dedicated platform for healthcare professionals
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <AuthButton text="Create Account" bgColor="primary" color="#FFFFFF" link={`${ROUTES.HEALTHCARE_PROFESSIONAL}/register `} />

              <AuthButton
                text="Login"
                bgColor="brand-primary-50"
                color="black"
                borderColor="brand-primary"
                link={`${ROUTES.HEALTHCARE_PROFESSIONAL}/login`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage