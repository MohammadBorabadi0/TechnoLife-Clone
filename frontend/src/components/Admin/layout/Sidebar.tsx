import { useSidebarStore } from "@/store/store";

// Icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useSidebarStore((state) => state);

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className={`hidden sm:flex flex-col gap-2 fixed top-0 bg-purple-50 shadow-md border-l border-purple-200 text-sm lg:text-base font-semibold min-h-screen transition-all duration-200 py-4 ${
        showSidebar ? "w-52" : "w-12 sm:w-20 pt-24 items-center"
      }`}
    >
      <h1
        className={`logo text-2xl px-4 mb-2 text-purple-700 ${
          showSidebar ? "mt-4" : "hidden"
        }`}
      >
        Easy Shop
      </h1>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="flex justify-center items-center w-5 h-5 rounded-full bg-purple-600 ring-2 ring-purple-700 text-white absolute -left-3 top-16"
      >
        {showSidebar ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
      <SidebarItems />
    </aside>
  );
};

export default Sidebar;
