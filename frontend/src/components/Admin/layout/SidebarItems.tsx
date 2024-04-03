import { useEffect } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBlogger } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { BsFillBasketFill } from "react-icons/bs";
import { LuPanelBottom } from "react-icons/lu";
import Link from "next/link";
import { useSidebarStore } from "@/store/store";
import { usePathname } from "next/navigation";
import { MdOutlineColorLens } from "react-icons/md";

export const SidebarLinks = [
  { id: 1, name: "داشبورد", icon: <HiOutlineHome />, link: "/home" },
  { id: 2, name: "محصولات", icon: <BiCart />, link: "/products" },
  {
    id: 3,
    name: "دسته بندی ها",
    icon: <RxDashboard />,
    link: "/categories",
  },
  { id: 4, name: "برندها", icon: <TbBrandBlogger />, link: "/brands" },
  { id: 5, name: "کاربران", icon: <FiUsers />, link: "/users" },
  { id: 6, name: "سفارشات", icon: <BsFillBasketFill />, link: "/orders" },
  { id: 7, name: "بنرها", icon: <LuPanelBottom />, link: "/banners" },
  {
    id: 8,
    name: "رنگ ها",
    icon: <MdOutlineColorLens />,
    link: "/colors",
  },
];

const SidebarItems = () => {
  const { showSidebar } = useSidebarStore((state) => state);

  const pathname = usePathname();

  return (
    <ul className="w-full px-1">
      {SidebarLinks.map((item) => {
        return (
          <li key={item.id}>
            <Link
              href={`${
                item.link === "/home" ? "/admin" : `/admin/${item.link}`
              }`}
              className={`flex items-center pr-4 gap-3 hover:border-r-4 border-purple-700 transition-all duration-75
              ${!showSidebar && "justify-center px-4"}
                ${pathname.includes(item.link) && "border-r-4"} py-3`}
            >
              <span className="text-sm lg:text-xl">{item.icon}</span>
              <span
                className={`${
                  showSidebar ? "block" : "hidden"
                } whitespace-nowrap`}
              >
                {item.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarItems;

// import { HiOutlineHome } from "react-icons/hi";
// import { BiCart } from "react-icons/bi";
// import { RxDashboard } from "react-icons/rx";
// import { TbBrandBlogger } from "react-icons/tb";
// import { FiUsers } from "react-icons/fi";
// import { BsFillBasketFill } from "react-icons/bs";
// import { LuPanelBottom } from "react-icons/lu";
// import Link from "next/link";
// import { useSidebarStore } from "@/store/store";
// import { FC } from "react";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

// export const SidebarLinks = [
//   { id: 1, name: "داشبورد", icon: <HiOutlineHome />, link: "/admin" },
//   { id: 2, name: "محصولات", icon: <BiCart />, link: "/admin/products" },
//   {
//     id: 3,
//     name: "دسته بندی ها",
//     icon: <RxDashboard />,
//     link: "/admin/categories",
//   },
//   { id: 4, name: "برندها", icon: <TbBrandBlogger />, link: "/admin/brands" },
//   { id: 5, name: "کاربران", icon: <FiUsers />, link: "/admin/users" },
//   { id: 6, name: "سفارشات", icon: <BsFillBasketFill />, link: "/admin/orders" },
//   { id: 7, name: "بنرها", icon: <LuPanelBottom />, link: "/admin/banners" },
// ];

// const SidebarItems = () => {
//   const { showSidebar } = useSidebarStore((state) => state);

//   const router = useRouter();

//   return (
//     <ul>
//       {SidebarLinks.map((item) => {
//         const isActive = router.pathname.startsWith(item.link);

//         console.log({ isActive });

//         return (
//           <Link
//             key={item.id}
//             href={item.link}
//             className={`flex items-center gap-3 ${
//               isActive ? "text-red-700" : ""
//             } hover:border-r-4 border-purple-700 transition-all duration-75 ${
//               showSidebar ? "px-4" : "px-2"
//             } py-2`}
//           >
//             <span className="text-sm lg:text-xl">{item.icon}</span>
//             <span
//               className={`${
//                 showSidebar ? "block" : "hidden"
//               } whitespace-nowrap`}
//             >
//               {item.name}
//             </span>
//           </Link>
//         );
//       })}
//     </ul>
//   );
// };

// export default SidebarItems;
