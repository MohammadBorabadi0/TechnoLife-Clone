import { useCartStore, useModal } from "@/store/store";
import { BiTrash } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ConfirmModal = () => {
  const { showConfirmModal, setShowConfirmModal } = useModal((state) => state);
  const { removeAllCartItems } = useCartStore((state) => state);

  const handleRemoveAllCartItems = () => {
    removeAllCartItems();
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black text-sm bg-opacity-50">
        <div className="bg-white rounded-lg h-fit p-5 pt-0 w-[464px] overflow-hidden">
          {/* Modal Title  */}
          <div className="flex items-center justify-between border-b-2 overflow-hidden py-5 mb-5 text-lg">
            <div className="flex items-center gap-2 text-gray-500">
              <BiTrash size={25} />
              <h2 className="pt-2">حذف سبد خرید</h2>
            </div>
            <button onClick={() => setShowConfirmModal(false)}>
              <IoIosCloseCircleOutline size={30} />
            </button>
          </div>

          {/* Modal Content  */}
          <div className="flex flex-col gap-8">
            <p className="text-center text-base text-black">
              آیا از حذف کردن همه محصولات از سبد خرید مطمئن هستید؟
            </p>
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 p-4 hover:bg-gray-200 text-blue-600 rounded-xl transition-all duration-150"
              >
                انصراف
              </button>
              <button
                onClick={handleRemoveAllCartItems}
                className="flex flex-1 justify-center p-4 text-sm bg-blue-600 text-white font-semibold rounded-xl"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={(e) => setShowConfirmModal(false)}
        className={`flex lg:hidden fixed inset-0 bg-gray-500 bg-opacity-50 z-50 transition-all duration-1000 ${
          showConfirmModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            showConfirmModal ? "h-44" : "h-0"
          } fixed left-0 right-0 bottom-0 flex flex-col bg-white p-5 transition-all duration-1000`}
        >
          <span className="w-8 h-1 rounded-xl block bg-gray-400 top-1 absolute left-1/2 transform -translate-x-1/2"></span>
          {/* Modal Title  */}
          <div className="flex items-center justify-between overflow-hidden mb-5 text-base">
            <div className="flex items-center gap-2 text-black">
              <BiTrash size={20} />
              <h2>حذف سبد خرید</h2>
            </div>
          </div>
          {/* Modal Content  */}
          <div className="flex flex-col gap-8">
            <p className="text-gray-500 pr-1">
              آیا از حذف کردن همه محصولات از سبد خرید مطمئن هستید؟
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 p-3 hover:bg-gray-200 text-sm text-blue-600 rounded-xl transition-all duration-150"
              >
                انصراف
              </button>
              <button
                onClick={handleRemoveAllCartItems}
                className="flex flex-1 justify-center p-3 text-sm bg-blue-600 text-white font-semibold rounded-xl"
              >
                حذف سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
