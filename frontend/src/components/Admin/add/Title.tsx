import { FC } from "react";
import Progress from "./Progress";

interface IProps {
  title: string;
  step: number;
  activeStep: number;
}

const Title: FC<IProps> = ({ title, step, activeStep }) => {
  return (
    <div className="flex justify-between border-b items-center gap-10 p-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <Progress step={step} activeStep={activeStep} />
    </div>
  );
};

export default Title;
