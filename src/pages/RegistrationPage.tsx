import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import MinimalHeader from '@/components/layout/MinimalHeader';
import BrandingPanel from '@/components/BrandingPanel';
import AuthFormCard from '@/components/AuthFormCard';
import MinimalFooter from '@/components/layout/MinimalFooter';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Icons
import { AlertCircle, LogIn } from 'lucide-react';

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // path to field that gets the error
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmissionError(null);
    setSubmissionSuccess(null);
    console.log('Registration form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example: Simulate success or error
    if (data.email === "exists@example.com") {
      setSubmissionError("An account with this email already exists.");
      form.setError("email", { type: "manual", message: "An account with this email already exists." });
    } else {
      setSubmissionSuccess("Registration successful! Please log in.");
      // In a real app, you might redirect or clear form here
      // For now, just show success message. User journey says "Linked from the LoginPage", implying return to login.
      setTimeout(() => {
        navigate('/'); // Navigate to LoginPage after a short delay
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <MinimalHeader />
      <main className="flex-1 grid lg:grid-cols-2">
        <BrandingPanel
          welcomeTitle="Join Our Community"
          welcomeMessage="Create your account to unlock exclusive features and services."
          brandImageUrl="https://images.unsplash.com/photo-1506784983877-45594efa4c88?q=80&w=1920&auto=format&fit=crop" // A different, welcoming image
        />
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <AuthFormCard
            title="Create an Account"
            description="Fill in your details below to get started."
            logo={<LogIn className="h-10 w-10 text-primary" />}
            cardClassName="w-full max-w-lg"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {submissionError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Registration Failed</AlertTitle>
                    <AlertDescription>{submissionError}</AlertDescription>
                  </Alert>
                )}
                {submissionSuccess && (
                  <Alert variant="default" className="bg-green-100 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300">
                     <AlertCircle className="h-4 w-4" /> {/* Using AlertCircle, could be CheckCircle */}
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{submissionSuccess}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="fullName">Full Name</FormLabel>
                      <FormControl>
                        <Input id="fullName" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="name@example.com" {...field} />
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
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <Input id="confirmPassword" type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
                Log in
              </Link>
            </div>
          </AuthFormCard>
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default RegistrationPage;