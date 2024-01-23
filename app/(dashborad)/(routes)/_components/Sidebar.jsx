"use client";
import {UserButton} from '@clerk/nextjs'

import  Link  from "next/link";
import {usePathname} from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus  } from "lucide-react"
import Image from 'next/image'


import {cn} from "@/lib/utils"
// import { Code, Compass, HelpCircleIcon, History,  LayoutDashboard,  Settings, TestTube } from "lucide-react";

const Sidebar = () => {
   
    return (
        <div className='flex items-center justify-between shadow-md'>

            <div className="px-5 py-4 flex items-center justify-between">
                
            <div className='text-2xl font-bold mx-2'>
            NavigateNest
            </div>
            <Image src={"/Globalization-pana.svg"} width={40} height={40} alt="logo"/>
            </div>
           
             
            <div className="px-5 py-4 flex items-center justify-between">
            <Link href='/itinerary'><Button className="rounded-full mx-5"><Plus/> Add Trip</Button></Link>
            <UserButton
            afterSignOutUrl="/"
            />
            </div>
            

        </div>
    )
}
export default Sidebar;