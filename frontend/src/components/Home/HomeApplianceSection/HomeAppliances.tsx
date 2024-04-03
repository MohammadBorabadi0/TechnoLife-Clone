import ProductList from "../ProductList/ProductList";
import HomeApplianceBanner from "./HomeApplianceBanner";

const HomeAppliances = () => {
  return (
    <section className="flex flex-col gap-16">
      <HomeApplianceBanner />
      <ProductList />
    </section>
  );
};

export default HomeAppliances;
