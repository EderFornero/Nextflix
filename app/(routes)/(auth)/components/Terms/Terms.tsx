"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function Terms() {

    const [showTerms, setShowTerms] = useState<boolean>(false)

    return (
        <div className='text-xs mt-4 mb-10 text-gray-600 max-w-72'>
            <div className='mb-5'>
                <span>
                    This page is protected by Google reCAPTCHA for security purposes.
                </span>
                <Button
                    variant='ghost'
                    onClick={() => setShowTerms(!showTerms)}
                    className='opacity-1 text-[#0071eb] hover:bg-transparent p-0 ml-1 h-fit'
                >
                    More Information
                </Button>
            </div>

            {showTerms &&
                <div className='h-8 transition-all duration-300'>
                    <p>
                        The information you provide on this site is collected by Google reCAPTCHA
                        and it is used to verify that you are a human, and not a bot. Also, it is used for security purposes.
                    </p>
                </div>
            }
        </div>
    )
}

export default Terms