import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft } from "react-icons/fi";
import "./ProductList.css";
import { ProductData } from "@/utils/type";
import { FC } from "react";

interface IProps {
  products: ProductData[];
}

const ProductList: FC<IProps> = ({ products }) => {
  return (
    <section
      id="productlist"
      className="flex flex-col gap-10 sm:gap-8 lg:border-4 border-red-600 rounded-xl"
    >
      {/* Border  */}
      <span className="lg:hidden border-y pb-[3px]"></span>

      <div className="flex justify-between items-center md:mx-10 text-sm md:text-base font-semibold">
        <h2>پرچمداران هوشمند</h2>
        <button className="flex items-center gap-1 text-blue-700">
          نمایش همه
          <FiChevronLeft />
        </button>
      </div>
      <div className="flex">
        <Swiper
          navigation={true}
          autoplay={{ delay: 90000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={7}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            400: {
              slidesPerView: 2.3,
            },
            576: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Border  */}
      <span className="lg:hidden border-y pb-[3px]"></span>
    </section>
  );
};

export default ProductList;
