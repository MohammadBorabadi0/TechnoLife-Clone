import { En_To_Fa } from "@/utils/functions";
import tw from "tailwind-styled-components";
import { FC, useState } from "react";
import { IOrder } from "@/utils/type";

interface ItemProps {
  active: boolean;
  onClick: () => void;
}

interface TabProps {
  handleFilterOrders: (status: string) => void;
  orders: IOrder[] | null;
}

const Tab: FC<TabProps> = ({ orders, handleFilterOrders }) => {
  const [activeItem, setActiveItem] = useState<number>(0);

  // Handle Active Tab
  const handleItemClick = (index: number, status: string) => {
    setActiveItem(index);
    handleFilterOrders(status);
  };

  // Get Status Length
  const getStatusCount = (status: string) =>
    orders
      ? En_To_Fa(
          orders
            .filter(
              (order) => order.paymentResult.status.toLowerCase() === status
            )
            .length.toString()
        )
      : "";

  // Tab Items
  const tabItems = [
    { status: "awaiting payment", label: "در انتظار پرداخت" },
    { status: "processing", label: "در حال پردازش" },
    { status: "delivered", label: "تحویل شده" },
    { status: "returned", label: "مرجوعی" },
    { status: "canceled and suspended", label: "لغو شده و معلق" },
  ];

  return (
    orders && (
      <div className="flex justify-center items-center text-sm">
        <div className="flex w-fit border rounded-r-lg rounded-l-lg overflow-x-auto no-scrollbar lg:overflow-hidden">
          {tabItems.map((item, index) => (
            <Item
              key={index}
              active={activeItem === index}
              onClick={() => handleItemClick(index, item.status)}
            >
              <p>{item.label}</p>
              <span>{getStatusCount(item.status)}</span>
            </Item>
          ))}
        </div>
      </div>
    )
  );
};

const Item = tw.div<ItemProps>`
  flex flex-col items-center lg:gap-2 px-5 lg:px-10 py-1 border-l last:border-l-0 cursor-pointer whitespace-nowrap select-none transition-all duration-200
  ${(props) => props.active && "bg-slate-600 text-white"}
`;

export default Tab;
