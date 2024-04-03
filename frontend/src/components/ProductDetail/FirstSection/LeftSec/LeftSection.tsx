import Timer from "@/components/Home/Timer";
import { En_To_Fa } from "@/utils/functions";
import { FC } from "react";
import { BiCart, BiChevronDown, BiChevronLeft, BiPlus } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import SendTodayBorder from "../../SendTodayBorder";
import { ProductData } from "@/utils/type";
import { useCartStore, useColorStore, useStore } from "@/store/store";
import { useRouter } from "next/navigation";

interface IProps {
  product: ProductData;
}

const LeftSection: FC<IProps> = ({ product }) => {
  const { activeIndex } = useStore((state) => state);

  const { addToCart, removeCartItem, cartItems } = useCartStore(
    (state) => state
  );

  const router = useRouter();

  const isExistProductInCartItems = cartItems.find(
    (cart) => cart.productId === product._id
  );

  const handleAddToCart = () => {
    if (product && product._id) {
      const newCartItem = {
        id: new Date().getTime(),
        productId: product._id,
        quantity: 1,
        colorId: product.images[activeIndex].color,
        discount: product.discount || 0,
        price: product.images[activeIndex].price,
      };
      addToCart(newCartItem);
    }
  };

  const handleRemoveFromCart = () => {
    if (product && product._id) removeCartItem(product._id);
  };

  return (
    <div className="flex-1">
      {/* Product Discount Timer  */}
      <div className="flex justify-center">
        {product.discountTime ? (
          <div className="w-[80%]">
            <Timer hours={product.discountTime} product={product} />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-5 shadow-3xl p-4 mb-8 rounded-lg text-[10px] sm:text-xs">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 font-semibold">
            <span className="border border-green-600 rounded-full">
              <TiTick color="green" size={18} />
            </span>
            <span>بیمه کالا</span>
          </div>
          <div className="flex gap-1 text-blue-600 font-semibold">
            <span>نمایش جزئیات</span>
            <BiChevronLeft size={18} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="flex items-center text-blue-600 border border-blue-600 px-2 py-1.5 rounded-md gap-2">
            <span>خرید بیمه</span>
            <BiPlus size={16} />
          </button>
          <div className="flex items-center gap-2">
            <span className="line-through">{En_To_Fa(`776,000`)}</span>
            <span className="font-semibold">{En_To_Fa(`310,400`)} تومان</span>
          </div>
        </div>
        <section className="flex flex-col gap-4 bg-blue-50 rounded-md p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-black">
              <CiShop size={25} />
              <span>دیجی گستر</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 font-semibold">
              <span>همه فروشندگان</span>
              <span>{En_To_Fa(`( 3 )`)}</span>
              <BiChevronDown size={18} />
            </div>
          </div>
          <div className="flex items-center gap-3 border-b border-white whitespace-nowrap px-1 pb-4">
            <BsBox size={14} />
            <span className="text-yellow-600">
              موجود در انبار فروشنده ( ارسال از 1 روز کاری بعد )
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-xs">
              <TiTick size={18} className="text-yellow-600" />
              <span>{En_To_Fa(`18`)} ماه گارانتی شرکتی</span>
            </div>
          </div>
        </section>

        {/* Product Price Section  */}
        <div className="flex flex-col justify-end gap-2">
          {/* Product Discount Amount */}
          {product.discount ? (
            <div className="flex gap-2 justify-end">
              <span className="bg-red-600 text-white px-2 py-1 rounded-full">
                {En_To_Fa(
                  `${(
                    product.images[activeIndex]?.price *
                    (product.discount / 100)
                  ).toLocaleString("fa-IR")}`
                )}{" "}
                تومان تخفیف
              </span>
            </div>
          ) : null}

          <div
            className={`flex gap-1 justify-end items-center text-lg mt-2 ${
              product.discount && "text-red-600"
            } font-semibold`}
          >
            {/* Product Price  */}
            <span
              className={`${
                product.discount && "line-through text-gray-600 ml-1"
              }`}
            >
              {En_To_Fa(
                `${product.images[activeIndex]?.price.toLocaleString("fa-IR")}`
              )}
            </span>

            {/* Product price after discount */}
            {product.discount ? (
              <span>
                {En_To_Fa(
                  `${(
                    product.images[activeIndex]?.price -
                    product.images[activeIndex]?.price * (product.discount / 100)
                  ).toLocaleString("fa-IR")}`
                )}
              </span>
            ) : null}
            <span className="text-sm">تومان</span>
          </div>
        </div>

        {isExistProductInCartItems ? (
          <div className="flex items-center text-green-600 text-base font-semibold">
            <button className="flex-1" onClick={handleRemoveFromCart}>
              حذف
            </button>
            <button
              onClick={() => router.push("/cart")}
              className="flex items-center justify-center relative py-3 border-2 border-green-600 rounded-lg flex-2"
            >
              <span>مشاهده سبد خرید</span>
              <BiChevronLeft size={25} className="absolute left-2" />
            </button>
          </div>
        ) : (
          <>
            {/* Add To Cart Button  */}
            <button
              className="flex justify-between items-center bg-green-custom text-white font-medium p-3 rounded-lg overflow-hidden text-lg"
              onClick={handleAddToCart}
            >
              <span className="flex-1">افزودن به سبد خرید</span>
              <BiCart size={20} />
            </button>
          </>
        )}
      </div>

      {/* Send Today Border  */}
      <SendTodayBorder />
    </div>
  );
};

export default LeftSection;
