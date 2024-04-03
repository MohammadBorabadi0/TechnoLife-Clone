import { useOrderStore } from "@/store/store";
import { useEffect } from "react";
import { BsBoxSeam } from "react-icons/bs";
import OrderItem from "./OrderItem";

const LatestOrders = () => {
  const { myOrders, fetchMyOrders } = useOrderStore((state) => state);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 mt-8">
        <BsBoxSeam size={25} className="text-yellow-custom" />
        <h4 className="text-lg text-black font-semibold">آخرین سفارش ها</h4>
      </div>

      <section className="flex flex-col gap-12">
        {myOrders && myOrders.length > 0 ? (
          myOrders
            ?.slice(0, 5)
            ?.map((order, index) => (
              <OrderItem key={order._id} index={index + 1} order={order} />
            ))
        ) : (
          <div className="flex justify-center items-center h-32 bg-[#f6f6f6] p-5 rounded-lg">
            <p>موردی برای نمایش وجود ندارد.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default LatestOrders;
