import React, { FC } from "react";
import { PiSpeakerHifiFill, PiWatchDuotone } from "react-icons/pi";
import { MdOutlineTabletMac } from "react-icons/md";
import { CgLaptop } from "react-icons/cg";
import { ImMobile } from "react-icons/im";
import Image from "next/image";
import { GiConsoleController } from "react-icons/gi";
import { LuHeadphones } from "react-icons/lu";

interface IProps {
  categoryName: string;
}

const IconComponent: FC<IProps> = ({ categoryName }) => {
  if (categoryName === "گوشی موبایل") return <ImMobile />;
  if (categoryName === "لپ تاپ") return <CgLaptop />;
  if (categoryName === "هدفون") return <LuHeadphones />;
  if (categoryName === "اسپیکر") return <PiSpeakerHifiFill />;
  if (categoryName === "هندزفری")
    return (
      <Image
        src="/images/handsFree.svg"
        alt="handsFree"
        width={20}
        height={20}
      />
    );
  if (categoryName === "ساعت هوشمند") return <PiWatchDuotone />;
  if (categoryName === "تبلت") return <MdOutlineTabletMac />;
  if (categoryName === "گیمینگ") return <GiConsoleController />;
  return null;
};

export default IconComponent;
