"use client";
import { BiMenu, BiSearch, BiCart } from "react-icons/bi";
import { TbLogin } from "react-icons/tb";
import MobileNav from "../Home/MobileMenu";
import { usePathname } from "next/navigation";

const MobileHeader = () => {
  const pathname = usePathname();

  return (
    <header
      className={`flex lg:hidden ${
        pathname === "/shipment" || pathname === "/payment" ? "hidden" : "flex"
      } flex-col gap-5 bg-white text-xs text-slate-700 p-3 border-b`}
    >
      <div className="flex items-center justify-between">
        <MobileNav />

        {/* Logo  */}
        <h2 className="logo text-2xl whitespace-nowrap">
          <span className="text-yellow-600">Easy</span> Shop
        </h2>

        <button className="flex items-center gap-1">
          ورود
          <TbLogin size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 bg-gray-200 text-gray-500 rounded-sm px-1 py-1.5 flex-1">
          <button>
            <BiSearch size={25} />
          </button>
          <input
            type="text"
            className="bg-transparent text-sm flex-1 border-none outline-none"
            placeholder="جستجو ..."
          />
        </div>
        <button>
          <BiCart size={23} />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
