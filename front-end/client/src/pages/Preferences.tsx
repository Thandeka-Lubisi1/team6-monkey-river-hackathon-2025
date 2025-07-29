import { Link } from 'react-router-dom'
"use client"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import ChangeUserName from '@/components/ui/preferenceforms/changeUserN';
import ChangePassword from '@/components/ui/preferenceforms/changePassword';
import ChangeEmail from '@/components/ui/preferenceforms/changeEmail';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch'

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// switch 
const notificationFormSchema = z.object({
  notification: z.boolean()
})

// user details
const formUserDetailsSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

// password
const passwordformSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rpassword: z.string().min(8, {
    message: "Please confirm your password.",
  }),
}).refine((data) => data.password === data.rpassword, {
  message: "Passwords don't match",
  path: ["rpassword"],
})

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Preferences() {
  // get user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form refs
  const userDetailsform = useForm<z.infer<typeof formUserDetailsSchema>>({
    resolver: zodResolver(formUserDetailsSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  const passwordform = useForm<z.infer<typeof passwordformSchema>>({
    resolver: zodResolver(passwordformSchema),
    defaultValues: {
      password: "",
      rpassword: "",
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      notification: true,
    },
  });

  useEffect(() => {
    loadUserData();
  }, []);

  // Update form values when user data loads
  useEffect(() => {
    if (user) {
      userDetailsform.reset({
        firstname: user.firstName || "",
        lastname: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const loadUserData = () => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        setUser(userData);
      } else {
        setError('No user data found. Please log in.');
      }
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  // notification switch 
  function notificationOnSubmit(data: z.infer<typeof notificationFormSchema>) {
    console.log("Notification settings:", data);
  }

  // user details
  function onUserDetailsSubmit(values: z.infer<typeof formUserDetailsSchema>) {
    console.log("User details update:", values);
    // TODO: Submit to backend
  }

  // change password
  function passwordOnSubmit(values: z.infer<typeof passwordformSchema>) {
    console.log("Password change:", values);
    // TODO: Submit to backend
  }

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className='w-full flex-col gap-4 p-6'>
        <h1 className="text-2xl font-bold mb-6">Preferences</h1>
        <LoadingSpinner />
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className='w-full flex-col gap-4 p-6'>
        <h1 className="text-2xl font-bold mb-6">Preferences</h1>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => navigate('/')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col gap-6 p-6'>
      <h1 className="text-2xl font-bold">Preferences</h1>
     
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Change User Details</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...userDetailsform}>
            <form onSubmit={userDetailsform.handleSubmit(onUserDetailsSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={userDetailsform.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={userDetailsform.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={userDetailsform.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Update Details</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordform}>
            <form onSubmit={passwordform.handleSubmit(passwordOnSubmit)} className="space-y-6">
              <FormField
                control={passwordform.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="New password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordform.control}
                name="rpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm new password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Change Password</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Preferences notifications and theme */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage your notification settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...notificationForm}>
            <form onSubmit={notificationForm.handleSubmit(notificationOnSubmit)} className="w-full space-y-6">
              <div className="space-y-4">
                <FormField
                  control={notificationForm.control}
                  name="notification"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Email Notifications</FormLabel>
                        <FormDescription>
                          Receive emails about your account activity.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit">Save Preferences</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}