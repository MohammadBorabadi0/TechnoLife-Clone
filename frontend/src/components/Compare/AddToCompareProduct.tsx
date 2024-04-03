import { ICategory } from "@/utils/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BiPlus } from "react-icons/bi";

interface IProps {
  category: ICategory | null;
}

const AddToCompareProduct: FC<IProps> = ({ category }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-28 border rounded-lg p-5 lg:min-w-[265px]">
      <div className="flex justify-center">
        <Image
          src="/images/static_add-product-compare.svg"
          alt="static_add-product-compare"
          title="add-compare-product"
          width={260}
          height={260}
          className="w-[260px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="bg-gray-100 w-full h-4 block rounded-lg"></span>
        <span className="bg-gray-100 w-full h-4 block rounded-lg"></span>
        <span className="bg-gray-100 w-14 h-4 block rounded-lg"></span>
        <span className="bg-gray-100 w-3/4 h-4 block rounded-lg"></span>
        <button
          className="relative flex items-center justify-center bg-blue-600 text-white mt-10 py-2.5 rounded-md"
          onClick={() =>
            router.push(
              `/product/list/تمامی-${category?.name || "گوشی موبایل"}-ها`
            )
          }
        >
          <span>افزودن کالا</span>
          <BiPlus size={18} className="absolute left-2" />
        </button>
      </div>
    </div>
  );
};

export default AddToCompareProduct;
