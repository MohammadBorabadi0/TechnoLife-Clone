"use client";

import { useCartStore, useModal, useProductStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";

const CartLgScreen = () => {
  const { showConfirmModal, setShowConfirmModal } = useModal((state) => state);
  const { cartItems } = useCartStore((state) => state);

  return (
    <section className="text-xs sm:text-sm">
      {/* Cart Title  */}
      <div className="flex justify-between items-center py-5 px-3 lg:px-5">
        <div className="flex items-center gap-2 font-semibold">
          <h2 className="text-black text-lg">سبد خرید شما</h2>
          <span>{En_To_Fa(`${cartItems.length}`)} عدد کالا</span>
        </div>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="flex items-center gap-1 text-xs font-semibold text-gray-500"
        >
          <span>حذف کل سبد خرید</span>
          <BiTrash size={16} />
        </button>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete all items?</p>
            <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
            <button onClick={() => console.log("Deleting all items")}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartLgScreen;
