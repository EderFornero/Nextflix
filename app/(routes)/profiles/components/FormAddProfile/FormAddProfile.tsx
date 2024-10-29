"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    //FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios'


import { FormAddProfileProps } from "./FormAddProfile.types";
import { formSchema } from "./FormAddProfile.form"
import { dataProfileImages } from "./FormAddProfile.data"
import Image from "next/image"
// import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FormAddProfile(props: FormAddProfileProps) {

    const { setOpen } = props
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            profileName: "",
            avatarUrl: undefined
        },
    })



    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)

            const res = await axios.post("/api/auth/userNextflix", values)
            if (res.status !== 200) {
                toast({ title: "Ops! Something went wrong", variant: "destructive" })
            } else {
                toast({ title: "Profile created successfully", variant: "newVariant" })
            }

            router.refresh()
            setOpen(false)

        } catch (error) {
            toast({ title: "Ops! Something went wrong", variant: "destructive" })
            setIsLoading(false)
            throw error
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="profileName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="McLovin" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose an avatar</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[300px] hide-scrollbar"
                                >
                                    {dataProfileImages.map((url, index) => (
                                        <FormItem
                                            key={index}
                                            className="flex flex-row items-center justify-center space-x-5 cursor-pointer"
                                        >
                                            <FormControl className="text-white">
                                                <RadioGroupItem value={url.urlImage} />
                                            </FormControl>
                                            <FormLabel className="font-normal flex justify-center">
                                                <div className="relative w-[60px] h-[60px]">
                                                    <Image
                                                        src={url.urlImage}
                                                        alt="Profile"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className={`${field.value === url.urlImage ? "border-2 border-white" : "cursor-pointer"
                                                            }`}
                                                    />
                                                </div>
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex w-full items-center justify-end">
                    <Button disabled={isLoading} type="submit">Create Profile</Button>
                </div>

            </form>
        </Form>
    )
}
