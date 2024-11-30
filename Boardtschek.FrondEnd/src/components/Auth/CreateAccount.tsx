import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import {registerUser} from "@/api/auth.ts";

const formSchema = z.object({
    firstName: z.string()
        .min(2, {
            message: "First name must be at least 2 characters.",
        })
        .max(50, {
            message: "First name cannot exceed 50 characters.",
        }),
    lastName: z.string()
        .min(2, {
            message: "Last name must be at least 2 characters.",
        })
        .max(50, {
            message: "Last name cannot exceed 100 characters.",
        }),
    email: z.string()
        .email({
            message: "Enter a valid email address.",
        }),
    password: z.string()
        .min(5, {
            message: "Password must be at least 5 characters long.",
        }),
    imageUrl: z.string()
        .url({
            message: "Enter a valid image URL.",
        }),
})


export function CreateAccount() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            imageUrl: "",

    },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const successMessage = await registerUser(values);
            alert(successMessage);
            window.location.href = "/login";
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
                            <h1 className="text-2xl font-bold">Create Account</h1>
                            <p className="text-base text-gray-600 mt-4">Ready to Play?</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your last name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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
                                            <Input type="password" placeholder="******" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                             <Input placeholder="https://example.com/profile.jpg" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Get Started
                            </Button>
                            <Button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="w-full border border-[#FF6F59] text-[#FF6F59] bg-transparent"
                            >
                                Login
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