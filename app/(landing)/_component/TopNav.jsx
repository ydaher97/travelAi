import React from 'react'
import Image from 'next/image'
import  Link  from "next/link";
import { Button } from '@/components/ui/button';
const TopNav = () => {
  return (
    
         <div className='flex items-center justify-between shadow-md'>

            <div className="px-5 py-4 flex items-center justify-between">
                
            <div className='text-2xl font-bold mx-2'>
            NavigateNest
            </div>
            <Image src={"/Globalization-pana.svg"} width={40} height={40} alt="logo"/>
            </div>

            
            <div className="px-5 py-4 flex items-center justify-between">
                <Link  href="/sign-in">
                    <Button className='mx-3'>Login</Button>
                </Link>
                <Link  href="/sign-up" >
                    <Button className='mx-3'>register</Button>
                </Link>
            </div>


            </div>
                
  )
}

export default TopNav