import { Navbar } from "@/common/Navbar"

export const OnBoardingForm = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div>
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-2 sm:px-6">
        <h1 className="font-plus-jakarta-sans text-2xl font-semibold text-[#0F172A]">Onboarding</h1>
        <p className="mt-2 font-plus-jakarta-sans text-sm text-[#737373]">Placeholder — add your flow here.</p>
      </main>
    </div>
  )
}
