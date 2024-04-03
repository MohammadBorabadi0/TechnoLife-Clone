"use client";

import Header from "@/components/Header/Header";
import MobileHeader from "@/components/Header/MobileHeader";
import Sidebar from "@/components/Profile/Sidebar";
import { useUserStore } from "@/store/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchUser, isLoggedIn, userProfile } = useUserStore((state) => state);

  useEffect(() => {
    if (!userProfile || !isLoggedIn) {
      redirect("/login?backTo=profile");
    }
  }, [userProfile, redirect, isLoggedIn]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="py-5">
      <Header />
      <MobileHeader />
      <main className="flex p-5 bg-primary">
        <Sidebar />
        <div className="flex-3 bg-white border p-7 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
