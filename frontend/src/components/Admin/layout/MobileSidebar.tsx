// Icons
import { LuPanelBottom } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { BsFillBasketFill } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { TbBrandBlogger } from "react-icons/tb";
import Link from "next/link";

// Sidebar Links
const SidebarLinks = [
  { id: 1, name: "داشبورد", icon: <HiOutlineHome />, link: "/admin" },
  { id: 2, name: "محصولات", icon: <BiCart />, link: "/admin/products" },
  {
    id: 3,
    name: "دسته بندی ها",
    icon: <RxDashboard />,
    link: "/admin/categories",
  },
  { id: 4, name: " برندها", icon: <TbBrandBlogger />, link: "/admin/brands" },
  { id: 5, name: "کاربران", icon: <FiUsers />, link: "/admin/users" },
  { id: 6, name: "سفارشات", icon: <BsFillBasketFill />, link: "/admin/orders" },
  { id: 7, name: "بنرها", icon: <LuPanelBottom />, link: "/admin/banners" },
];

const MobileSidebar = () => {
  return (
    <section
      id="sidebar"
      className="fixed flex gap-12 px-6 py-5 bottom-0 left-0 right-0 sm:hidden bg-white border-t shadow-md rounded-xl overflow-x-auto no-scrollbar"
    >
      {SidebarLinks.map((item) => (
        <Link href={item.link} key={item.id}>
          <div className="flex flex-col gap-1 items-center text-lg">
            {item.icon}
            <span className="text-[10px] whitespace-nowrap">{item.name}</span>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default MobileSidebar;
