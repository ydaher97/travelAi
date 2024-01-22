"use client"

import { cn } from "@/lib/utils";
import Sidebar from "./(routes)/_components/Sidebar";
import { usePathname } from 'next/navigation'


const DashboardLayout = async ({
    children
}) => {
    const path = usePathname()
    const isItineraryPage = path.startsWith('/itinerary');
    // const mainClassNames = cn(
    //     " ",
    //     !isItineraryPage && "md:pl-72 pt-[60px] md:pt-16" // Conditionally add "md:pl-72" if not on itinerary page
    //   );className={mainClassNames}
   
    return (
        <div className="h-full relative">
        {!isItineraryPage && <div className=" w-full">
                <Sidebar />
            </div>} 
            <main >
           
                {children}
            </main>
        </div>
    );

}

export default DashboardLayout;