interface InputValues {
  [key: string]: string | number;
}

export const calculateActiveStep = (values: InputValues) => {
  const newStep = Object.values(values).filter((value) => {
    if (typeof value === "string") {
      return (value as string).trim() !== "";
    } else {
      return value > 0;
    }
  }).length;
  return newStep;
};
