import { AuthButton } from "@/components/Button/authButton"
import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel"
import { StafftonBrand } from "@/components/auth/StafftonBrand"
import { ROUTES } from "@/lib/constant"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"

const Register = () => {
    return (
        <div className="h-screen w-full bg-[#F8FAFC] lg:overflow-hidden">
            <div className="mx-auto flex h-full w-full flex-col lg:flex-row">
                <AuthHeroPanel />

                <div className="flex w-full flex-1 flex-col items-stretch overflow-y-auto px-6 pb-8 pt-10 sm:pb-10 sm:pt-12 lg:min-h-0 lg:w-1/2 lg:overflow-hidden lg:px-12 xl:w-[45%] xl:px-16">
                    <div className="mx-auto flex w-full max-w-[454px] flex-col justify-between space-y-32 max-lg:mr-0 lg:mr-20">
                        <StafftonBrand className="shrink-0 lg:items-start" showTagline={false} />
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-col space-y-4">
                                <h1 className="font-plus-jakarta-sans text-black xl:text-[32px] leading-[1.1] font-semibold">Create Account</h1>
                                <p className="font-plus-jakarta-sans text-base font-medium leading-[1.5] text-secondary">
                                Join 50,000+ healthcare professionals
                                </p>
                            </div>
                            <form className="flex w-full max-w-[454px] flex-col items-start gap-3">
                                <div className="w-full">
                                    <label htmlFor="register-full-name" className="text-sm font-medium leading-5 text-black">
                                        Full Name
                                    </label>
                                    <Input
                                        id="register-full-name" 
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="box-border flex h-10 w-full min-w-0 shrink-0 items-center rounded-xl border border-[#D4D4D4] bg-white px-3 py-1 font-plus-jakarta-sans text-sm font-medium leading-5 text-neutral-900 shadow-sm placeholder:font-medium placeholder:text-[#A3A3A3]"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="register-email" className="text-sm font-medium leading-5 text-black">
                                        Email
                                    </label>
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="box-border flex h-10 w-full min-w-0 shrink-0 items-center rounded-xl border border-[#D4D4D4] bg-white px-3 py-1 font-plus-jakarta-sans text-sm font-medium leading-5 text-neutral-900 shadow-sm placeholder:font-medium placeholder:text-[#A3A3A3]"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="register-mobile" className="text-sm font-medium leading-5 text-black">
                                        Mobile Number
                                    </label>
                                    <Input
                                        id="register-mobile"
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        className="box-border flex h-10 w-full min-w-0 shrink-0 items-center rounded-xl border border-[#D4D4D4] bg-white px-3 py-1 font-plus-jakarta-sans text-sm font-medium leading-5 text-neutral-900 shadow-sm placeholder:font-medium placeholder:text-[#A3A3A3]"
                                    />
                                </div>

                                <label htmlFor="register-consent" className="mt-1 flex items-start gap-2 text-sm leading-5 text-secondary">
                                    <input id="register-consent" type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" />
                                    <span className="font-plus-jakarta-sans">
                                        I agree to the{" "}
                                        <Link to="#" className="font-medium text-primary underline-offset-2 hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link to="#" className="font-medium text-primary underline-offset-2 hover:underline">
                                            Privacy Policy
                                        </Link>{" "}
                                        (DPDPA compliant)
                                    </span>
                                </label>

                                <AuthButton text="Continue and Send OTP" bgColor="primary" color="#FFFFFF" link="/register" />
                                <div className="mx-auto">
                                    <p className="flex flex-row items-center justify-center gap-1 font-plus-jakarta-sans text-sm text-primary">
                                        Already have an account?{" "}
                                        <Link
                                            to={`${ROUTES.HEALTHCARE_PROFESSIONAL}/login`}
                                            className="font-medium underline-offset-2 hover:underline"
                                        >
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register