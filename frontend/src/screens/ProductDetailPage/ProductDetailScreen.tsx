import ProductList from "@/components/Home/ProductList/ProductList";
import PageHero from "@/components/PageHero";
import Color from "@/components/ProductDetail/Color";
import ProductIconButtons from "@/components/ProductDetail/ProductIconButtons";
import SecondSection from "@/components/ProductDetail/SecondSection/SecondSection";
import SendTodayBorder from "@/components/ProductDetail/SendTodayBorder";
import ProductSpecifications from "@/components/ProductDetail/ThirdSection/ProductSpecifications";
import ThirdSection from "@/components/ProductDetail/ThirdSection/main/ThirdSection";
import { products } from "@/data/data";
import { useColorStore, useProductStore, useStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { ProductData } from "@/utils/type";
import Image from "next/image";
import { FC, RefObject, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { LuImage } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import tw from "tailwind-styled-components";

interface IProps {
  commentsRef: RefObject<HTMLElement>;
  scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
  product: ProductData;
}

const ProductDetailScreen: FC<IProps> = ({
  commentsRef,
  scrollToSection,
  product,
}) => {
  const { colors, fetchColors } = useColorStore((state) => state);
  const { activeIndex, setActiveIndex } = useStore((state) => state);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  const filteredColors = product.images.map((item) =>
    colors.find((color) => color._id === item.color)
  );

  return (
    <>
      {/* Product Detail Mobile Screen  */}
      <section className="flex lg:hidden flex-col gap-8 py-5 px-3 text-sm">
        {/* Page Hero  */}
        <div className="overflow-hidden">
          <PageHero />
        </div>

        {/* Product Icon Buttons  */}
        <ProductIconButtons
          commentsRef={commentsRef}
          scrollToSection={scrollToSection}
        />

        <div id="product-detail">
          {/* Product Images  */}
          <div className="relative">
            <Swiper
              navigation={true}
              modules={[Pagination, Navigation]}
              onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            >
              {product.images.map((image) => (
                <SwiperSlide key={image._id}>
                  <Image
                    src={image.file}
                    alt={product.name}
                    width={400}
                    height={400}
                    title={product.name}
                    className="w-64 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className="flex justify-between items-center rounded-full w-20 px-3 py-1 bg-yellow-600 text-white text-xs"
              style={{ zIndex: 999 }}
            >
              <span className="mt-1">
                {En_To_Fa(`${product.images.length}`)} /
                {En_To_Fa(`${activeIndex + 1}`)}
              </span>
              <LuImage size={14} className="rounded-md" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Product Name  */}
            <div className="text-black leading-8 mt-5 text-base font-semibold">
              <h4>{product.name}</h4>
            </div>

            {/* Product Colors  */}
            <div className="flex flex-col gap-5 border-b w-fit pb-4">
              {filteredColors && (
                <div className="flex gap-3">
                  <Color colors={filteredColors} />
                </div>
              )}
            </div>

            {/* Border  */}
            <span className="border-b pb-3 mb-3"></span>

            {/* Product Customer  */}
            <div className="flex flex-col gap-4 bg-blue-50 rounded-md p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-black">
                  <CiShop size={25} />
                  <span>دیجی گستر</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-xs">
                  <span>همه فروشندگان</span>
                  <span>{En_To_Fa(`( 3 )`)}</span>
                  <BiChevronDown size={18} />
                </div>
              </div>
              <div className="flex items-center gap-3 border-b border-white px-1 pb-4 text-xs">
                <BsBox size={14} />
                <span className="text-yellow-600">
                  موجود در انبار فروشنده ( ارسال از 1 روز کاری بعد )
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-xs">
                  <TiTick size={18} className="text-yellow-600" />
                  <span>{En_To_Fa(`18`)} ماه گارانتی شرکتی</span>
                </div>
              </div>
            </div>

            {/* Border  */}
            <span className="border-y py-[1px] my-5"></span>

            {/* Send Today Border  */}
            <SendTodayBorder />

            {/* Product Quarantee Icons  */}
            <SecondSection />

            {/* Border  */}
            <span className="border-y py-[1px] my-5"></span>

            {/* Main product specifications */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-base">ویژگی های اصلی</h3>
              <div className="border border-yellow-600 text-xs rounded px-4">
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

            {/* <ThirdSection product={product} />

            <ProductList /> */}

            {/* Border  */}
            <span className="border-y py-0.5 my-5"></span>
          </div>
        </div>
      </section>
    </>
  );
};

const SpecificationItem = tw.div`
    flex gap-2 border-b border-dashed p-5
`;

const SpecificationItemText = tw.p`
    font-semibold
`;

export default ProductDetailScreen;
