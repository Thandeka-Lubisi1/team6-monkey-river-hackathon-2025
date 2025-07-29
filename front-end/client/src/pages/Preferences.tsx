import { Link } from 'react-router-dom'
"use client"
// import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// import ChangePassword from '@/components/ui/preferenceforms/changeUserN';
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

// switch 
const notificationFormSchema = z.object({
  notification: z.boolean()

})

// user details

  const formUserDetailsSchema = z.object({
    firstname: z.string().min(2, {
    message: "first name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "last name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
})

// password

const passwordformSchema = z.object({
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  rpassword: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
})

export default function Preferences ()  {

  //notification switch 
  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      notification: true,
    },
  })
    function notificationOnSubmit(data: z.infer<typeof notificationFormSchema>) {
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  // user details

    function onUserDetailsSubmit(values: z.infer<typeof formUserDetailsSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
    const userDetailsform = useForm<z.infer<typeof formUserDetailsSchema>>({
        resolver: zodResolver(formUserDetailsSchema),
        defaultValues: {
            // TODO : fill it with the information from the database
            firstname: "",
            lastname: "",
            email: "",
        },
      })


      // change password

      function passwordOnSubmit(values: z.infer<typeof passwordformSchema>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          // TODO : submit to the database
          console.log(values)
        }
        const passwordform = useForm<z.infer<typeof passwordformSchema>>({
          resolver: zodResolver(passwordformSchema),
          defaultValues: {
            password: "",
            rpassword: "",
          },
        })

  return (
    <div className='  w-full flex-col gap-4'>
      <h1>Preference Page</h1>
     
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Change User Details</CardTitle>
      </CardHeader>
      <CardContent>
         <Form {...userDetailsform}>
      <form onSubmit={userDetailsform.handleSubmit(onUserDetailsSubmit)} className="space-y-8">
        <FormField
          control={userDetailsform.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="firstname" {...field} />
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="lastname" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={userDetailsform.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Details</Button>
       
      </form>
    </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
      </CardFooter>
    </Card>




<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Change your password</CardTitle>
       
      </CardHeader>
      <CardContent>
         <Form {...passwordform}>
      <form onSubmit={passwordform.handleSubmit(passwordOnSubmit)} className="space-y-8">
        <FormField
          control={passwordform.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
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
              <FormLabel>re-type password</FormLabel>
              <FormControl>
                <Input placeholder="retype password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
            <Button type="submit">Change password</Button>
       
      </form>
    </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CardAction>
        </CardAction>
         
      </CardFooter>
    </Card>


// preferences notifications and theme
<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Change your preferences</CardTitle>
       
      </CardHeader>
      <CardContent>
         
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Form {...notificationForm}>
      <form onSubmit={notificationForm.handleSubmit(notificationOnSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            
            <FormField
              control={notificationForm.control}
              name="notification"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>notifications emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
         
      </CardFooter>
    </Card>
    </div>
  )
}

