import { En_To_Fa } from "../../utils/functions";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-12 text-lg">
      <div className="flex flex-col gap-5">
        {/* Orders Section */}
        <h2 className="text-xl">سفارشات</h2>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex flex-col gap-5 items-center p-5 rounded-xl shadow-md bg-white">
            <span>امروز</span>
            <span>{En_To_Fa("2")}</span>
            <span>تعداد سفارشات امروز</span>
          </div>
          <div className="flex flex-col gap-5 items-center p-5 rounded-xl shadow-md bg-white">
            <span>هفته</span>
            <span>{En_To_Fa("10")}</span>
            <span>تعداد سفارشات این هفته </span>
          </div>
          <div className="flex flex-col gap-5 items-center p-5 rounded-xl shadow-md bg-white">
            <span>ماه</span>
            <span>{En_To_Fa("20")}</span>
            <span>تعداد سفارشات این ماه</span>
          </div>
        </section>
      </div>
      <div className="flex flex-col gap-5">
        {/* Orders Section */}
        <h2 className="text-xl">درآمد</h2>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex flex-col gap-5 items-center p-5 rounded-xl shadow-md bg-white">
            <span>امروز</span>
            <span>{En_To_Fa("250000")} تومان</span>
            <span>درآمد امروز</span>
          </div>
          <div className="flex flex-col gap-5 items-center p-5 rounded-xl shadow-md bg-white">
            <span>هفته</span>
            <span>{En_To_Fa("1000000")} تومان</span>
            <span>درآمد این هفته</span>
          </div>
          <div className="flex flex-col gap-5 items-center p-5 rounded-xl shadow-md bg-white">
            <span>ماه</span>
            <span>{En_To_Fa("50000000")} تومان</span>
            <span>درآمد این ماه</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
