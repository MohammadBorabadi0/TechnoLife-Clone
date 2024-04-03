import { FC } from "react";
import { En_To_Fa } from "../../utils/functions";
import Link from "next/link";

// icons
import { FaPlus } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

interface IProps {
  title: string;
  count?: number;
  link?: string;
}

const Title: FC<IProps> = ({ title, count, link }) => {
  return (
    <section className="flex justify-between items-center border-b border-black text-black p-4 mb-5 w-full">
      <h2 className="text-lg font-semibold">
        {title} {count && En_To_Fa(`(${count})`)}
      </h2>
      {link && (
        <Link
          href={link}
          className="text-sm text-white p-2 rounded bg-purple-700"
        >
          {!title.includes("افزودن") &&
          !title.includes("ویرایش") &&
          !title.includes("سفارش") ? (
            <FaPlus />
          ) : (
            <FaArrowLeft />
          )}
        </Link>
      )}
    </section>
  );
};

export default Title;
