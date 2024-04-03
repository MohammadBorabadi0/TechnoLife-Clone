import { useCartStore, useColorStore, useProductStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { ICart } from "@/utils/type";
import Image from "next/image";
import { FC, useEffect } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { LuBox } from "react-icons/lu";
import { TbDiscountCheck } from "react-icons/tb";

interface IProps {
  cartItem: ICart;
}

const CartItem: FC<IProps> = ({ cartItem }) => {
  const { products, fetchProducts } = useProductStore((state) => state);
  const { colors, fetchColors } = useColorStore((state) => state);
  const { decreaseQuantity, removeCartItem, addToCart } = useCartStore(
    (state) => state
  );

  const product = products.find(
    (product) => product._id === cartItem.productId
  );

  const color = colors.find((color) => color._id === cartItem.colorId);

  const findImage = product?.images.filter(
    (image) => image.color === cartItem.colorId
  );

  // -----------------------------------------------------

  // handle Add To Cart

  const handleAddToCart = () => {
    addToCart(cartItem);
  };

  // --------------------------------------------------

  // handle Decrease Quantity From Cart

  const handleDecreaseCartItem = () => {
    decreaseQuantity(cartItem.productId);
  };

  // --------------------------------------------------

  // handle Remove CartItem From Cart

  const handleRemoveCartItem = () => {
    removeCartItem(cartItem.productId);
  };

  // --------------------------------------------------

  useEffect(() => {
    fetchProducts();
    fetchColors();
  }, []);

  if (product && findImage)
    return (
      <div className="flex flex-col gap-5 relative border-2 pr-10 py-7 xl:text-base rounded-xl">
        <div className="flex">
          <div className="flex flex-2 flex-col gap-5 justify-between">
            <h3 className="text-black font-semibold leading-7">
              {product.name}
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <TbDiscountCheck size={25} />
                <span> {En_To_Fa("18")} ماه گارانتی شرکتی</span>
              </div>
              <div className="flex items-center gap-2">
                <CiShop size={25} />
                <span>تکنولایف</span>
              </div>
              <div className="flex items-center gap-2 pr-0.5">
                <LuBox size={20} />
                <span className="text-yellow-custom text-sm">
                  موجود در انبار فروشنده
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center flex-1">
            <Image
              src={findImage[0].file}
              alt={product.name}
              width={300}
              height={450}
              className="w-44 xl:w-52 h-auto object-cover"
            />
          </div>
        </div>
        <div className="flex justify-between items-center bg-white border rounded-lg px-4 py-6 ml-10">
          {/* Right Section  */}
          <div className="flex items-center text-sm gap-2 border border-yellow-600 text-black rounded-md w-fit pl-4 pr-1 py-0.5">
            <span
              className="w-5 h-5 rounded-md border"
              style={{ backgroundColor: color?.code }}
            ></span>
            <span>{color?.name}</span>
          </div>

          {/* Left Section  */}
          <div className="flex gap-7">
            <div className="flex flex-row-reverse gap-5">
              {cartItem.discount > 0 ? (
                <div className="flex items-center gap-1 text-red-600">
                  <span className="text-lg font-semibold">
                    {En_To_Fa(
                      `${(
                        findImage[0].price * cartItem.quantity -
                        findImage[0].price *
                          cartItem.quantity *
                          (cartItem.discount / 100)
                      ).toLocaleString("fa-IR")}`
                    )}
                  </span>
                  <span className="text-xs">تومان</span>
                </div>
              ) : null}
              <div className="flex items-center gap-1">
                <span
                  className={`${
                    cartItem.discount > 0
                      ? "line-through text-left text-gray-400 flex-1"
                      : "text-yellow-custom xl:text-lg font-semibold"
                  }`}
                >
                  {En_To_Fa(
                    `${(findImage[0].price * cartItem.quantity).toLocaleString(
                      "fa-IR"
                    )}`
                  )}
                </span>
                <span className="text-black text-xs">تومان</span>
              </div>
              {cartItem.discount > 0 ? (
                <div className="flex items-center text-xs">
                  <p className="flex justify-center items-center gap-1 bg-red-600 text-white px-2 py-1 rounded w-fit h-fit">
                    <span>%</span>
                    <span>
                      {cartItem.discount > 0
                        ? En_To_Fa(`${cartItem.discount}`)
                        : null}
                    </span>
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-1 m-2">
              <button
                onClick={handleAddToCart}
                disabled={cartItem.quantity === product.countInStock}
                className={`flex justify-center items-center shadow-3xl rounded h-9 w-9 text-blue-600 disabled:opacity-50`}
              >
                <BiPlus size={20} />
              </button>
              <div className="grid place-items-center font-semibold select-none w-12 h-12">
                <span
                  className={`
                      ${
                        cartItem.quantity === product.countInStock
                          ? "flex text-gray-400 text-xs font-medium transition-all duration-150"
                          : "hidden"
                      }
                    `}
                >
                  حداکثر
                </span>
                <span className="text-lg">
                  {En_To_Fa(`${cartItem.quantity}`)}
                </span>
              </div>
              {cartItem.quantity > 1 ? (
                <button
                  onClick={handleDecreaseCartItem}
                  className="flex justify-center items-center shadow-3xl rounded h-9 w-9 text-blue-600"
                >
                  <BiMinus size={20} />
                </button>
              ) : (
                <button
                  onClick={handleRemoveCartItem}
                  className="flex justify-center items-center shadow-3xl rounded h-9 w-9 text-blue-600"
                >
                  <BiTrash size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleRemoveCartItem}
          className="absolute left-2 top-2 border-2 rounded-full p-1.5 text-gray-500"
        >
          <BiTrash size={17} />
        </button>
      </div>
    );
};

export default CartItem;