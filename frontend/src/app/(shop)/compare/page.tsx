import CompareProductsMobileScreen from "@/screens/Compare/CompareProductsMobileScreen";
import CompareProductsScreen from "@/screens/Compare/CompareProductsScreen";

const CompareProductsPage = () => {
  return (
    <div className="bg-primary text-sm xl:text-base">
      <div className="hidden lg:flex">
        <CompareProductsScreen />
      </div>
      <div className="flex lg:hidden">
        <CompareProductsMobileScreen />
      </div>
    </div>
  );
};

export default CompareProductsPage;
