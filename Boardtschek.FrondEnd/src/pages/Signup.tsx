import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { registerUser } from "@/api/auth.ts";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(50, {
      message: "First name cannot exceed 50 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(50, {
      message: "Last name cannot exceed 100 characters.",
    }),
  email: z.string().email({
    message: "Enter a valid email address.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long.",
  }),
  imageUrl: z.string().url({
    message: "Enter a valid image URL.",
  }),
});

export default function CreateAccountPage() {
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
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const successMessage = await registerUser(values);
      alert(successMessage);
      navigate("/login");
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
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-lg text-gray-600 mt-4">Ready to Play?</p>
            </div>

            {/* Form */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full max-w-md"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        autoComplete="given-name"
                      />
                    </FormControl>
                    {form.formState.errors.firstName && (
                      <div
                        id="first-name-error"
                        className="text-red-600 text-sm"
                      >
                        {form.formState.errors.firstName.message}
                      </div>
                    )}
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
                      <Input
                        placeholder="Your last name"
                        {...field}
                        autoComplete="family-name"
                      />
                    </FormControl>
                    {form.formState.errors.lastName && (
                      <div
                        id="last-name-error"
                        className="text-red-600 text-sm"
                      >
                        {form.formState.errors.lastName.message}
                      </div>
                    )}
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
                      <Input
                        placeholder="example@nemetschek.bg"
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                    {form.formState.errors.email && (
                      <div id="email-error" className="text-red-600 text-sm">
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
                        placeholder="******"
                        {...field}
                        autoComplete="new-password"
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
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/profile.jpg"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.imageUrl && (
                      <div
                        id="image-url-error"
                        className="text-red-600 text-sm"
                      >
                        {form.formState.errors.imageUrl.message}
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Get Started
              </Button>
              <div className="mt-1 text-center text-sm text-neutral-700">
                Already have an account?{" "}
                <Link to="/login" className="text-black underline">
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          {/* Right Section: Image */}
          <div className="w-1/2 flex items-center justify-center bg-gray-200"></div>
        </div>
      </Form>
    </>
  );
}
