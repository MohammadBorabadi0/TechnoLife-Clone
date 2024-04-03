import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import CompareHeader from "../CompareHeader";
import ProductSpecificationSection from "./ProductSpecificationSection";
import SectionTitle from "./SectionTitle";

interface IProps {
  generalSpecificationsRef: MutableRefObject<HTMLDivElement | null>;
  compareHeaderRef: MutableRefObject<HTMLDivElement | null>;
}

const GeneralProductSpecifications: FC<IProps> = ({
  generalSpecificationsRef,
  compareHeaderRef,
}) => {
  const activeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const activeElement = activeRef.current;

      if (activeElement) {
        const { top } = activeElement.getBoundingClientRect();
        if (compareHeaderRef.current) {
          compareHeaderRef.current.style.display = top <= 0 ? "" : "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="flex flex-col gap-3 mt-10 min-w-[1000px] overflow-x-auto"
      ref={generalSpecificationsRef}
    >
      <div ref={activeRef} className="bg-blue-50 text-slate-800 p-3">
        مشخصات کلی و کلیدی
      </div>

      <CompareHeader compareHeaderRef={compareHeaderRef} />

      <ProductSpecificationSection title="نوع پردازنده - CPU" dataKey="cpu" />
      <ProductSpecificationSection
        title="پردازنده گرافیکی - GPU"
        dataKey="gpu"
      />
      <ProductSpecificationSection title="کیفیت دوربین" dataKey="mainCamera" />
      <ProductSpecificationSection title="سیستم عامل" dataKey="os" />
      <ProductSpecificationSection title="وزن" dataKey="weight" />
      <ProductSpecificationSection title="ابعاد" dataKey="dimensions" />

      <SectionTitle title="حافظه" />

      <ProductSpecificationSection title="حافظه داخلی" dataKey="memory" />
      <ProductSpecificationSection title="حافظه RAM" dataKey="ram" />

      <SectionTitle title="مشخصات صفحه نمایش" />

      <ProductSpecificationSection
        title="نوع صفحه نمایش"
        dataKey="screenType"
      />
      <ProductSpecificationSection
        title="سایز صفحه نمایش"
        dataKey="screenSize"
      />

      <SectionTitle title="دوربین" />

      <ProductSpecificationSection title="دوربین پشت" dataKey="mainCamera" />
      <ProductSpecificationSection title="دوربین جلو" dataKey="selfieCamera" />

      <SectionTitle title="سایر قابلیت ها" />

      <ProductSpecificationSection title="سنسورها" dataKey="sensors" />

      <SectionTitle title="مشخصات باتری و مدت زمان کارکرد" />

      <ProductSpecificationSection title="ظرفیت باتری" dataKey="battery" />
    </div>
  );
};

export default GeneralProductSpecifications;
