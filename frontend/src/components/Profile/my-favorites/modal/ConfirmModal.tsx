import { useFavoriteProducts } from "@/store/store";
import { ProductData } from "@/utils/type";
import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  showConfirmModal: true;
  setShowConfirmModal: Dispatch<SetStateAction<boolean>>;
  product: ProductData;
}

const ConfirmModal: FC<IProps> = ({
  showConfirmModal,
  setShowConfirmModal,
  product,
}) => {
  const { removeProductFromFavorites } = useFavoriteProducts((state) => state);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-100 text-sm bg-opacity-10"
      onClick={() => setShowConfirmModal(false)}
    >
      <div
        className="flex flex-col items-center gap-5 bg-white rounded-lg h-fit p-10 w-[300px] lg:w-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-slate-600 text-base font-semibold">
          آیا مطمئنید که این کالا از لیست حذف شود ؟
        </p>
        <div className="flex w-full items-center gap-10 p-10 pb-0">
          <button
            className="bg-slate-600 text-white rounded-lg flex-1 py-2.5"
            onClick={() => {
              removeProductFromFavorites(product._id!);
              setShowConfirmModal(false);
            }}
          >
            بله
          </button>
          <button
            className="border border-slate-600 text-slate-600 rounded-lg flex-1 py-2.5"
            onClick={() => setShowConfirmModal(false)}
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
