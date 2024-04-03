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
      className="fixed inset-x-0 top-0 z-40 bg-white py-4 border-b shadow-md"
      ref={compareHeaderRef}
    >
      <div className="overflow-x-auto no-scrollbar">
        <div className="grid grid-cols-4 gap-5 mx-5 min-w-[1000px]">
          {compareProducts.length > 0 &&
            compareProducts.map((product) => (
              <div
                key={product._id}
                className="flex justify-center items-center gap-3 border-2 border-green-600 rounded-xl px-3 py-2 min-w-[235px]"
              >
                <Image
                  src={product.images[0].file}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-20 object-cover"
                />
                <h3 className="line-clamp-3">{product.name}</h3>
              </div>
            ))}
        </div>
      </div>
    </header>
  );
};

export default CompareHeader;
