import { AuthButton } from "@/components/Button/authButton"
import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel"
import { StafftonBrand } from "@/components/auth/StafftonBrand"
import { ROUTES } from "@/lib/constant"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="h-screen w-full bg-[#F8FAFC] lg:overflow-hidden">
            <div className="mx-auto flex h-full w-full flex-col lg:flex-row">
                <AuthHeroPanel />

                <div className="flex w-full flex-1 flex-col items-stretch overflow-y-auto px-6 pb-8 pt-10 sm:pb-10 sm:pt-12 lg:min-h-0 lg:w-1/2 lg:overflow-hidden lg:px-12 xl:w-[45%] xl:px-16">
                    <div className="mx-auto flex min-h-full w-full max-w-[454px] flex-col justify-between max-lg:mr-0 lg:mr-20">
                        <StafftonBrand className="shrink-0 lg:items-start" showTagline={false} />
                        <div className="flex flex-col space-y-6  mb-30">
                            <div className="flex flex-col space-y-4">
                                <h1 className="font-plus-jakarta-sans text-black xl:text-[32px] leading-[1.1] font-semibold">Welcome Back</h1>
                                <p className="font-plus-jakarta-sans text-base font-medium leading-[1.5] text-secondary">
                                    Login with your registered email
                                </p>
                            </div>
                            <form className="flex w-full max-w-[454px] flex-col items-start gap-2">
                                <label htmlFor="login-email" className="text-sm font-medium leading-5 text-black">
                                    Email
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="box-border flex h-10 w-full min-w-0 shrink-0 items-center rounded-xl border border-[#D4D4D4] bg-white px-3 py-1 font-plus-jakarta-sans text-sm font-medium leading-5 text-neutral-900 shadow-sm placeholder:text-[#A3A3A3] placeholder:font-medium"
                                    aria-label="Enter your email address"
                                />

                                <AuthButton text="Send OTP" bgColor="primary" color="#FFFFFF" link="/register" />
                               <div className="mx-auto"><p className="flex flex-row items-center justify-center gap-1 font-plus-jakarta-sans text-sm text-primary">
                                    New Here?{" "}
                                    <Link
                                        to={`${ROUTES.HEALTHCARE_PROFESSIONAL}/register`}
                                        className="font-medium underline-offset-2 hover:underline"
                                    >
                                        Create Account
                                    </Link>
                                </p></div> 
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login