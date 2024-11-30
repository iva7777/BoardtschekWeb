import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import {setToken} from "@/lib/utils.ts";
import {loginUser} from "@/api/auth.ts";



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
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const token = await loginUser(values);
            setToken(token);
            window.location.href = "/homepage";
        } catch (error: unknown) {
            alert(error);
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
                            <Button
                                type="button"
                                onClick={() => navigate("/create-account")}
                                className="w-full border border-[#457B9D] text-[#457B9D] bg-transparent"
                            >
                                Register
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