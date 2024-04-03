import { FC } from "react";
import { BiPlus } from "react-icons/bi";

interface IProps {
  item: { id: number; name: string };
  // sendCompanyIndex: number;
}

const CompanyOption: FC<IProps> = ({ item }) => {
    return (
      <div className="flex flex-col gap-4 bg-[#f6f6f6] border rounded-lg py-4">
        <div className="flex gap-2 relative pl-3 pr-7">
          <BiPlus size={20} className="absolute right-1 mt-1" />
          <p>
            بعد از تحویل سفارش به {item.name}، کد پیگیری مرسوله برای شما ارسال
            خواهد شد و می‌توانید وضعیت مرسوله خود را از {item.name} پیگیری کنید.
            (زمان تحویل کالا به شما، با توجه به قوانین {item.name} خواهد بود.)
          </p>
        </div>
        <div className="flex gap-2 relative pl-3 pr-7">
          <BiPlus size={20} className="absolute right-1 mt-1" />
          <p className="text-black font-semibold">
            هزینه بسته بندی و ارسال شامل تعرفه {item.name} نیز می‌باشد.
          </p>
        </div>
        <div className="flex gap-2 relative pl-3 pr-7">
          <BiPlus size={20} className="absolute right-1 mt-1" />
          <p className="text-black font-semibold">
            کارت شناسایی ارائه شده هنگام دریافت کالا باید با اطلاعات وارد شده در
            سایت (گیرنده سفارش)، مطابقت داشته باشد.
          </p>
        </div>
      </div>
    );
};

export default CompanyOption;
