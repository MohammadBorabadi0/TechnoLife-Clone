// "use client";

// import { FC, useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useUserStore } from "@/store/store";
// import CartDropdown from "../Dropdowns/CartDropdown";
// import Navbar from "./Navbar";
// import { BiCart, BiSearch } from "react-icons/bi";
// import Link from "next/link";
// import { FiChevronLeft, FiHeart, FiUser } from "react-icons/fi";
// import { TbLogout2 } from "react-icons/tb";
// import { BsBoxSeam } from "react-icons/bs";

// const Header = () => {
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);

//   const { fetchUser, userProfile, logoutUser } = useUserStore((state) => state);

//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
//       setVisible(prevScrollPos > currentScrollPos);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollPos]);

//   const handleLogout = () => {
//     logoutUser();
//     router.push("/login");
//   };

//   // if (pathname === "/compare") {
//   //   return (
//   //     <header className="flex-col gap-5 bg-white text-slate-600 text-sm">
//   //       <section
//   //         className={`flex justify-between items-center fixed max-w-screen-3xl px-4 h-[87px] top-0 w-full z-30 bg-white ${
//   //           !visible && "border-b"
//   //         }`}
//   //       ></section>
//   //     </header>
//   //   );
//   // }

//   return (
//     <div>
//       <header
//         className={`hidden ${
//           pathname === "/shipment" || pathname === "/payment"
//             ? "hidden"
//             : "lg:flex"
//         } flex-col gap-5 bg-white text-slate-600 text-sm`}
//       >
//         <section
//           className={`flex justify-between items-center fixed max-w-screen-3xl px-4 h-[87px] top-0 w-full z-30 bg-white ${
//             !visible && "border-b"
//           }`}
//         >
//           <Navbar visible={visible} />
//         </section>
//       </header>
//     </div>
//   );
// };

// export default Header;

// -----------------------------------------------

"use client";

import React, { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";
import CartDropdown from "../Dropdowns/CartDropdown";
import Navbar from "./Navbar";
import { BiCart, BiSearch } from "react-icons/bi";
import Link from "next/link";
import { FiChevronLeft, FiHeart, FiUser } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { fetchUser, userProfile, logoutUser } = useUserStore((state) => state);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <header
      className={`hidden ${
        pathname === "/shipment" || pathname === "/payment"
          ? "hidden"
          : "lg:flex"
      } flex-col gap-5 bg-white text-slate-600 text-sm`}
    >
      <section
        className={`flex justify-between items-center fixed max-w-screen-3xl px-4 h-[87px] top-0 w-full z-30 bg-white ${
          !visible && "border-b"
        }`}
      >
        <section className="flex items-center flex-1 gap-8">
          {/* Logo  */}
          <h2 className="logo text-2xl whitespace-nowrap">
            <span className="text-yellow-600">Easy</span> Shop
          </h2>

          {/* Search Bar  */}
          <section className="bg-gray-200 flex items-center gap-5 w-[500px] rounded-lg px-4 py-2">
            <BiSearch size={20} />
            <input
              type="text"
              placeholder="جستجو"
              className="bg-transparent w-full py-1 outline-none"
            />
          </section>
        </section>
        <section className="flex items-center gap-5">
          {/* Login and Register Buttons  */}
          {userProfile ? (
            <section className="relative group">
              <button
                className="cursor-pointer rounded-lg border px-2 py-2"
                onClick={() => router.push("/profile")}
              >
                <FiUser size={20} />
              </button>
              {/* <div className="hidden group-hover:flex flex-col gap-2 absolute top-9 whitespace-nowrap -left-2 rounded-xl py-6 w-80 bg-white border shadow-md"> */}
              <section className="invisible opacity-0 z-50 group-hover:opacity-100 group-hover:visible top-10 left-0 flex flex-col gap-2 absolute whitespace-nowrap rounded-xl py-6 w-80 bg-white border shadow-md transition-visible duration-200">
                <section
                  onClick={() => router.push("/profile")}
                  className="flex justify-between items-center hover:bg-gray-100 transition-all duration-200 cursor-pointer p-4 my-2"
                >
                  <span>حساب کاربری</span>
                  <span>
                    <FiChevronLeft size={20} />
                  </span>
                </section>
                <hr />
                <section className="group/item flex justify-between items-center hover:bg-gray-100 transition-all duration-200 cursor-pointer p-4 mt-2">
                  <section className="flex items-center gap-2">
                    <span className="group-hover/item:text-red-600 border p-1 rounded-md">
                      <FiHeart size={18} />
                    </span>
                    <span>لیست علاقه مندی</span>
                  </section>
                  <span>
                    <FiChevronLeft size={18} />
                  </span>
                </section>
                <section className="group/item flex justify-between items-center hover:bg-gray-100 transition-all duration-200 cursor-pointer p-4">
                  <section className="flex items-center gap-2">
                    <span className="group-hover/item:text-yellow-600 border p-1 rounded-md">
                      <BsBoxSeam size={20} />
                    </span>
                    <span>سفارش های من</span>
                  </section>
                  <span>
                    <FiChevronLeft size={20} />
                  </span>
                </section>
                <section
                  className="group/item flex justify-between items-center hover:bg-gray-100 transition-all duration-200 cursor-pointer p-4"
                  onClick={handleLogout}
                >
                  <section className="flex items-center gap-2">
                    <span className="group-hover/item:text-red-600 border p-1 rounded-md">
                      <TbLogout2 size={20} />
                    </span>
                    <span>خروج از حساب کاربری</span>
                  </section>
                  <span>
                    <FiChevronLeft size={20} />
                  </span>
                </section>
              </section>
            </section>
          ) : (
            <section className="flex gap-4 border border-yellow-600 rounded-lg py-2 px-4">
              <Link href="/login" className="border-l border-slate-600 pl-4">
                ورود
              </Link>
              <Link href="/register">ثبت نام</Link>
            </section>
          )}

          {/* Cart Button  */}

          <section
            className="relative group"
            onClick={() => router.push("/cart")}
          >
            <section className="cursor-pointer rounded-lg border px-2 py-2 w-fit">
              <BiCart size={20} />
            </section>
            <CartDropdown />
          </section>
        </section>
      </section>
      <Navbar visible={visible} />
    </header>
  );
};

export default Header;
