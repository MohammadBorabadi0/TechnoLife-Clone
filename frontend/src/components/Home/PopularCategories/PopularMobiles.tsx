const PopularMobiles = () => {
  return (
    <section className="flex flex-col gap-10 mt-7 text-start">
      <h2 className="flex justify-center sm:text-lg font-bold text-gray-700">
        برترین های موبایل
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-8 text-xs sm:text-sm">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center">
            <img
              src="https://www.technolife.ir/image/static_phone_xiaomi.png"
              alt=""
              className="w-20 md:w-40"
            />
          </div>
          <span>شیائومی</span>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center">
            <img
              src="https://www.technolife.ir/image/static_phone_honor.png"
              alt=""
              className="w-20 md:w-40"
            />
          </div>
          <span>آنر</span>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center">
            <img
              src="https://www.technolife.ir/image/static_phone_samsung.png"
              alt=""
              className="w-20 md:w-40"
            />
          </div>
          <span>سامسونگ</span>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center">
            <img
              src="https://www.technolife.ir/image/static_phone_poco.png"
              alt=""
              className="w-20 md:w-40"
            />
          </div>
          <span>پوکو</span>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center">
            <img
              src="https://www.technolife.ir/image/static_phone_iphone.png"
              alt=""
              className="w-20 md:w-40"
            />
          </div>
          <span>آیفون</span>
        </div>
      </div>
    </section>
  );
};

export default PopularMobiles;