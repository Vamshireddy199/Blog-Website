"use client"
import { SessionProvider } from "next-auth/react";
import UserInfo from "../loginPage/UserInfo";

export default function Dashboard() {
  return (
    <div>
        <SessionProvider>
      <UserInfo />
      </SessionProvider>
    </div>
  );
}
