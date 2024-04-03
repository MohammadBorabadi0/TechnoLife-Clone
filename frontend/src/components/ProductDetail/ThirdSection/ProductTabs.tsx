import { FC, RefObject } from "react";

interface IProps {
  divPosition: number;
  scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
  activeTab: string;
  specificationsRef: RefObject<HTMLElement>;
  commentsRef: RefObject<HTMLElement>;
}

const ProductTabs: FC<IProps> = ({
  divPosition,
  scrollToSection,
  activeTab,
  specificationsRef,
  commentsRef,
}) => {
  return (
    <>
      {/* Product Tabs For Screen Md To Up */}
      <div
        className={`hidden lg:flex items-center gap-10 sticky z-10 h-fit bg-[#f6f6f6] px-5 my-5 border-b transition-all duration-200`}
        style={{ top: `${divPosition}px` }}
      >
        <button
          onClick={() => scrollToSection(specificationsRef)}
          className={`${
            activeTab === "specifications" && "border-b-4 border-yellow-600"
          } py-5`}
        >
          مشخصات فنی
        </button>
        <button
          onClick={() => scrollToSection(commentsRef)}
          className={`${
            activeTab === "comments" && "border-b-4 border-yellow-600"
          } py-5`}
        >
          نظرات کاربران
        </button>
      </div>

      {/* Product Tabs For Mobile Screen  */}
      <div
        className={`flex lg:hidden justify-center items-center gap-20 sticky top-0 z-10 h-fit bg-[#f6f6f6] px-5 my-5 border-b transition-all duration-200`}
      >
        <button
          onClick={() => scrollToSection(specificationsRef)}
          className={
            activeTab === "specifications"
              ? "border-b-4 border-yellow-600 py-3"
              : ""
          }
        >
          مشخصات فنی
        </button>
        <button
          onClick={() => scrollToSection(commentsRef)}
          className={
            activeTab === "comments" ? "border-b-4 border-yellow-600 py-3" : ""
          }
        >
          نظرات کاربران
        </button>
      </div>
    </>
  );
};

export default ProductTabs;
