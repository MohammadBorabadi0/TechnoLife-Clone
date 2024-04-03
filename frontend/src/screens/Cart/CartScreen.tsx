import CartItems from "@/components/Cart/CartItems";
import CartSummary from "@/components/Cart/CartSummary";
import ConfirmModal from "@/components/Cart/MobileScreen/ConfirmModal";
import { useModal } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { ICart } from "@/utils/type";
import { FC } from "react";
import { BiTrash } from "react-icons/bi";

interface IProps {
  cartItems: [] | ICart[];
}

const CartScreen: FC<IProps> = ({ cartItems }) => {
  const { showConfirmModal, setShowConfirmModal } = useModal((state) => state);

  return (
    <div className="flex gap-8 xl:gap-14 p-3 xl:p-5">
      <div className="flex flex-2 xl:flex-3 flex-col gap-5">
        {/* Cart Title  */}
        <div className="flex h-fit justify-between items-center text-sm xl:text-base">
          <div className="flex items-center gap-2 font-semibold">
            <h2 className="text-black">سبد خرید شما</h2>
            <span className="text-xs text-gray-500">
              {En_To_Fa(`${cartItems.length}`)} عدد کالا
            </span>
          </div>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex items-center gap-1 font-semibold text-gray-500"
          >
            <span className="text-sm xl:text-base">حذف کل سبد خرید</span>
            <BiTrash className='text-lg xl:text-xl' />
          </button>
        </div>

        {/* CartItems  */}
        <CartItems cartItems={cartItems} />
      </div>

      <div className="flex-1">
        <CartSummary cartItems={cartItems} />
      </div>
      {showConfirmModal && <ConfirmModal />}
    </div>
  );
};

export default CartScreen;