import { useColorStore, useProductStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import { IOrder } from "@/utils/type";
import Image from "next/image";
import React, { FC, useEffect } from "react";

interface IProps {
  item: {
    product: string;
    quantity: number;
    price: number;
    discount: number;
    color: string;
  };
  order: IOrder;
}

const OrderItem: FC<IProps> = ({ item, order }) => {
  const { products, fetchProducts } = useProductStore((state) => state);
  const { colors, fetchColors } = useColorStore((state) => state);

  //   Find Product In Cart Item
  const product = products.find((product) => product._id === item.product);

  const findImage = product?.images.find((image) => image.color === item.color);
  const findColor = colors.find((color) => color._id === item.color);

  useEffect(() => {
    fetchProducts();
    fetchColors();
  }, []);

  return (
    <section className="flex flex-col items-center gap-5">
      {findImage && (
        <>
          <Image
            src={findImage.file}
            alt={product?.name || ""}
            width={200}
            height={200}
            className="w-32 object-cover"
          />
          <div className="flex items-center gap-2">
            <span
              className="grid place-items-center w-5 h-5 border rounded"
              style={{ backgroundColor: findColor?.code }}
            ></span>
            <p className="grid place-items-center w-6 h-6 border rounded text-xs">
              {En_To_Fa(`${item.quantity}`)}
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default OrderItem;
