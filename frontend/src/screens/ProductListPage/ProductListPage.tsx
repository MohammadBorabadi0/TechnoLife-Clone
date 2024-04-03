"use client";

import NavItem from "@/components/Home/NavItem";
import tw from "tailwind-styled-components";
import ProductCard from "@/components/Home/ProductCard/ProductCard";
import Timer from "@/components/Home/Timer";
import PageHero from "@/components/PageHero";
import { useCompareStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { IProduct } from "@/utils/type";
import { useEffect } from "react";

// icons
import { CiFilter } from "react-icons/ci";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { BiSolidMemoryCard } from "react-icons/bi";
import { MdOutlineScreenshot } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { GoCpu } from "react-icons/go";
import { PiBatteryHighFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

const product: IProduct = {
  _id: 1,
  name: "لپ تاپ لنوو 15.6 اینچی IdeaPad 3 i3 1115G4-12GB-1TB HDD+256GB SSD",
  price: 17200000,
  user: "user-1",
  description: "test",
  brand: "لنوو",
  category: "لپ تاپ",
  // discount: 12,
  time: 3,
  image:
    "https://www.technolife.ir/image/small_product-TLP-28800_c90207e3-ccdc-4630-900a-337299189f08.png",
};

const ProductListPage = () => {
  const { compareProducts, setCompareProducts } = useCompareStore(
    (state) => state
  );

  useEffect(() => {
    const handleScroll = () => {
      const filterDiv = document.getElementById("filter");

      if (filterDiv) {
        const sticky = filterDiv.offsetTop;

        if (window.scrollY >= sticky) {
          filterDiv.classList.add("sticky");
        } else {
          filterDiv.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="flex flex-col gap-5 px-3 py-6 text-xs">
      <PageHero title="لپ تاپ" />
      <div className="flex sticky items-center justify-between gap-2">
        <div
          className="flex gap-10 flex-1 px-1 py-2 rounded-md"
          style={{ backgroundColor: "#f0f9ff" }}
        >
          <button className="flex items-center gap-1">
            <CiFilter size={20} />
            <span>فیلترها</span>
          </button>
          <button className="flex items-center gap-1">
            <FaSortAmountDownAlt size={15} />
            <div>
              <span>ترتیب : </span>
              <span>پرفروش‌ترین</span>
            </div>
          </button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          مقایسه
        </button>
      </div>
      <span>
        تعداد محصولات: <span>{En_To_Fa("1452")}</span> کالا
      </span>

      {/* Product Card  */}
      <section className="flex flex-col gap-8">
        <div
          className={`flex justify-between items-center text-xs sm:text-base border-b-4 rounded w-full sm:w-3/4 text-red-600 border-red-600 ${
            !product.discount && "invisible"
          }`}
        >
          <span>تخفیف</span>
          <Timer hours={product.time ? product.time : 0} />
        </div>
        <div className="flex gap-4 pb-4 border-b">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <strong className="text-sm font-semibold text-gray-800 leading-6">
                {product.name}
              </strong>
              <span className="flex gap-1 items-center justify-end text-sm font-semibold">
                <FaStar color="orange" />
                {En_To_Fa(`4.5`)}
              </span>
            </div>

            <div className="flex justify-around">
              <Div>
                <Span>
                  <BiSolidMemoryCard size={20} />
                </Span>
                128GB
              </Div>
              <Div>
                <Span>
                  <MdOutlineScreenshot size={20} />
                </Span>
                6.1
              </Div>
              <Div>
                <Span>
                  <IoCameraOutline size={20} />
                </Span>
                12
              </Div>
              <Div>
                <Span>
                  <PiBatteryHighFill size={20} />
                </Span>
                3240
              </Div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <img src={product.image} className="w-40 h-32 object-cover" />
            <div className="flex items-center gap-2">
              <Color />
              <Color />
              <Color />
            </div>
            <section className="flex items-center gap-4">
              <div className="bg-red-600 text-sm text-white rounded-md p-1">
                {En_To_Fa(`${product.discount}`)}%
              </div>
              <div className="flex flex-col items-center gap-2 text-sm md:text-base font-semibold">
                {/* Product Price Discount  */}
                {product.discount && (
                  <div className="text-red-600 flex gap-1">
                    <span>
                      {En_To_Fa(
                        `${(
                          product.price -
                          product.price * (product.discount / 100)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      )}
                    </span>
                    تومان
                  </div>
                )}

                {/* Product Price  */}
                <div
                  className={`flex gap-1 ${
                    product.discount && "text-gray-500"
                  }`}
                >
                  <span className={`${product.discount && "line-through"}`}>
                    {En_To_Fa(
                      `${product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    )}
                  </span>
                  {!product.discount && "تومان"}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div
          className={`flex justify-between items-center text-xs sm:text-base border-b-4 rounded w-full sm:w-3/4 text-red-600 border-red-600 ${
            !product.discount && "invisible"
          }`}
        >
          <span>تخفیف</span>
          <Timer hours={product.time ? product.time : 0} />
        </div>
        <div className="flex gap-4 pb-4 border-b">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <strong className="text-sm font-semibold text-gray-800 leading-6">
                {product.name}
              </strong>
              <span className="flex gap-1 items-center justify-end text-sm font-semibold">
                <FaStar color="orange" />
                {En_To_Fa(`4.5`)}
              </span>
            </div>

            <div className="flex justify-around">
              <Div>
                <Span>
                  <BiSolidMemoryCard size={20} />
                </Span>
                128GB
              </Div>
              <Div>
                <Span>
                  <MdOutlineScreenshot size={20} />
                </Span>
                6.1
              </Div>
              <Div>
                <Span>
                  <IoCameraOutline size={20} />
                </Span>
                12
              </Div>
              <Div>
                <Span>
                  <PiBatteryHighFill size={20} />
                </Span>
                3240
              </Div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <img src={product.image} className="w-40 h-32 object-cover" />
            <div className="flex items-center gap-2">
              <Color />
              <Color />
              <Color />
            </div>
            <section className="flex items-center gap-4">
              <div className="bg-red-600 text-sm text-white rounded-md p-1">
                {En_To_Fa(`${product.discount}`)}%
              </div>
              <div className="flex flex-col items-center gap-2 text-sm md:text-base font-semibold">
                {/* Product Price Discount  */}
                {product.discount && (
                  <div className="text-red-600 flex gap-1">
                    <span>
                      {En_To_Fa(
                        `${(
                          product.price -
                          product.price * (product.discount / 100)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      )}
                    </span>
                    تومان
                  </div>
                )}

                {/* Product Price  */}
                <div
                  className={`flex gap-1 ${
                    product.discount && "text-gray-500"
                  }`}
                >
                  <span className={`${product.discount && "line-through"}`}>
                    {En_To_Fa(
                      `${product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    )}
                  </span>
                  {!product.discount && "تومان"}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div
          className={`flex justify-between items-center text-xs sm:text-base border-b-4 rounded w-full sm:w-3/4 text-red-600 border-red-600 ${
            !product.discount && "invisible"
          }`}
        >
          <span>تخفیف</span>
          <Timer hours={product.time ? product.time : 0} />
        </div>
        <div className="flex gap-4 pb-4 border-b">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <strong className="text-sm font-semibold text-gray-800 leading-6">
                {product.name}
              </strong>
              <span className="flex gap-1 items-center justify-end text-sm font-semibold">
                <FaStar color="orange" />
                {En_To_Fa(`4.5`)}
              </span>
            </div>

            <div className="flex justify-around">
              <Div>
                <Span>
                  <BiSolidMemoryCard size={20} />
                </Span>
                128GB
              </Div>
              <Div>
                <Span>
                  <MdOutlineScreenshot size={20} />
                </Span>
                6.1
              </Div>
              <Div>
                <Span>
                  <IoCameraOutline size={20} />
                </Span>
                12
              </Div>
              <Div>
                <Span>
                  <PiBatteryHighFill size={20} />
                </Span>
                3240
              </Div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <img src={product.image} className="w-40 h-32 object-cover" />
            <div className="flex items-center gap-2">
              <Color />
              <Color />
              <Color />
            </div>
            <section className="flex items-center gap-4">
              <div className="bg-red-600 text-sm text-white rounded-md p-1">
                {En_To_Fa(`${product.discount}`)}%
              </div>
              <div className="flex flex-col items-center gap-2 text-sm md:text-base font-semibold">
                {/* Product Price Discount  */}
                {product.discount && (
                  <div className="text-red-600 flex gap-1">
                    <span>
                      {En_To_Fa(
                        `${(
                          product.price -
                          product.price * (product.discount / 100)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      )}
                    </span>
                    تومان
                  </div>
                )}

                {/* Product Price  */}
                <div
                  className={`flex gap-1 ${
                    product.discount && "text-gray-500"
                  }`}
                >
                  <span className={`${product.discount && "line-through"}`}>
                    {En_To_Fa(
                      `${product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    )}
                  </span>
                  {!product.discount && "تومان"}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div
          className={`flex justify-between items-center text-xs sm:text-base border-b-4 rounded w-full sm:w-3/4 text-red-600 border-red-600 ${
            !product.discount && "invisible"
          }`}
        >
          <span>تخفیف</span>
          <Timer hours={product.time ? product.time : 0} />
        </div>
        <div className="flex gap-4 pb-4 border-b">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <strong className="text-sm font-semibold text-gray-800 leading-6">
                {product.name}
              </strong>
              <span className="flex gap-1 items-center justify-end text-sm font-semibold">
                <FaStar color="orange" />
                {En_To_Fa(`4.5`)}
              </span>
            </div>

            <div className="flex justify-around">
              <Div>
                <Span>
                  <BiSolidMemoryCard size={20} />
                </Span>
                128GB
              </Div>
              <Div>
                <Span>
                  <MdOutlineScreenshot size={20} />
                </Span>
                6.1
              </Div>
              <Div>
                <Span>
                  <IoCameraOutline size={20} />
                </Span>
                12
              </Div>
              <Div>
                <Span>
                  <PiBatteryHighFill size={20} />
                </Span>
                3240
              </Div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <img src={product.image} className="w-40 h-32 object-cover" />
            <div className="flex items-center gap-2">
              <Color />
              <Color />
              <Color />
            </div>
            <section className="flex items-center gap-4">
              <div className="bg-red-600 text-sm text-white rounded-md p-1">
                {En_To_Fa(`${product.discount}`)}%
              </div>
              <div className="flex flex-col items-center gap-2 text-sm md:text-base font-semibold">
                {/* Product Price Discount  */}
                {product.discount && (
                  <div className="text-red-600 flex gap-1">
                    <span>
                      {En_To_Fa(
                        `${(
                          product.price -
                          product.price * (product.discount / 100)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      )}
                    </span>
                    تومان
                  </div>
                )}

                {/* Product Price  */}
                <div
                  className={`flex gap-1 ${
                    product.discount && "text-gray-500"
                  }`}
                >
                  <span className={`${product.discount && "line-through"}`}>
                    {En_To_Fa(
                      `${product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    )}
                  </span>
                  {!product.discount && "تومان"}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div
          className={`flex justify-between border-y items-center text-xs sm:text-base border-b-4 rounded w-full sm:w-3/4 text-red-600 border-red-600 ${
            !product.discount && "invisible"
          }`}
        >
          <span>تخفیف</span>
          <Timer hours={product.time ? product.time : 0} />
        </div>
        <div className="flex gap-4 pb-4 border-b">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <strong className="text-sm font-semibold text-gray-800 leading-6">
                {product.name}
              </strong>
              <span className="flex gap-1 items-center justify-end text-sm font-semibold">
                <FaStar color="orange" />
                {En_To_Fa(`4.5`)}
              </span>
            </div>

            <div className="flex justify-around">
              <Div>
                <Span>
                  <BiSolidMemoryCard size={20} />
                </Span>
                128GB
              </Div>
              <Div>
                <Span>
                  <MdOutlineScreenshot size={20} />
                </Span>
                6.1
              </Div>
              <Div>
                <Span>
                  <IoCameraOutline size={20} />
                </Span>
                12
              </Div>
              <Div>
                <Span>
                  <PiBatteryHighFill size={20} />
                </Span>
                3240
              </Div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <img src={product.image} className="w-40 h-32 object-cover" />
            <div className="flex items-center gap-2">
              <Color />
              <Color />
              <Color />
            </div>
            <section className="flex items-center gap-4">
              <div className="bg-red-600 text-sm text-white rounded-md p-1">
                {En_To_Fa(`${product.discount}`)}%
              </div>
              <div className="flex flex-col items-center gap-2 text-sm md:text-base font-semibold">
                {/* Product Price Discount  */}
                {product.discount && (
                  <div className="text-red-600 flex gap-1">
                    <span>
                      {En_To_Fa(
                        `${(
                          product.price -
                          product.price * (product.discount / 100)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      )}
                    </span>
                    تومان
                  </div>
                )}

                {/* Product Price  */}
                <div
                  className={`flex gap-1 ${
                    product.discount && "text-gray-500"
                  }`}
                >
                  <span className={`${product.discount && "line-through"}`}>
                    {En_To_Fa(
                      `${product.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    )}
                  </span>
                  {!product.discount && "تومان"}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductListPage;

const Div = tw.div`
  flex flex-col items-center gap-2 text-black text-[11px]
`;

const Span = tw.span`
  text-gray-400
`;

const Color = tw.div`
  w-2 h-2 bg-yellow-500 rounded-full border
`;
