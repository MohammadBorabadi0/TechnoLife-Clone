import { FC, RefObject, useEffect, useRef, useState } from "react";
import ProductComments from "../ProductComments";
import ProductRating from "../ProductRating";
import AddProductComment from "../AddProductComment";
import ProductSummary from "../ProductSummary";
import ProductSpecifications from "../ProductSpecifications";
import ProductTabs from "../ProductTabs";
import { ProductData } from "@/utils/type";
import { useStore } from "@/store/store";

interface IProps {
  product: ProductData;
  specificationsRef: RefObject<HTMLElement>;
  commentsRef: RefObject<HTMLElement>;
  borderRef: RefObject<HTMLElement>;
  scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
}

const ThirdSection: FC<IProps> = ({
  product,
  specificationsRef,
  commentsRef,
  borderRef,
  scrollToSection,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [divPosition, setDivPosition] = useState(127);

  const { activeTab, setActiveTab } = useStore((state) => state);

  // handle distance position sticky
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > scrollPosition) {
        setDivPosition(85);
      } else {
        setDivPosition(127);
      }
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // handle Active Tab
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + 140;

      if (borderRef?.current) {
        if (currentPosition < borderRef.current.offsetTop) {
          setActiveTab("specifications");
        } else {
          setActiveTab("comments");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Product Tabs  */}
      <ProductTabs
        divPosition={divPosition}
        scrollToSection={scrollToSection}
        activeTab={activeTab}
        specificationsRef={specificationsRef}
        commentsRef={commentsRef}
      />

      <div className="flex flex-col lg:flex-row lg:gap-14">
        <div className="flex-1">
          <section ref={specificationsRef} id="specifications">
            <ProductSpecifications />
            <span className="py-0.5 my-5 border-y block"></span>
          </section>

          <section ref={commentsRef} id="comments">
            <div className="flex flex-col-reverse 2xl:flex-row gap-5 mt-10">
              <ProductComments product={product} />
              <div>
                {/* Product Comments Title  */}
                <div className="flex 2xl:hidden text-black items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-yellow-600 block"></span>
                  <span className="text-lg font-semibold">نظرات کاربران</span>
                </div>

                {/* Product Rating & Add Comment Button  */}
                <div
                  className="sm:flex flex-row-reverse flex-1 justify-between lg:sticky h-fit"
                  style={{ top: divPosition + 100 }}
                >
                  <ProductRating product={product} />
                  <AddProductComment />
                </div>
              </div>
            </div>
          </section>
        </div>
        <ProductSummary product={product} />
      </div>
    </div>
  );
};

export default ThirdSection;
