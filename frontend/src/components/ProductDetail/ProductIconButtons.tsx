// icons
import { useModal, useStore } from "@/store/store";
import { FC, RefObject } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import { PiScalesFill } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";

interface IProps {
  commentsRef: RefObject<HTMLElement>;
  scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
}

const ProductIconButtons: FC<IProps> = ({ commentsRef, scrollToSection }) => {
  const { showShareModal, setShowShareModal } = useModal((state) => state);

  return (
    <section>
      <div className="flex justify-center gap-8">
        <button
          className="group shadow-md border border-gray-100 shadow-slate-300 p-2 rounded relative"
          onClick={() => setShowShareModal(true)}
        >
          <GrShareOption size={16} />
          <span className="invisible sm:group-hover:visible rounded-full absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-md border border-gray-100 shadow-slate-300 px-3 py-1.5 whitespace-nowrap text-sm">
            اشتراک گذاری
          </span>
        </button>
        <button
          className="group shadow-md border border-gray-100 shadow-slate-300 p-2 rounded relative"
          onClick={() => scrollToSection(commentsRef)}
        >
          <TiMessages size={16} color="blue" />
          <span className="invisible sm:group-hover:visible rounded-full absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-md border border-gray-100 shadow-slate-300 px-3 py-1.5 whitespace-nowrap text-sm">
            نظرات کاربران
          </span>
        </button>
        <button className="group shadow-md border border-gray-100 shadow-slate-300 p-2 rounded relative">
          <PiScalesFill size={16} />
          <span className="invisible sm:group-hover:visible rounded-full absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-md border border-gray-100 shadow-slate-300 px-3 py-1.5 whitespace-nowrap text-sm">
            مقایسه
          </span>
        </button>
        <button className="group shadow-md border border-gray-100 shadow-slate-300 p-2 rounded relative">
          <FaRegHeart size={16} color="red" />
          <span className="invisible sm:group-hover:visible rounded-full absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-md border border-gray-100 shadow-slate-300 px-3 py-1.5 whitespace-nowrap text-sm">
            مورد علاقه
          </span>
        </button>
      </div>
    </section>
  );
};

export default ProductIconButtons;
