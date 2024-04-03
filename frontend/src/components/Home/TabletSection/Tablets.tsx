import PopularMobiles from "../PopularCategories/PopularMobiles";
import ProductList from "../ProductList/ProductList";
import TabletBanner from "./TabletBanner";

const Tablets = () => {
  return (
    <section className="flex flex-col gap-16">
      <TabletBanner />
      <ProductList />
      <PopularMobiles />
    </section>
  );
};

export default Tablets;
