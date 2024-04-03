import "./Billboard.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const images = [
  { id: 1, address: "/billboards/5.webp" },
  { id: 2, address: "/billboards/3.webp" },
  { id: 3, address: "/billboards/4.webp" },
];

const Billboard = () => {
  return (
    <section id="billboards">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 100000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.address}
              alt={item.address}
              className="w-full h-[20vh] sm:h-[50vh] max-h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Billboard;
