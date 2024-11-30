import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import apiClient from "@/api/axios.ts";
import {setToken} from "@/lib/utils.ts";


const formSchema = z.object({
    email: z.string()
    .email({
        message: "Enter a valid email address.",
    }),
    password: z.string()
        .min(5, {
            message: "Password must be at least 5 characters long.",
        })
})

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await apiClient.post('/login', values);
            setToken(response.data.token); // Store token
            window.location.href = '/dashboard'; // Redirect to dashboard
        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed.");
        }
    }

    return (
        <>
            <Form {...form}>
                <div className="flex h-screen">
                    {/* Left Section: Headings and Form */}
                    <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
                        {/* Headings */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold">Welcome Back</h1>
                            <p className="text-base text-gray-600 mt-4">Enter Your Credentials to Continue</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@nemetschek.bg" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="*****" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Start Exploring
                            </Button>
                        </form>
                    </div>

                    {/* Right Section: Image */}
                    <div className="w-1/2 flex items-center justify-center bg-gray-200">
                        <img
                            src="../../assets/images/register-pic-preview.png"
                            alt="Example"
                            className="max-w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </Form>

        </>
    )
}