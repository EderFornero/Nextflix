"use client"
import React, { useState } from 'react'
import { ProfilesProps } from './Profiles.types'
import { Button } from '@/components/ui/button'
import { AddProfile } from './AddProfile'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCurrentUserNextflix } from '@/hooks/use-current-user'
import { UserNextflix } from '@prisma/client'


export function Profiles(props: ProfilesProps) {
    const [users, setUsers] = useState(props.users)
    const [manageProfiles, setManageProfiles] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(0)
    const profilesPerPage = 2
    const router = useRouter()
    const { changeCurrentUser } = useCurrentUserNextflix()


    const onClickUser = (user: UserNextflix) => {
        changeCurrentUser(user)
        router.push("/")
    }


    const deleteUser = async (userIdNextflix: string) => {
        try {
            axios.delete("/api/auth/userNextflix", { data: { userIdNextflix } })
            setUsers((prev) => prev.filter((user) => user.id !== userIdNextflix))
            router.refresh()
            toast({ title: "Profile deleted successfully", variant: "newVariant" })
            setManageProfiles(false)
        } catch (error) {
            console.log(error)
            toast({ title: "Ops! An error ocurrered", variant: "destructive" })
        }
    }

    const shortName = (name: string) => {
        if (name.length > 10) {
            return name.slice(0, 10) + "..."
        } else {
            return name
        }
    }

    const pages = Math.ceil(users.length / profilesPerPage)
    const startIndex = currentPage * profilesPerPage
    const currentProfiles = users.slice(startIndex, startIndex + profilesPerPage)

    return (
        <div className='max-w-full overflow-visible relative'>

            <div className='flex items-center justify-center gap-4 relative'>
                {currentPage > 0 && (
                    <button
                        className="absolute -left-20  top-1/2 transform -translate-y-1/2 p-8 text-gray-500 z-10"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}



                {currentProfiles.map((user) => (
                    <div
                        key={user.id}
                        className='text-center relative cursor-pointer'
                        onClick={() => onClickUser(user)}
                    >
                        <div className='flex items-center justify-center gap-4'>
                            <div>
                                <Image
                                    src={user.avatarUrl}
                                    alt={user.profileName}
                                    width={140}
                                    height={140}
                                    objectFit='cover'
                                    className={cn(
                                        manageProfiles ? "blur-md" : "",
                                        "border-transparent hover:border-2 hover:border-white rounded-md w-[140px] h-[150px]"
                                    )}
                                />
                                <p className='mt-2 text-gray-500 uppercase text-lg'>
                                    {shortName(user.profileName)}
                                </p>
                            </div>
                        </div>

                        <div className={cn(
                            "top-14 cursor-pointer w-full flex gap-4 items-center justify-center z-20",
                            manageProfiles ? "absolute" : "hidden"
                        )}>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className='bg-white rounded-full hover:bg-red-100 p-1'>
                                        <Trash2 className='w-6 h-6 text-red-500' />
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='bg-zinc-900'>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to delete this profile?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setManageProfiles(false)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            className='text-red-500 border-red-500 border hover:bg-red-500 hover:text-white'
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}

                {/* Flecha de avance al lado derecho */}
                {currentPage < pages - 1 && (
                    <button
                        className="absolute -right-8 top-1/2 transform -translate-y-1/2 p-2 pl-6 text-gray-500"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages - 1))}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}

                <AddProfile />
            </div>

            <div className='mt-16 flex items-center justify-center'>
                <Button
                    variant="outline"
                    size="lg"
                    className='text-gray-500 border-gray-500'
                    onClick={() => setManageProfiles(!manageProfiles)}
                >Manage Profiles</Button>
            </div>
        </div>
    )
}
