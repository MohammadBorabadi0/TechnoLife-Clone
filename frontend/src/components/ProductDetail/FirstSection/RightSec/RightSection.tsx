import { FC, RefObject, useEffect, useState } from "react";
import Image from "next/image";

// Utils
import { En_To_Fa } from "@/utils/functions";
import tw from "tailwind-styled-components";

import ProductIconButtons from "../../ProductIconButtons";
import Color from "../../Color";
import { ProductData } from "@/utils/type";
import { useColorStore, useStore } from "@/store/store";

interface IProps {
  product: ProductData;
  commentsRef: RefObject<HTMLElement>;
  scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
}

const RightSection: FC<IProps> = ({
  product,
  commentsRef,
  scrollToSection,
}) => {
  const { activeIndex, setActiveIndex } = useStore((state) => state);

  const { colors, fetchColors } = useColorStore((state) => state);

  const filteredColors = product.images.map((item) =>
    colors.find((color) => color._id === item.color)
  );

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="flex flex-3 xl:border rounded-lg px-5 py-9 h-fit">
      <div className="flex-1">
        {/* Product Name  */}
        <h4 className="font-semibold text-base text-black line-clamp-3 xl:line-clamp-2 leading-8">
          {product.name}
        </h4>

        {/* Number Of Product Comments  */}
        <div
          className="flex gap-5 font-semibold my-4 border-b w-fit pb-4 cursor-pointer"
          onClick={() => scrollToSection(commentsRef)}
        >
          <span>نظرات کاربران</span>
          <span className="text-yellow-600">
            {En_To_Fa(`${product.reviews?.length}`)} نظر
          </span>
        </div>

        {/* Product Colors  */}
        <div className="flex flex-col gap-5 border-b w-fit pb-4">
          {filteredColors && (
            <div className="flex gap-3">
              <Color colors={filteredColors} />
            </div>
          )}
        </div>

        {/* Main product specifications */}
        <div className="flex flex-col gap-3 mt-6">
          <h3 className="font-semibold">ویژگی های اصلی</h3>
          <div className="border border-yellow-600 rounded px-4">
            <SpecificationItem>
              <p>نوع پردازنده - CPU: </p>
              <SpecificationItemText>
                Mediatek MT6877V Dimensity 7050 (6 nm)
              </SpecificationItemText>
            </SpecificationItem>
            <SpecificationItem>
              <p>حافظه داخلی:</p>
              <SpecificationItemText>
                {En_To_Fa(`512 گیگابایت`)}
              </SpecificationItemText>
            </SpecificationItem>
            <SpecificationItem>
              <p>حافظه RAM:</p>
              <SpecificationItemText>
                {En_To_Fa(`12 گیگابایت`)}
              </SpecificationItemText>
            </SpecificationItem>
            <SpecificationItem>
              <p>سایز صفحه نمایش:</p>
              <SpecificationItemText>
                {En_To_Fa(`6.7 اینچ`)}
              </SpecificationItemText>
            </SpecificationItem>
            <SpecificationItem>
              <p>دوربین پشت:</p>
              <SpecificationItemText>
                {En_To_Fa(`200 مگاپیکسل + 8 مگاپیکسل + 2 مگاپیکسل`)}
              </SpecificationItemText>
            </SpecificationItem>
            <SpecificationItem>
              <p>ظرفیت باتری:</p>
              <SpecificationItemText>
                {En_To_Fa(`5000 میلی آمپر ساعت`)}
              </SpecificationItemText>
            </SpecificationItem>
          </div>
        </div>
      </div>
      <div className="flex-1">
        {/* Product Butttons  */}
        <ProductIconButtons
          commentsRef={commentsRef}
          scrollToSection={scrollToSection}
          product={product}
        />

        {/* -------------------------------------------------------------------------------- */}

        {/* Product Image  */}

        {product && product.images && (
          <section className="flex justify-center mt-12">
            <Image
              width={500}
              height={500}
              loading="eager"
              src={product.images[activeIndex]?.file}
              alt={product.name}
              title={product.name}
              className="object-contain w-2/3 transition-all duration-200"
            />
          </section>
        )}

        {/* -------------------------------------------------------------------------------- */}

        {/* Product Images  */}

        <section className="flex justify-center mt-[20%] flex-wrap lg:mr-0 gap-3">
          {product &&
            product.images &&
            product.images.map((item, index) => (
              <div
                key={item._id}
                className={`grid place-items-center overflow-hidden border w-16 h-16 rounded-md p-0.5 ${
                  index === activeIndex
                    ? "border-yellow-700 opacity-100 transition-all duration-150"
                    : "opacity-90"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  width={300}
                  height={300}
                  loading="eager"
                  src={item.file}
                  alt={product.name}
                  title={product.name}
                  className="object-contain"
                />
              </div>
            ))}
        </section>

        {/* -------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

const SpecificationItem = tw.div`
    flex gap-2 border-b border-dashed p-5
`;

const SpecificationItemText = tw.p`
    font-semibold
`;

export default RightSection;
