"use client"
import React from 'react'
import { ProfilesProps } from './Profiles.types'
import { Button } from '@/components/ui/button'
import { AddProfile } from './AddProfile'


export function Profiles(props: ProfilesProps) {
    const { users } = props
    return (
        <div>
            <div className='flex items-center justify-center'>
                <AddProfile />
            </div>

            <div className='mt-16 flex items-center justify-center'>
                <Button
                    variant="outline"
                    size="lg"
                    className='text-gray-500 border-gray-500'
                    onClick={() => console.log('Manage')}
                >Manage Profiles</Button>
            </div>
        </div>
    )
}
