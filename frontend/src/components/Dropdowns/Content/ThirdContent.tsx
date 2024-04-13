import { En_To_Fa } from "@/utils/functions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const mobileData = [
  { name: "گوشی تا 2 میلیون تومان", value: 2 },
  { name: "گوشی تا 4 میلیون تومان", value: 4 },
  { name: "گوشی تا 7 میلیون تومان", value: 7 },
  { name: "گوشی تا 15 میلیون تومان", value: 15 },
  { name: "گوشی تا 25 میلیون تومان", value: 25 },
  { name: "گوشی تا 40 میلیون تومان", value: 40 },
];

const tabletData = [
  { name: "تبلت تا 20 میلیون تومان", value: 20 },
  { name: "تبلت تا 40 میلیون تومان", value: 40 },
  { name: "تبلت تا 60 میلیون تومان", value: 60 },
  { name: "تبلت تا 80 میلیون تومان", value: 80 },
];

const laptopData = [
  { name: "لپ تاپ تا 20 میلیون تومان", value: 20 },
  { name: "لپ تاپ تا 40 میلیون تومان", value: 40 },
  { name: "لپ تاپ تا 60 میلیون تومان", value: 60 },
  { name: "لپ تاپ تا 80 میلیون تومان", value: 80 },
];

const headPhoneData = [
  { name: "هدفون تا 2 میلیون تومان", value: 2 },
  { name: "هدفون تا 4 میلیون تومان", value: 4 },
  { name: "هدفون تا 6 میلیون تومان", value: 6 },
  { name: "هدفون تا 8 میلیون تومان", value: 8 },
  { name: "هدفون تا 10 میلیون تومان", value: 10 },
];

const handsfreeData = [
  { name: "هدفون تا 2 میلیون تومان", value: 2 },
  { name: "هدفون تا 4 میلیون تومان", value: 4 },
  { name: "هدفون تا 6 میلیون تومان", value: 6 },
  { name: "هدفون تا 8 میلیون تومان", value: 8 },
  { name: "هدفون تا 10 میلیون تومان", value: 10 },
];

const watchData = [
  { name: "ساعت تا 3 میلیون تومان", value: 3 },
  { name: "ساعت تا 5 میلیون تومان", value: 5 },
];

const speakerData = [
  { name: "هدفون تا 5 میلیون تومان", value: 5 },
  { name: "هدفون تا 10 میلیون تومان", value: 10 },
  { name: "هدفون تا 15 میلیون تومان", value: 15 },
  { name: "هدفون تا 20 میلیون تومان", value: 20 },
];

interface IProps {
  categoryName: string;
}

const ThirdContent: FC<IProps> = ({ categoryName }) => {
  return (
    <div className="text-sm">
      {categoryName === "گوشی موبایل" && (
        <ul>
          {mobileData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              <Link
                href={{
                  pathname: `/product/list/تمامی-${categoryName}-ها`,
                  query: { pto: `${item.value}000000`, pfrom: 0 },
                }}
              >
                {En_To_Fa(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {categoryName === "تبلت" && (
        <ul>
          {tabletData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              <Link
                href={{
                  pathname: `/product/list/تمامی-${categoryName}-ها`,
                  query: { pto: `${item.value}000000`, pfrom: 0 },
                }}
              >
                {En_To_Fa(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {categoryName === "لپ تاپ" && (
        <ul>
          {laptopData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              <Link
                href={{
                  pathname: `/product/list/تمامی-${categoryName}-ها`,
                  query: { pto: `${item.value}000000`, pfrom: 0 },
                }}
              >
                {En_To_Fa(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {categoryName === "هدفون" && (
        <ul>
          {headPhoneData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              <Link
                href={{
                  pathname: `/product/list/تمامی-${categoryName}-ها`,
                  query: { pto: `${item.value}000000`, pfrom: 0 },
                }}
              >
                {En_To_Fa(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {categoryName === "هندزفری" && (
        <ul>
          {handsfreeData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              <Link
                href={{
                  pathname: `/product/list/تمامی-${categoryName}-ها`,
                  query: { pto: `${item.value}000000`, pfrom: 0 },
                }}
              >
                {En_To_Fa(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {categoryName === "اسپیکر" && (
        <ul>
          {speakerData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              <Link
                href={{
                  pathname: `/product/list/تمامی-${categoryName}-ها`,
                  query: { pto: `${item.value}000000`, pfrom: 0 },
                }}
              >
                {En_To_Fa(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {categoryName === "ساعت هوشمند" && (
        <ul>
          {watchData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              <Link
                href={{
                  pathname: `/product/list/تمامی-${categoryName}-ها`,
                  query: { pto: `${item.value}000000`, pfrom: 0 },
                }}
              >
                {En_To_Fa(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThirdContent;
