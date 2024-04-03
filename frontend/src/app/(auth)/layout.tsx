"use client";

import { useUserStore } from "@/store/store";
import "@/styles/globals.css";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfile, fetchUser, isLoggedIn } = useUserStore(
    (state) => state
  );

  const searchParams = useSearchParams();

  const backTo = searchParams.get("backTo");

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (backTo) {
        redirect(backTo);
      } else {
        redirect("/");
      }
    }
  }, [userProfile, redirect, backTo]);

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" type="image/x-icon"></link>
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
