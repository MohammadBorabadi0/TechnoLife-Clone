import { En_To_Fa, convertToPersianDate } from "@/utils/functions";
import { ProductData } from "@/utils/type";
import React, { FC, Fragment } from "react";
import { TbUserPentagon } from "react-icons/tb";
import Rating from "../Rating";
import { BiMinus, BiPlus } from "react-icons/bi";

interface IProps {
  product: ProductData;
}

const ProductComments: FC<IProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="hidden 2xl:flex items-center gap-3 p-0 lg:p-4">
        <span className="w-2 h-2 rounded-full bg-yellow-600 block"></span>
        <h4 className="text-xl font-semibold text-black">نظرات کاربران</h4>
      </div>
      <div className="flex flex-col gap-5 py-5 px-1 lg:px-7 bg-white rounded-lg">
        {/* Comment  */}

        {product.reviews?.length ? (
          product.reviews.map((review) => (
            <Fragment key={review._id}>
              <div className="flex gap-3">
                <TbUserPentagon size={18} />
                <span className="text-base">{review.name}</span>
              </div>
              <div>
                <div className="flex text-lg mb-3">
                  <Rating rating={review.rating} />
                </div>
                <p>{En_To_Fa(`${convertToPersianDate(review.createdAt)}`)}</p>
              </div>
              <div className="text-black font-semibold leading-8">
                <p>{review.comment}</p>
              </div>

              {/* Positive Points  */}

              {review.positivePoints?.trim() !== "" && (
                <ul className="flex flex-col gap-3">
                  {review.positivePoints?.split(",").map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="text-xl text-green-600">
                        <BiPlus />
                      </span>
                      <span>{point.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Negative Points  */}

              {review.negativePoints?.trim() !== "" && (
                <ul className="flex flex-col gap-3">
                  {review.negativePoints?.split(",").map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="text-xl text-red-600">
                        <BiMinus />
                      </span>
                      <span>{point.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}

              <span className="py-0.5 border-y"></span>
            </Fragment>
          ))
        ) : (
          <div className="bg-blue-50 rounded p-5">
            <div className="flex flex-col gap-3 bg-white px-8 py-5 rounded-xl">
              <p className="text-black font-semibold">برای راهنمایی دیگران درمورد این کالا نظر دهید.</p>
              <span>
                برای ثبت نظر نیاز به خرید کالا نیست؛ همچنین می‌توانید نظرتان را
                به صورت ناشناس ثبت کنید.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComments;
