import { ratingItems } from "@/data/data";
import { useModal, useProductReview, useStore } from "@/store/store";
import { ProductData } from "@/utils/type";
import Image from "next/image";
import React, { FC, FormEvent, useState } from "react";
import { BiMinus, BiPlus, BiTrashAlt } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface IProps {
  product: ProductData;
}

const AddCommentForm: FC<IProps> = ({ product }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const [positivePoint, setPositivePoint] = useState("");
  const [negativePoint, setNegativePoint] = useState("");
  const [positivePoints, setPositivePoints] = useState<
    { id: number; positivePoint: string }[]
  >([]);
  const [negativePoints, setNegativePoints] = useState<
    { id: number; negativePoint: string }[]
  >([]);

  // store
  const { setShowAddCommentModal } = useModal((state) => state);
  const { activeIndex } = useStore((state) => state);
  const { addReview } = useProductReview((state) => state);

  const handleAddPositivePoint = (e: FormEvent) => {
    e.preventDefault();
    if (positivePoint.length > 1) {
      setPositivePoints((prev) => [
        ...prev,
        { id: new Date().getTime(), positivePoint },
      ]);
      setPositivePoint("");
    }
  };

  const handleRemovePositivePoint = (id: number) => {
    setPositivePoints((prev) => prev.filter((point) => point.id !== id));
  };

  const handleAddNegativePoint = (e: FormEvent) => {
    e.preventDefault();
    if (negativePoint.length > 1) {
      setNegativePoints((prev) => [
        ...prev,
        { id: new Date().getTime(), negativePoint },
      ]);
      setNegativePoint("");
    }
  };

  const handleRemoveNegativePoint = (id: number) => {
    setNegativePoints((prev) => prev.filter((point) => point.id !== id));
  };

  // Handle Add Product Review
  const handleAddReview = async () => {
    try {
      if (product && product._id && rating) {
        const positivePointsString = positivePoints
          .map((item) => item.positivePoint)
          .join(", ");
        const negativePointsString = negativePoints
          .map((item) => item.negativePoint)
          .join(", ");

        await addReview(
          product._id,
          rating,
          comment,
          positivePointsString,
          negativePointsString
        );
        setShowAddCommentModal(false);
        window.location.href = window.location.href;
      }
    } catch (error) {
      setShowAddCommentModal(false);
      console.log(error);
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-sm bg-opacity-50">
      <div className="bg-white rounded-lg h-[90vh] w-[464px] overflow-hidden">
        {/* Modal Title  */}
        <div className="flex items-center justify-between border-b-2 overflow-hidden p-5 m-5 text-lg">
          <h2>افزودن نظر</h2>
          <button onClick={() => setShowAddCommentModal(false)}>
            <IoIosCloseCircleOutline size={30} />
          </button>
        </div>

        <section className="overflow-y-auto p-5 m-2 h-[calc(75vh-1rem)]">
          {/* Name & Image */}
          <div className="flex items-center gap-4 shadow-3xl rounded-lg p-4 leading-8">
            {product.images && (
              <Image
                src={product.images[activeIndex].file}
                alt={product.name}
                title={product.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover"
              />
            )}
            <h4>{product.name}</h4>
          </div>

          {/* Rating  */}
          <div className="flex flex-col gap-5 my-8">
            <span className="flex justify-center flex-1 text-black">
              <span className="text-red-600">*</span> به این کالا امتیاز دهید :)
            </span>
            <div className="flex gap-3 px-5">
              {/* Rating Item  */}
              {ratingItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setRating(item.id)}
                  className={`flex flex-1 flex-col gap-2 justify-center items-center select-none ${
                    rating === item.id ? "opacity-100" : "opacity-40"
                  } border-2 px-2 py-3 rounded-lg`}
                  style={{
                    borderColor: rating === item.id ? item.borderColor : "",
                    backgroundColor: rating === item.id ? item.bgColor : "",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`${item.text} icon`}
                    width={35}
                    height={35}
                  />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div>
              <p>نظر خود را در مورد این محصول بنویسید.</p>
              <div className="flex flex-col gap-5 mt-10">
                <textarea
                  placeholder="* توضیحات"
                  className="border resize-none w-full py-5 px-4 h-28 focus:border-none focus:outline-none focus:ring-2 focus:ring-yellow-700 rounded-lg"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <form
                  onSubmit={handleAddPositivePoint}
                  className="flex items-center justify-between border overflow-hidden rounded-lg h-16 focus:border-2 focus-within:border-yellow-700 focus-within:border-2"
                >
                  <input
                    type="text"
                    placeholder="نکات مثبت"
                    className="h-full flex-1 px-5 outline-none"
                    value={positivePoint}
                    onChange={(e) => setPositivePoint(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`flex items-center gap-1 pl-5 ${
                      positivePoint.length > 1
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    <span>ثبت</span>
                    <BiPlus size={16} />
                  </button>
                </form>

                {/* PositivePoints  */}

                {positivePoints.length > 0 &&
                  positivePoints.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <BiPlus size={20} className="text-green-600" />
                        <span>{item.positivePoint}</span>
                      </div>
                      <button
                        onClick={() => handleRemovePositivePoint(item.id)}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xs mt-1">حذف</span>
                        <BiTrashAlt size={18} />
                      </button>
                    </div>
                  ))}

                <form
                  onSubmit={handleAddNegativePoint}
                  className="flex items-center justify-between border overflow-hidden rounded-lg h-16 focus:border-2 focus-within:border-yellow-700 focus-within:border-2"
                >
                  <input
                    type="text"
                    placeholder="نکات منفی"
                    className="h-full flex-1 px-5 outline-none"
                    value={negativePoint}
                    onChange={(e) => setNegativePoint(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`flex items-center gap-1 pl-5 ${
                      negativePoint.length > 1
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    <span>ثبت</span>
                    <BiPlus size={16} />
                  </button>
                </form>

                {/* Negative Points  */}

                {negativePoints.length > 0 &&
                  negativePoints.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <BiMinus size={20} className="text-red-600" />
                        <span>{item.negativePoint}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveNegativePoint(item.id)}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xs mt-1">حذف</span>
                        <BiTrashAlt size={18} />
                      </button>
                    </div>
                  ))}

                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-xs px-1">
                    با "ثبت نظر" موافقت خود را با{" "}
                    <span className="text-sm text-blue-600 underline">
                      قوانین انتشار نظرات
                    </span>{" "}
                    در تکنولایف اعلام می کنم
                  </p>
                  <button
                    className="w-full bg-blue-600 text-white p-4 rounded-lg"
                    onClick={handleAddReview}
                  >
                    ثبت نظر
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCommentForm;
