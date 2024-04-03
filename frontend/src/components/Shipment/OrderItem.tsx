import { useColorStore, useProductStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { ICart } from "@/utils/type";
import Image from "next/image";
import React, { FC, useEffect } from "react";

interface IProps {
  cartItem: ICart;
}

const OrderItem: FC<IProps> = ({ cartItem }) => {
  const { products, fetchProducts } = useProductStore((state) => state);
  const { colors } = useColorStore((state) => state);

  //   Find Product In Cart Item
  const product = products.find(
    (product) => product._id === cartItem.productId
  );

  //   Find Color In Cart Item
  const color = colors.find((color) => color._id === cartItem.colorId);

  const findImage = product?.images.find(
    (image) => image.color === cartItem.colorId
  );

  console.log({ findImage });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {findImage && product && (
        <Image
          src={findImage.file}
          alt={product.name}
          width={200}
          height={200}
          className="w-28 sm:min-w-[150px] object-cover"
        />
      )}
      <div className="flex gap-1">
        <span className="flex gap-1 justify-center items-center w-6 h-6 border border-yellow-custom rounded">
          {En_To_Fa(`${cartItem.quantity}`)}
        </span>
        {color && (
          <div className="flex items-center gap-2 border border-yellow-custom text-xs pr-0.5 pl-3 py-[1px] rounded">
            <span
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: color.code }}
            ></span>
            <span className="whitespace-nowrap">{color.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
