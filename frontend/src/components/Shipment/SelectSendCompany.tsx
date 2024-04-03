import { sendCompanyData } from "@/data/data";
import SendCompanyOption from "./SendCompanyOption";

const SelectSendCompany = () => {
  return (
    <div className="flex flex-col gap-5 mx-4 lg:mx-0">
      {sendCompanyData.map((item, index) => (
        <SendCompanyOption key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default SelectSendCompany;
