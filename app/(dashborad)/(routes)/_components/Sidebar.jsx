"use client";
import {UserButton} from '@clerk/nextjs'

import  Link  from "next/link";
import {usePathname} from "next/navigation"


import {cn} from "@/lib/utils"
import { Code, Compass, HelpCircleIcon, History,  LayoutDashboard,  Settings, TestTube } from "lucide-react";

const Sidebar = () => {
   
    return (
        <div >
            <div className="px-5 py-4">
            <UserButton
            afterSignOutUrl="/"
            />
            </div>
        </div>
    )
}
export default Sidebar;