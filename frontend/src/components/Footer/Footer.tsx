"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// utils
import { parse } from "persian_util";

// icons
import { BiChevronUp } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();

  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`flex flex-col md:flex-row-reverse items-center justify-around text-white bg-slate-800 rounded-xl mx-1 p-1 mt-8 mb-32 lg:mb-4 overflow-hidden ${
        (pathname === "/cart" ||
          pathname === "/shipment" ||
          pathname === "/payment") &&
        "hidden"
      }`}
    >
      {/* Scroll To Top Button  */}
      <section className=" rounded-lg w-full md:w-fit p-2 bg-slate-800 mx-3">
        <button
          className="flex justify-center items-center w-full gap-2 bg-white text-black p-2 rounded"
          onClick={scrollToTop}
        >
          <span>بازگشت به بالا</span>
          <BiChevronUp size={18} />
        </button>
      </section>

      {/* Footer Links And Logo Website */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-around gap-8 text-white bg-slate-800 rounded-xl py-6 mb-4 mx-3">
        <section className="flex flex-col items-center gap-3">
          <div className="bg-white px-2 py-1.5 rounded-sm">
            <h2 className="logo text-2xl whitespace-nowrap text-slate-700">
              <span className="text-yellow-600">Easy</span> Shop
            </h2>
          </div>
          &copy;
          {parse.En_To_Fa(`${getCurrentYear}`)}-
          {parse.En_To_Fa(`${+getCurrentYear - 621}`)}
        </section>
        <section className="flex flex-col gap-3 bg-white text-black rounded-sm p-4">
          <h2>شبکه های اجتماعی</h2>
          <div className="flex justify-center gap-3 text-xl">
            <Link href="https://github.com/MohammadBorabadi0" target="_blank">
              <BsGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mohammad-borabadi"
              target="_blank"
              className="text-blue-600"
            >
              <ImLinkedin />
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
