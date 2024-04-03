import { FC, useEffect, useState } from "react";
import Image from "next/image";

// components
import Timer from "@/components/Home/Timer";

// utils
import { En_To_Fa } from "@/utils/functions";

// icons
import { BiCart, BiChevronLeft } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { ProductData } from "@/utils/type";
import { useCartStore, useColorStore, useStore } from "@/store/store";

interface IProps {
  product: ProductData;
}

const ProductSummary: FC<IProps> = ({ product }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [divPosition, setDivPosition] = useState("top-0");

  const { activeIndex } = useStore((state) => state);
  const { colors } = useColorStore((state) => state);

  // ---------------------------------------------------

  // Handle Add To Cart And Remove From Cart

  const { addToCart, removeCartItem, cartItems } = useCartStore(
    (state) => state
  );

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

  // -----------------------------------------

  // Find Color By Id

  const colorId =
    product && product.images && product.images[activeIndex]?.color;
  const findColor = colors.find((color) => color._id === colorId);

  // -----------------------------------------

  const originalPrice = product.images && product.images[0]?.price;
  const discountedPrice =
    product.discount &&
    Math.round(
      originalPrice - originalPrice * (product.discount / 100)
    ).toLocaleString("fa-IR");

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > scrollPosition) {
        setDivPosition("md:top-[160px]");
      } else {
        setDivPosition("md:top-[210px]");
      }
      setScrollPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <>
      {/* Cart Summary in Screen md to Up Sizes  */}
      <div
        className={`hidden lg:block max-w-[387px] xl:min-w-[385px] mt-5 transition-all duration-200 sticky h-fit ${divPosition}`}
      >
        {product.discountTime ? (
          <div className="flex justify-center">
            <div className="w-[90%]">
              <Timer product={product} hours={product.discountTime} />
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-5 bg-white shadow-md border rounded-lg p-5">
          <div className="flex gap-5">
            {product.images && (
              <Image
                src={product.images[activeIndex]?.file}
                alt={product.name}
                title={product.name}
                width={80}
                height={80}
                className="object-contain"
              />
            )}
            <div className="flex flex-col gap-3 mt-6">
              <h4 className="text-black">{product.name}</h4>
              <div className="flex items-center text-xs gap-2 border border-yellow-600 text-black rounded-md w-fit pl-4 pr-1 py-1">
                <span
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: findColor?.code }}
                ></span>
                <span>{findColor?.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-black">
            <CiShop size={25} />
            <span>دیجی گستر</span>
          </div>
          <div className="flex items-center gap-3 border-b px-1 pb-4 text-xs">
            <BsBox size={14} />
            <span className="text-yellow-600">
              موجود در انبار فروشنده ( ارسال از 1 روز کاری بعد )
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <TiTick size={18} className="text-yellow-600" />
            <span>{En_To_Fa(`18`)} ماه گارانتی شرکتی</span>
          </div>

          {/* Product Price Section  */}
          <div className="flex flex-col justify-end gap-2">
            {/* Product Discount Amount */}
            {product.discount && product.images ? (
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
              {product.images && (
                <span
                  className={`${
                    product.discount && "line-through text-gray-600 ml-1"
                  }`}
                >
                  {En_To_Fa(
                    `${product.images[activeIndex]?.price.toLocaleString(
                      "fa-IR"
                    )}`
                  )}
                </span>
              )}

              {/* Product price after discount */}
              {product.discount && product.images ? (
                <span>
                  {En_To_Fa(
                    `${(
                      product.images[activeIndex].price -
                      product.images[activeIndex].price *
                        (product.discount / 100)
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
              <button className="flex items-center justify-center relative py-3 border-2 border-green-600 rounded-lg flex-2">
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
      </div>

      {/* Add To Cart Button For Small Screen Sizes  */}
      <div className="flex lg:hidden flex-col gap-3 z-10 fixed bottom-0 left-0 right-0 overflow-hidden p-4 bg-[#F8F8F8] border-t">
        <div className="flex items-center justify-end flex-1 gap-2 text-lg font-semibold">
          <span className="bg-red-600 text-white px-1.5 py-[1px] text-xs rounded-md">
            % {En_To_Fa(`${product.discount}`)}
          </span>
          {product.images && (
            <span className={product.discount ? "line-through" : ""}>
              {En_To_Fa(
                `${product.images[activeIndex]?.price.toLocaleString("fa-IR")}`
              )}
            </span>
          )}
          {product.discount && (
            <span className="text-red-600">
              {En_To_Fa(`${discountedPrice}`)}
            </span>
          )}
          <span className={`text-sm ${product.discount ? "text-red-600" : ""}`}>
            تومان
          </span>
        </div>
        {isExistProductInCartItems ? (
          <div className="flex items-center text-green-600 text-base font-semibold">
            <button className="flex-1" onClick={handleRemoveFromCart}>
              حذف
            </button>
            <button className="flex items-center justify-center relative py-3 border-2 border-green-600 rounded-lg flex-2">
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
    </>
  );
};

export default ProductSummary;
