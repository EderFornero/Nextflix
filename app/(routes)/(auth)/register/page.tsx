import Link from 'next/link'
import React from 'react'
import Terms from '../components/Terms/Terms'
import { RegisterForm } from './RegisterForm'

function page() {
    return (
        <div>
            <p className='text-3xl font-bold text-left mb-7'>Register</p>

            <RegisterForm />

            <div className='mt-4 flex gap-1'>
                <p className='text-white opacity-70'>Already have an account?</p>
                <Link href='/login' className='opacity-1 text-white'>
                    Log in now!
                </Link>
            </div>

            <Terms />
        </div>
    )
}

export default page