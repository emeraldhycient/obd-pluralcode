import sidebarData from '../../constants/sidebar'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link'
import React from 'react'
import { FiSettings } from "react-icons/fi"
import { BiLogOutCircle } from "react-icons/bi"

function Sidebar() {
    const router = useRouter()

    return (
        <div className='h-screen bg-[#020062] w-full flex flex-col justify-between'>
            <div className="">
                <div className="h-[100px]">
                    <Image src={"./assets/logo.svg"} className='h-[100px] w-[170px]' height={"0"} width={"0"} alt="obd manage logo" />
                </div>
                <div className="px-5">
                    {
                        sidebarData.map((item, index) => (
                            <div key={index} className={` ${router.pathname === item.path ? 'bg-[#1410B4] p-2 rounded' : ''  } my-4`}>
                                <Link href={item.path} className="flex items-center gap-2">
                                    <Image src={item.iconPath} className='h-[20px] w-[20px]' height={"0"} width={"0"}
                                        alt="obd manage logo" />
                                    <p className='text-white text-[15px] font-semibold'>{item.title}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="px-5">
                <div className="flex items-center gap-2 py-3">
                    <FiSettings size={20} color={"white"} />
                    <Link href={"/settings"}>
                        <p className='text-white text-[15px] font-semibold'>Settings</p>
                    </Link>
                </div>
                <div className="flex items-center gap-2 border-t-2 border-[#4742FF] py-3">
                    <Image src={'./assets/sidebar/profile.svg'} className='h-[30px] w-[30px]' height={"0"} width={"0"} alt="user profile logo" />
                    <div className="">
                        <p className='text-white text-[15px] font-semibold'>Adebayo Ui</p>
                        <p className='text-white text-[10px] font-normal'>adebayoui@obd.com</p>
                    </div>
                    <BiLogOutCircle size={20} color={"white"} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar