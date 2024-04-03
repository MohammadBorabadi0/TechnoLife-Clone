import PopularMobiles from "../PopularCategories/PopularMobiles";
import ProductList from "../ProductList/ProductList";
import HeadPhoneBanner from "./HeadPhoneBanner";

const HeadPhoneSection = () => {
  return (
    <div className="flex flex-col gap-16">
      <HeadPhoneBanner />
      <ProductList />
      <PopularMobiles />
    </div>
  );
};

export default HeadPhoneSection;
