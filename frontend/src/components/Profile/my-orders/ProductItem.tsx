import { useProductStore } from "@/store/store";
import { En_To_Fa } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";

interface IProps {
  item: {
    product: string;
    quantity: number;
    price: number;
    discount: number;
    color: string;
  };
}

const ProductItem: FC<IProps> = ({ item }) => {
  const { products, fetchProducts } = useProductStore((state) => state);

  const product = products.find((p) => p._id === item.product);
  const findImage = product?.images.find((i) => i.color === item.color);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (product && findImage)
    return (
      <div className="flex items-end gap-3 pb-3">
        <Link href={`/product/${product._id}`}>
          <Image
            src={findImage?.file}
            alt={product.name}
            width={150}
            height={150}
            className="min-w-[120px] object-cover"
          />
        </Link>
        <span className="text-sm">{En_To_Fa(`${item.quantity}`)}</span>
      </div>
    );
};

export default ProductItem;
