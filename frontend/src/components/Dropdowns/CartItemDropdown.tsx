import { useCartStore, useColorStore, useProductStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { ICart } from "@/utils/type";
import Image from "next/image";
import { FC, useEffect } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

interface IProps {
  cartItem: ICart;
}

const CartItemDropdown: FC<IProps> = ({ cartItem }) => {
  const { products, fetchProducts } = useProductStore((state) => state);
  const { colors, fetchColors } = useColorStore((state) => state);
  const { addToCart, removeCartItem, decreaseQuantity } = useCartStore(
    (state) => state
  );

  const product = products.find(
    (product) => product._id === cartItem.productId
  );

  const color = colors.find((color) => color._id === cartItem.colorId);

  const findImage = product?.images.filter(
    (image) => image.color === cartItem.colorId
  );

  //   ------------- Remove Cart Item From Cart -----------------------

  const handleRemoveCartItem = () => {
    removeCartItem(cartItem.productId);
  };

  //   ------------- Decrease Cart Item In Cart -----------------------

  const handleDecreaseCartItem = () => {
    decreaseQuantity(cartItem.productId);
  };

  //   ------------- Add To Cart Item -----------------------

  const handleAddToCart = () => {
    addToCart(cartItem);
  };

  // ------------------------------------------------------------------

  useEffect(() => {
    fetchColors();
    fetchProducts();
  }, []);

  if (product && findImage && color)
    return (
      <div
        key={cartItem.productId}
        className="flex py-8 border-b last:border-none"
      >
        <div className="flex flex-col gap-10 justify-between">
          <h4 className="leading-6">{product.name}</h4>
          <div className="flex gap-2 w-fit p-1 rounded border border-yellow-700 pl-3">
            <span
              className="w-4 h-4 rounded-md"
              style={{ backgroundColor: color.code }}
            ></span>
            <span>{color.name}</span>
          </div>
          <div className="flex items-center gap-1 m-2">
            <button
              onClick={handleAddToCart}
              disabled={cartItem.quantity === product.countInStock}
              className={`flex justify-center items-center shadow-3xl rounded h-10 w-10 text-blue-600 disabled:opacity-50`}
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
              <span className="text-base">
                {En_To_Fa(`${cartItem.quantity}`)}
              </span>
            </div>
            {cartItem.quantity > 1 ? (
              <button
                onClick={handleDecreaseCartItem}
                className="flex justify-center items-center shadow-3xl rounded h-10 w-10 text-blue-600"
              >
                <BiMinus size={20} />
              </button>
            ) : (
              <button
                onClick={handleRemoveCartItem}
                className="flex justify-center items-center shadow-3xl rounded h-10 w-10 text-blue-600"
              >
                <BiTrash size={20} />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Image
            src={findImage[0].file}
            alt={product?.name || ""}
            width={160}
            height={200}
            className="w-40 h-44 object-contain"
          />
          <section className="flex flex-col justify-end gap-3 text-base mt-7 px-5">
            {product.discount ? (
              <div className="flex justify-end text-xs">
                <p className="flex justify-center items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded w-fit">
                  <span>%</span>
                  <span>
                    {product.discount ? En_To_Fa(`${cartItem.discount}`) : null}
                  </span>
                </p>
              </div>
            ) : null}
            <div className="flex justify-end items-center gap-1">
              <span
                className={`${
                  product.discount ? "line-through text-gray-400 text-xs" : null
                }`}
              >
                {En_To_Fa(
                  `${(findImage[0].price * cartItem.quantity).toLocaleString(
                    "fa-IR"
                  )}`
                )}
              </span>
              <span
                className={product.discount ? "text-gray-400 text-sm" : "text-black"}
              >
                تومان
              </span>
            </div>
            {product.discount ? (
              <div className="flex justify-end items-center gap-1 text-red-600">
                <span>
                  {En_To_Fa(
                    `${(
                      findImage[0].price * cartItem.quantity -
                      findImage[0].price *
                        cartItem.quantity *
                        (cartItem.discount / 100)
                    ).toLocaleString("fa-IR")}`
                  )}
                </span>
                <span>تومان</span>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    );
};

export default CartItemDropdown;
