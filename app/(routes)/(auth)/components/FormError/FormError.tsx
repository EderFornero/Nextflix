import React from 'react'
import { FormeErrorProps } from './FormError.types'
import { TriangleAlert } from 'lucide-react'

function FormError(props: FormeErrorProps) {
    const { message } = props
    if (!message) return null

    return (
        <div className='bg-destructive/50 p-3 rounded-md flex items-center gap-x-2 text-sm text-white'>
            <TriangleAlert />
            <p>{message}</p>
        </div>
    )
}

export default FormError