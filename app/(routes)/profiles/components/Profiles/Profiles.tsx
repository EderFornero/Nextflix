"use client"
import React, { useState } from 'react'
import { ProfilesProps } from './Profiles.types'
import { Button } from '@/components/ui/button'
import { AddProfile } from './AddProfile'
import Image from 'next/image'
import { cn } from '@/lib/utils'


export function Profiles(props: ProfilesProps) {
    const { users } = props
    const [manageProfiles, setManageProfiles] = useState<boolean>(false)


    return (
        <div>
            <div className='flex items-center justify-center'>
                {users.map((user) => (
                    <div key={user.id} className='text-center relative cursor-pointer'>
                        <Image
                            src={user.avatarUrl}
                            alt={user.profileName}
                            width={140}
                            height={140}
                            className={cn(
                                manageProfiles ? "blur-md" : "",
                                "border-transparent hover:border-2 hover:border-white rounded-md"
                            )}
                        />
                        <p className='mt-2 text-gray-500 uppercase text-lg'>
                            {user.profileName}
                        </p>

                        <div className={cn(
                            "top-14 cursor-pointer w-full flex gap-4 items-center justify-center z-20",
                            manageProfiles ? "absolute" : "hidden"
                        )}>

                        </div>
                    </div>
                ))}
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
