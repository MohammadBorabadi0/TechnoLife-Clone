import { FC, RefObject } from "react";

// components
import RightSection from "./RightSec/RightSection";
import LeftSection from "./LeftSec/LeftSection";
import { ProductData } from "@/utils/type";

interface IProps {
  product: ProductData;
  commentsRef: RefObject<HTMLElement>;
  scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
}

const FirstSection: FC<IProps> = ({
  product,
  commentsRef,
  scrollToSection,
}) => {
  return (
    <>
      <div className="flex gap-5">
        {/* Right Section  */}
        <RightSection
          product={product}
          commentsRef={commentsRef}
          scrollToSection={scrollToSection}
        />

        {/* Left Section  */}
        <LeftSection product={product} />
      </div>
    </>
  );
};

export default FirstSection;
