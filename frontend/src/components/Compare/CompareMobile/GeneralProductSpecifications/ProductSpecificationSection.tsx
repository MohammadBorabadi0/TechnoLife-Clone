import { useCompareProductStore } from "@/store/store";
import { ISpecificatons } from "@/utils/type";
import { FC } from "react";

interface IProps {
  title: string;
  dataKey: keyof ISpecificatons;
}

const ProductSpecificationSection: FC<IProps> = ({ title, dataKey }) => {
  const { compareProducts } = useCompareProductStore((state) => state);

  return (
    <>
      {compareProducts.some((product) => product.specifications[dataKey]) && (
        <section className="flex flex-col gap-2 p-5 even:bg-white odd:bg-[#f4f4f4] rounded-lg mx-3">
          <h3 className="text-sm leading-7.5 text-gray-600">
            {title}
          </h3>
          <div className="grid w-full gap-x-5 overflow-hidden 2xl:gap-x-9 grid-cols-4 text-black text-xs leading-7">
            {compareProducts.map(
              (product) =>
                product.specifications[dataKey] && (
                  <div key={product._id}>{product.specifications[dataKey]}</div>
                )
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductSpecificationSection;
