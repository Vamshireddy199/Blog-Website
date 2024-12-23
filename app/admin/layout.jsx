"use client";
import { assets } from "@/Assets/assets";
import Link from "next/link";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserInfo from "../loginPage/UserInfo";

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark"/>
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                        <h3 className="font-medium">Admin Panel</h3>
                        <Link href='/dashboard'>
                        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-4 border border-solid border-black shadow-[-5px_5px_0px_#000000]">Logout</button>
                        </Link>
                    </div>
                    
                    {children}
                    
                </div>
            </div>

        </>
    )
}