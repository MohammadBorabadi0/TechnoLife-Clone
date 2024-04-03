"use client";

import { FC, useState, useEffect } from "react";
import { parse } from "persian_util";
import { ProductData } from "@/utils/type";
import { useParams, usePathname } from "next/navigation";

interface IProps {
  hours: number;
  product: ProductData;
}

const Timer: FC<IProps> = ({ hours, product }) => {
  const [timeLeft, setTimeLeft] = useState(hours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hoursLeft = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = timeLeft % 60;

  const formattedHours = hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft;
  const formattedMinutes = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
  const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  return (
    <div
      className={`
      ${product?.discount ? "visible" : "invisible"}
   flex flex-col gap-1 w-full text-sm text-red-500 font-semibold mb-5`}
    >
      <div className="flex justify-between w-full">
        <span>فروش ویژه</span>
        <span>
          {parse.En_To_Fa(
            `${formattedSeconds} : ${formattedMinutes} : ${formattedHours}`
          )}
        </span>
      </div>
      <span className="h-1 rounded-full w-full bg-red-500"></span>
    </div>
  );
};

export default Timer;
