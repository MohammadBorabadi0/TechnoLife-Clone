"use client";

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

  // useEffect(() => {
  //   if (!userProfile || !isLoggedIn) {
  //     redirect("/login?backTo=profile");
  //   }
  // }, [userProfile, redirect, isLoggedIn]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="py-5">
      <main className="flex p-5 bg-primary">
        <Sidebar />
        <div className="flex-3 bg-white lg:border lg:p-7 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
