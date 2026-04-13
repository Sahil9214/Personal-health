import { Routes, Route } from 'react-router-dom'
import AdminPage from '@/pages/admin'

import Register from '@/pages/healthCareProfessional/register'
import Login from '@/pages/healthCareProfessional/login'
import VerifyOtp from '@/pages/healthCareProfessional/verify-otp'
import { ROUTES } from '@/lib/constant'
import HomePage from '@/pages/healthCareProfessional/home'
import { OnBoardingForm } from '@/pages/healthCareProfessional/onBoarding'

const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path={`${ROUTES.HEALTHCARE_PROFESSIONAL}`} element={<HomePage />} />
      <Route path={`${ROUTES.HEALTHCARE_PROFESSIONAL}/login`} element={<Login />} />
      <Route path={`${ROUTES.HEALTHCARE_PROFESSIONAL}/verify-otp`} element={<VerifyOtp />} />
      <Route path={`${ROUTES.HEALTHCARE_PROFESSIONAL}/register`} element={<Register />} />
      <Route path={`${ROUTES.HEALTHCARE_PROFESSIONAL}/onboarding`} element={<OnBoardingForm />} />
    </Routes>
  );
};

export default AllRouter;