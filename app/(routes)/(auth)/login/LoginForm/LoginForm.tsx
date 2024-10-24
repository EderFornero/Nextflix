"use client"

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formSchema } from "./LoginForm.form"
import { useState } from "react"
import FormError from "../../components/FormError/FormError"
import { login } from "@/actions/login"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"




function LoginForm() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | undefined>('')

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            login(values).then((res) => {
                setError(res?.error)
                if (res?.success) {
                    toast({
                        title: "Logged in successfully",
                        duration: 3000,
                    })
                }
            })
            router.push("/profiles")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4 flex flex-col">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} className="h-14 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} className="h-14 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <Button type="submit" className="w-full bg-[#E50914]">Submit</Button>
            </form>
        </Form>
    )
}

export default LoginForm