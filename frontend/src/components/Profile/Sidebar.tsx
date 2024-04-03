"use client";

import { useUserStore } from "@/store/store";
import Link from "next/link";
// icons
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { RiHeartLine } from "react-icons/ri";
import { TbUserPentagon } from "react-icons/tb";

const Sidebar = () => {
  const { userProfile, fetchUser, logoutUser } = useUserStore((state) => state);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <div className="flex-1 min-w-[250px] z-10">
      <Link href="/profile" className="flex items-center gap-2 pr-5">
        <TbUserPentagon size={22} />
        <h4 className="font-semibold xl:text-lg">
          {userProfile && userProfile.firstName && userProfile.lastName
            ? `${userProfile.firstName} ${userProfile.lastName}`
            : "مشتری گرامی"}
        </h4>
      </Link>
      <ul className="flex flex-col gap-3 mt-10 transform -translate-x-0.5">
        <li>
          <Link
            href="/profile/my-orders"
            className={`flex items-center gap-2 py-2 px-4 select-none ${
              pathname === "/profile/my-orders"
                ? "border border-l-0 rounded-r-full bg-white"
                : null
            }`}
          >
            <div className="flex items-center justify-center h-6 w-6">
              <BsBoxSeam className="text-xl" />
            </div>
            <p>سفارش های من</p>
          </Link>
        </li>
        <li>
          <Link
            href="/profile/my-favorites"
            className={`flex items-center gap-2 py-2 px-4 select-none ${
              pathname === "/profile/my-favorites"
                ? "border border-l-0 rounded-r-full bg-white"
                : null
            }`}
          >
            <div className="flex items-center justify-center border rounded h-6 w-6">
              <RiHeartLine className="text-red-500 text-lg" />
            </div>
            <p>کالاهای مورد علاقه</p>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 w-full select-none"
          >
            <div className="flex items-center justify-center h-6 w-6 mr-1">
              <BiLogOut className="text-3xl" />
            </div>
            <p>خروج</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

{
  /* <ul className="flex flex-col gap-3 mt-10 transform -translate-x-0.5">
<li className="flex items-center gap-2 cursor-pointer select-none border border-l-0 py-2 px-4 rounded-r-full bg-white">
  <div className="flex items-center justify-center h-6 w-6">
    <BsBoxSeam className="text-xl" />
  </div>
  <p>سفارش های من</p>
</li>
<li className="flex items-center gap-2 cursor-pointer select-none py-2 px-4">
  <div className="flex items-center justify-center border rounded h-6 w-6">
    <RiHeartLine className="text-red-500 text-lg" />
  </div>
  <p>کالاهای مورد علاقه</p>
</li>
<li className="flex items-center gap-2 cursor-pointer select-none py-2 px-4">
  <div className="flex items-center justify-center h-6 w-6 mr-1">
    <BiLogOut className="text-3xl" />
  </div>
  <p>خروج</p>
</li>
</ul> */
}
