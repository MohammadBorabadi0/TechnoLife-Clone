"use client";

// Styles
import "@/styles/globals.css";

// Provider
import { useSidebarStore, useUserStore } from "@/store/store";
import { ThemeProvider, createTheme } from "@mui/material";

// components
import MobileSidebar from "@/components/Admin/layout/MobileSidebar";
import Nav from "@/components/Admin/layout/Nav";
import Sidebar from "@/components/Admin/layout/Sidebar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { redirect } from "next/navigation";

// Mui Provider
const THEME = createTheme({
  typography: {
    fontFamily: `"Vazirmatn", "Helvetica", "Arial", sans-serif`,
    fontSize: 13,
  },
  direction: "rtl",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showSidebar } = useSidebarStore((state) => state);
  const { userProfile, fetchUser, isLoggedIn, isAdmin } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    if (userProfile && !isAdmin) {
      redirect("/");
    }
  }, [userProfile, redirect, isAdmin]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>آسان شاپ | ادمین پنل</title>
        <link rel="icon" href="/logo.png" type="image/x-icon"></link>
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider theme={THEME}>
          <div className="flex overflow-x-hidden text-sm sm:text-base max-w-screen-3xl mx-auto">
            <MobileSidebar />
            <Sidebar />
            <div
              className={`flex flex-col w-full transition-all duration-200 ${
                showSidebar ? "sm:pr-52" : "sm:pr-20"
              }`}
            >
              <Nav />
              <main className="mt-4 mb-20 mx-2 sm:mx-4 sm:my-6 min-h-screen">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
