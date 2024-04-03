import type { Metadata } from "next";

// global styles
import "@/styles/globals.css";

// components
import Header from "@/components/Header/Header";
import MobileHeader from "@/components/Header/MobileHeader";
import Footer from "@/components/Footer/Footer";

// Swiper Slider Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی آسان شاپ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" type="image/x-icon"></link>
      </head>
      <body suppressHydrationWarning={true}>
        <section className="max-w-screen-3xl mx-auto">
         
            <Header />
            <MobileHeader />
         
          <main className="flex flex-col lg:mt-[128px] text-slate-600 font-normal mx-auto">
            {children}
          </main>
          <Footer />
        </section>
        <Toaster />
      </body>
    </html>
  );
}
