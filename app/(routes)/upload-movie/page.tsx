import Logo from '@/components/shared/Logo/Logo'
import React from 'react'
import { NormalMovie } from './components/NormalMovie'
import { PopularMovie } from './components/PopularMovie'

export default function UploadMovie() {
    return (
        <div className='bg-zin-900 h-full flex flex-col justify-center items-center'>
            <Logo />
            <h1 className='text-2xl my-8 font-semibold'>
                Upload your favourites movies ⬆️
            </h1>
            <div className='max-w-2xl mx-auto grid grid-cols-2 gap-4'>
                <NormalMovie />
                <PopularMovie />
            </div>
        </div>
    )
}
