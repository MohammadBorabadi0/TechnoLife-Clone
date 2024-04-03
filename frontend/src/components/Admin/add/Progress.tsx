import { FC } from "react";

interface IProps {
  step: number;
  activeStep: number;
}

const Progress: FC<IProps> = ({ step, activeStep }) => {
  return (
    <div className="bg-purple-50 px-4 py-2 flex gap-1 w-fit h-fit rounded-lg">
      {[...Array(step)].map((_, index) => (
        <span
          key={index + 1}
          className={`w-4 h-1 ${
            index + 1 <= activeStep ? "bg-purple-600" : "bg-purple-200"
          } block rounded`}
        ></span>
      ))}
    </div>
  );
};

export default Progress;
