import logoImg from '@/assets/svg/staffton-logo-login.svg'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constant'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center py-4 max-w-[1200px] mx-auto'>
        <img src={logoImg} alt="logo" />
        <Button
        variant='default'
        size='xl'
        className='font-plus-jakarta-sans text-sm font-semibold px-6'
        onClick={() => {
            navigate(`${ROUTES.HEALTHCARE_PROFESSIONAL}/login`)
        }}
        >Login</Button>
    </div>
  )
}


