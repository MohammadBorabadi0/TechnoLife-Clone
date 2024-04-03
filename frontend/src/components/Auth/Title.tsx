import { FC } from "react";

interface IProps {
  title: string;
}

const Title: FC<IProps> = ({ title }) => {
  return (
    <div className="flex flex-col gap-8 items-center mb-10">
      <h2 className="logo text-3xl whitespace-nowrap">
        <span className="text-yellow-600">Easy</span> Shop
      </h2>
      <h2 className="text-xl">{title}</h2>
    </div>
  );
};

export default Title;
