import { FC } from "react";

interface IProps {
  title: string;
}

const SectionTitle: FC<IProps> = ({ title }) => {
  return (
    <div
      className="bg-blue-50 text-slate-800 text-lg font-semibold py-3 px-4 rounded-lg"
    >
      {title}
    </div>
  );
};

export default SectionTitle;
