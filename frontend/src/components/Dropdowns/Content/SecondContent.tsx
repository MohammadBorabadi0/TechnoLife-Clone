import { FC } from "react";

const mobileData = ["گوشی ساده", "گوشی 5G", "گوشی پرچمدار", "گوشی گیمینگ"];

const laptopData = ["لپ تاپ گیمینگ", "لپ تاپ ارزان"];

interface IProps {
  categoryName: string;
}

const SecondContent: FC<IProps> = ({ categoryName }) => {
  return (
    <div className="text-sm">
      {categoryName === "گوشی موبایل" && (
        <ul>
          {mobileData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              {item}
            </li>
          ))}
        </ul>
      )}
      {categoryName === "لپ تاپ" && (
        <ul>
          {laptopData.map((item, index) => (
            <li key={index} className="p-3 pr-0">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SecondContent;
