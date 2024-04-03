import ProductList from "../ProductList/ProductList";
import AccessoriesBanner from "./AccessoriesBanner";

const Accessories = () => {
  return (
    <section className="flex flex-col gap-16">
      <AccessoriesBanner />
      <ProductList />
    </section>
  );
};

export default Accessories;
