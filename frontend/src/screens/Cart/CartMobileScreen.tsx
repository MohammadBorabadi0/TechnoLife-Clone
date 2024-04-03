import ConfirmModal from "@/components/Cart/MobileScreen/ConfirmModal";
import ProductList from "@/components/Home/ProductList/ProductList";
import MobileCartItems from "@/components/Cart/MobileScreen/MobileCartItems";
import MobileCartSummary from "@/components/Cart/MobileScreen/MobileCartSummary";
import { useModal, useProductStore } from "@/store/store";
import { En_To_Fa, calculateCartSummary } from "@/utils/functions";
import { ICart } from "@/utils/type";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BiTrash } from "react-icons/bi";

interface IProps {
  cartItems: [] | ICart[];
}

const CartMobileScreen: FC<IProps> = ({ cartItems }) => {
  const { showConfirmModal, setShowConfirmModal } = useModal((state) => state);
  const { products } = useProductStore((state) => state);

  // utils
  const { totalPricesAfterDiscount } = calculateCartSummary(cartItems);

  const router = useRouter();

  return (
    <div className="lg:hidden text-xs sm:text-base">
      {/* Cart Title  */}
      <div className="flex justify-between items-center py-5 px-3 lg:px-5">
        <div className="flex items-center gap-2 font-semibold">
          <h2 className="text-black">سبد خرید شما</h2>
          <span className="text-xs text-gray-500">
            {En_To_Fa(`${cartItems.length}`)} عدد کالا
          </span>
        </div>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="flex items-center gap-1 text-xs font-semibold text-gray-500"
        >
          <span>حذف کل سبد خرید</span>
          <BiTrash size={16} />
        </button>
      </div>

      {/* Border */}
      <span className="border-b border-gray-150 block"></span>

      <section className="flex flex-col gap-5">
        <MobileCartItems cartItems={cartItems} />
        <MobileCartSummary cartItems={cartItems} />
      </section>

      <ProductList products={products} />

      <span className="mb-10 block lg:hidden"></span>

      {/* Button For Continue Shopping Button */}
      <div className="flex lg:hidden justify-center items-center fixed left-0 right-0 bottom-0 h-20 bg-[#f6f6f6] border-t">
        <button
          onClick={() => router.push("/shipment")}
          className="flex items-center justify-evenly bg-green-custom text-base text-white flex-1 h-12 mx-6 rounded-xl"
        >
          <span>ادامه خرید</span>
          <span className="text-lg">|</span>
          <div className="flex items-center gap-1">
            {En_To_Fa(`${totalPricesAfterDiscount.toLocaleString("fa-IR")}`)}
            <span className="text-xs">تومان</span>
          </div>
        </button>
      </div>

      {showConfirmModal && <ConfirmModal />}
    </div>
  );
};

export default CartMobileScreen;
