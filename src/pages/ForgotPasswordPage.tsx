import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import MinimalHeader from '@/components/layout/MinimalHeader';
import MinimalFooter from '@/components/layout/MinimalFooter';
import BrandingPanel from '@/components/BrandingPanel';
import AuthFormCard from '@/components/AuthFormCard';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail, AlertCircle, CheckCircle2, LogIn } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ForgotPasswordPage: React.FC = () => {
  console.log('ForgotPasswordPage loaded');
  const [formSubmissionMessage, setFormSubmissionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    setIsLoading(true);
    setFormSubmissionMessage(null);
    console.log("Forgot password request for:", values.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Simulate success. In a real app, you'd check if the email exists, etc.
    // For security reasons, it's often better to show a generic success message
    // whether the email exists or not, to prevent email enumeration.
    setFormSubmissionMessage({
      type: 'success',
      text: "If an account with that email exists, we've sent instructions to reset your password."
    });
    form.reset(); // Clear the form on successful submission
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MinimalHeader />
      <main className="flex-1 grid lg:grid-cols-2">
        <BrandingPanel
          welcomeTitle="Password Recovery"
          welcomeMessage="Regain access to your account securely."
          brandImageUrl="https://images.unsplash.com/photo-1559526324-c1f275fbfa32?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="flex flex-col items-center justify-center p-6 sm:p-10">
          <AuthFormCard
            title="Forgot Your Password?"
            description="No problem. Enter your email address below and we'll send you a link to reset your password."
            logo={<LogIn className="h-10 w-10 text-primary" />}
            cardClassName="w-full max-w-md"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {formSubmissionMessage && (
                  <Alert variant={formSubmissionMessage.type === 'error' ? 'destructive' : 'default'} className={formSubmissionMessage.type === 'success' ? 'border-green-500 text-green-700 [&>svg]:text-green-700' : ''}>
                    {formSubmissionMessage.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>{formSubmissionMessage.type === 'success' ? 'Instructions Sent' : 'Error'}</AlertTitle>
                    <AlertDescription>
                      {formSubmissionMessage.text}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center text-sm">
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
                Sign In
              </Link>
            </div>
          </AuthFormCard>
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
};

export default ForgotPasswordPage;