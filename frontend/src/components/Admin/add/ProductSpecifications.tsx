import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from "react";
import Title from "./Title";
import Input from "./Input";
import { initialSpecifications } from "@/data/data";

interface IProps {
  cpu: string; gpu: string; os: string; ram: string; memory: string; screenSize: string; screenType: string; mainCamera: string; selfieCamera: string; battery: string; sensors: string; connectionType: string; bluetooth: string; weight: string; dimensions: string; outputPower: string; handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProductSpecifications: FC<IProps> = ({
  cpu, gpu, os, ram, memory, battery, bluetooth, connectionType, dimensions, mainCamera, selfieCamera, sensors, weight, outputPower, screenSize, screenType, handleChange
}) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const inputValues = [
      cpu, gpu, os, ram, memory, battery, bluetooth, connectionType, screenSize, screenType, dimensions, mainCamera, selfieCamera, sensors, weight, outputPower, handleChange
    ];
    const newStep = inputValues.filter((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
    }).length;
    setActiveStep(newStep);
  }, [cpu, gpu, os, ram, memory, battery, bluetooth, connectionType, screenSize, screenType, dimensions, mainCamera, selfieCamera, sensors, weight, outputPower, handleChange]);

  return (
    <section className="flex flex-col border rounded-md shadow-sm pb-5">
      <Title title="مشخصات محصول" step={16} activeStep={activeStep} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-4">
        {initialSpecifications.map((item) => (
            <Input
              key={item.name}
              name={item.name}
              label={item.lable}
              value={eval(item.name)}
              handleChange={handleChange}
            />
        ))}
      </div>
    </section>
  );
};

export default ProductSpecifications;
