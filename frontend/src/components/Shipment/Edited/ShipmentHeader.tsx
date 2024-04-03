import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ShipmentHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isScrolled ? null : (
        <header className="hidden lg:flex justify-center items-center bg-white fixed left-0 right-0 top-0 h-20 m-5 rounded-lg border-2">
          <Link href="/">
            <Image
              src="/images/logo_techno.svg"
              alt="logo_techno"
              width={200}
              height={200}
            />
          </Link>
        </header>
      )}
    </>
  );
};

export default ShipmentHeader;
