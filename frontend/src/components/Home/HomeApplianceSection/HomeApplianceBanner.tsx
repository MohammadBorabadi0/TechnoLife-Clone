const HomeApplianceBanner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <img
        src="/images/home-appliances-banner-01.jpg"
        alt=""
        loading="lazy"
        className="w-full h-[25vh] md:h-[50vh] max-h-[400px] rounded-xl object-cover cursor-pointer"
      />
      <img
        src="/images/home-appliances-banner-02.jpg"
        alt=""
        loading="lazy"
        className="w-full h-[25vh] md:h-[50vh] max-h-[400px] rounded-xl object-cover cursor-pointer"
      />
    </div>
  );
};

export default HomeApplianceBanner;
