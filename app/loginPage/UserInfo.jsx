"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

 
  if (!session) {
    return (
      <div className="grid place-items-center h-screen">
        <p>You are not logged in.</p>
      </div>
    );
  }

 
  return (
    <div className="flex flex-col bg-slate-100">
            <div className="px-2 sm:pl-14 py-3 border border-black">
                <Link href='/'>
                <Image src={assets.logo} width={120} alt=""/>
                </Link>
            </div>
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session.user.name || "N/A"}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session.user.email || "N/A"}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
    </div>
  );
}
