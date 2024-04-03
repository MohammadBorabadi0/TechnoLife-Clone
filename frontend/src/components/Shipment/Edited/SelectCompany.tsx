import { sendCompanyData } from "@/data/data";
import SelectCompanyItem from "./SelectCompanyItem";

const SelectCompany = () => {
  return (
    <div className="flex flex-col gap-5 mx-4 lg:mx-0">
      {sendCompanyData.map((item, index) => (
        <SelectCompanyItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default SelectCompany;
