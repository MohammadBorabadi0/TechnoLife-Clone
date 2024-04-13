import Image from "next/image";
import React from "react";

const EmptyFavorites = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-gray-100 my-10 h-[300px] lg:h-[500px]">
      <h2 className="font-semibold text-gray-500">
        لیست علاقه مندی شما خالی است
      </h2>
      <Image
        src="/images/favorite.webp"
        alt="favorite-empty"
        width={300}
        height={300}
        className="w-40 object-cover"
      />
    </div>
  );
};

export default EmptyFavorites;
