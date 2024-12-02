import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../components/ui/form.tsx";
import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";
import { setToken } from "@/lib/utils.ts";
import { loginUser } from "@/api/auth.ts";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long.",
  }),
});

export default function LoginFormPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = await loginUser(values);
      setToken(token);
      window.location.href = "/home";
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
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-lg text-gray-600 mt-4">
                Enter Your Credentials to Continue
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full max-w-md"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@nemetschek.bg" {...field} />
                    </FormControl>
                    {form.formState.errors.email && (
                      <div id="email-error" className="text-red-500 text-sm">
                        {form.formState.errors.email.message}
                      </div>
                    )}
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
                      <Input
                        type="password"
                        placeholder="*****"
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    {form.formState.errors.password && (
                      <div id="password-error" className="text-red-600 text-sm">
                        {form.formState.errors.password.message}
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !form.formState.isValid} // Disable button while loading
              >
                {loading ? "Logging in..." : "Start Exploring"}{" "}
                {/* Display loading text */}
              </Button>
              <div className="mt-2 text-center text-sm text-neutral-700">
                Don't have an account?{" "}
                <Link to="/create-account" className="underline text-black">
                  Sign up
                </Link>
              </div>
            </form>
          </div>

          {/* Right Section: Image */}
          <div className="w-1/2 flex items-center justify-center bg-[#E3E3E3]"></div>
        </div>
      </Form>
    </>
  );
}
