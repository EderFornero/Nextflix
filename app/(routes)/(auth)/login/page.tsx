import Link from 'next/link'
import { Checkbox } from "@/components/ui/checkbox"
import Terms from '../components/Terms/Terms'
import LoginForm from './LoginForm/LoginForm'


async function page() {
    return (
        <div>
            <p className='text-3xl font-bold text-left mb-7'>Log In</p>
            <LoginForm />
            <div className='mt-5 text-center'>
                <Link href={''} className='hover:underline hover:opacity-70'>
                    Forgot your password?
                </Link>
            </div>

            <div className='flex items-center space-x-2 mt-4'>
                <Checkbox id='terms' className='border-white' />
                <label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Remember me</label>
            </div>

            <div className='mt-4 flex gap-1'>
                <p className='text-white opacity-70'>Still not on Nextflix?</p>
                <Link href='/register' className='opacity-1 text-white'>
                    Register now!
                </Link>
            </div>
            <Terms />
        </div>
    )
}

export default page