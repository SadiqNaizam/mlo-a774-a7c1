import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LogIn, AlertTriangle } from 'lucide-react';

// Custom Components
import MinimalHeader from '@/components/layout/MinimalHeader';
import BrandingPanel from '@/components/BrandingPanel';
import AuthFormCard from '@/components/AuthFormCard';
import MinimalFooter from '@/components/layout/MinimalFooter';

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Will use FormLabel from Form component
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Basic validation, can be enhanced
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // For potential future redirection

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log('LoginPage form submitted:', data);
    setIsLoading(true);
    setErrorMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Check credentials (replace with actual auth logic)
    if (data.email === "user@example.com" && data.password === "password123") {
      console.log("Login successful!");
      // On successful login, you would typically redirect the user
      // navigate("/dashboard"); // Example redirect, ensure /dashboard route exists in App.tsx if used
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };
  
  console.log('LoginPage loaded');

  return (
    <div className="min-h-screen flex flex-col bg-muted/40 dark:bg-neutral-900">
      <MinimalHeader />
      <main className="flex-1 w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16 items-center max-w-screen-xl mx-auto">
          <BrandingPanel 
            welcomeTitle="Welcome Back!"
            welcomeMessage="Sign in to continue to your personalized experience. Secure and seamless access awaits."
            // logoUrl="/your-logo.svg" // Optional: if you have a specific logo for the branding panel
            brandImageUrl="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // A relevant professional background
          />
          <AuthFormCard
            title="Login to Your Account"
            description="Enter your credentials below to access the platform."
            // logo={<LogIn className="h-10 w-10 text-primary" />} // Logo for the card itself, if MinimalHeader logo isn't prominent enough
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Login Failed</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@example.com" 
                          {...field} 
                          disabled={isLoading}
                        />
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
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          to="/forgot-password" // Path from App.tsx
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          id="rememberMe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="rememberMe" className="font-normal">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                to="/" // Changed: Path to RegistrationPage is now "/"
                className="font-medium text-primary hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </AuthFormCard>
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default LoginPage;