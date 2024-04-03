"use client";

import { useCompareProductStore } from "@/store/store";
import Image from "next/image";
import { FC, MutableRefObject } from "react";

interface IProps {
  compareHeaderRef: MutableRefObject<HTMLDivElement | null>;
}

const CompareHeader: FC<IProps> = ({ compareHeaderRef }) => {
  const { compareProducts } = useCompareProductStore((state) => state);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-white p-5 border-b shadow-md"
      ref={compareHeaderRef}
    >
      <div className="max-w-screen-3xl mx-auto">
        <div className="grid grid-cols-4 gap-3">
          {compareProducts.length > 0 &&
            compareProducts.map((product) => (
              <div
                key={product._id}
                className="flex justify-center items-center gap-1 xl:gap-2 border-2 border-green-600 rounded-md p-3"
              >
                <Image
                  src={product.images[0].file}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-16 xl:w-32 object-cover"
                />
                <h3 className="line-clamp-3 text-xs xl:text-base">{product.name}</h3>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
};

export default CompareHeader;
