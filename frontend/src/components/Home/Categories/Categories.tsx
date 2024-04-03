import "./Categories.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const images = [
  {
    id: 1,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_fQ1JW9_41fda70e-7de4-40b9-abb1-cd09f48a21d2.png",
    name: "گیمینگ",
  },
  {
    id: 2,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_B574Ao_90b3facc-fc2c-4044-818d-596da0f3df78.png",
    name: "لپ تاپ و کامپیوتر",
  },
  {
    id: 3,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_bvLDVP_a32ff3c7-d94a-43a8-98e5-6c8890d06e50.png",
    name: "ساعت و بند هوشمند",
  },
  {
    id: 4,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_bKYtgp_4aff6a4f-2ed8-4153-8368-b73fb6f16906.png",
    name: "لوازم جانبی",
  },
  {
    id: 5,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_oBqfhC_a9f23d81-83c5-4054-9163-083454a073dc.png",
    name: "تبلت",
  },
  {
    id: 6,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_ZF2YTy_bc869e82-f53c-40bb-b05c-65c5139585ee.png",
    name: "هدفون و هندزفری",
  },
  {
    id: 7,
    address:
      "https://technolife.ir/image/banner_CircleCategories_1OkxTf_3df5aedb-33ef-4200-a81a-a1444bcedf0e.png",
    name: "اسپیکر",
  },
  {
    id: 8,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_FgGs07_040c7036-93f8-4a6d-8ff5-dedb88183674.png",
    name: "گوشی موبایل",
  },
  {
    id: 10,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_Y7NJVr_53eb4a9b-166c-4851-95c7-b02ef4a7c7be.png",
    name: "پاوربانک",
  },
  {
    id: 11,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_IRf271_a72a1ec9-16db-4c56-8ccd-fbaaa3392903.png",
    name: "لوازم خانگی",
  },
  {
    id: 12,
    address:
      "https://www.technolife.ir/image/banner_CircleCategories_MIBn1s_75fda196-8a2f-4d07-bc9c-b49c252c9849.png",
    name: "ماشین های اداری",
  },
];

const Categories = () => {
  return (
    <section className="sm:px-4 relative" id="categories">
      <Swiper
        navigation={true}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={7}
        style={{ padding: "1rem" }}
        breakpoints={{
          0: {
            slidesPerView: 2.8,
            spaceBetween: 10,
          },
          400:{
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4.5,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 7,
            spaceBetween: 50,
          },
        }}
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col gap-6 items-center text-sm">
              <div className="flex justify-center items-center w-16 h-16 lg:w-32 lg:h-32 rounded-full ring-2 ring-offset-4 hover:ring-4 ring-red-600">
                <Image
                  src={item.address}
                  alt={item.address}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs md:text-sm">{item.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Categories;
