import { Link } from 'react-router-dom'
// import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// import ChangePassword from '@/components/ui/preferenceforms/changeUserN';
import ChangeUserName from '@/components/ui/preferenceforms/changeUserN';
import ChangePassword from '@/components/ui/preferenceforms/changePassword';
import ChangeEmail from '@/components/ui/preferenceforms/changeEmail';


const Preferences = () => {
  return (
    <div>
      <h1>Preference Page</h1>
      <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>User Name</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
           Change user name
          </p>
          <div>
            <ChangeUserName/>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>change email</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Change email
          </p>
          <div>
            <ChangeEmail/>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Change Password</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Change Password
          </p>
          <div>
            <ChangePassword/>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default Preferences;