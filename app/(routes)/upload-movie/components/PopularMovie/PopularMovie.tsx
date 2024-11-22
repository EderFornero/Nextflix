"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import axios from "axios"
import { Upload } from "lucide-react"
import { trendingMovies } from "./PopularMovie.data"

export function PopularMovie() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const uploadMovie = async () => {
        setIsLoading(true)
        try {
            await axios.post('/api/auth/create-popular-movie', {
                popularMovies: trendingMovies
            })
            toast({ title: 'Movies uploaded successfully', variant: 'newVariant' })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="border rounded-lg border-white-400 p-6 hover:bg-slate-500 transition-all duration-300">
            <h1 className="text-xl font-bold mb-4">
                Upload Trending Movies
            </h1>
            <Button
                className={`w-full ${isLoading && 'opacity-50'}`}
                onClick={uploadMovie}
                variant={'secondary'}
                disabled={isLoading}
            >
                {!isLoading ?
                    <>
                        Upload
                        <Upload className='w-4 h-4' />
                    </>
                    : <div
                        className="w-6 h-6 border-4 border-t-red-500 border-gray-300 rounded-full animate-spin"
                    ></div>
                }
            </Button>
        </div>
    )
}

