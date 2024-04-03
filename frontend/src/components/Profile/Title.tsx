import { FC } from "react";

interface IProps {
  title: string;
}

const Title: FC<IProps> = ({ title }) => {
  return (
    <>
      {/* Title */}
      <div className="border-b">
        <h2 className="border-b-[3px] border-red-500 font-semibold w-fit pb-2">
          {title}
        </h2>
      </div>
    </>
  );
};

export default Title;
