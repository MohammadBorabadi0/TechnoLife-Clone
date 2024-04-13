import { IBrand, ICategory, IColor, ProductData } from "@/utils/type";
import { ReadonlyURLSearchParams } from "next/navigation";

const filterProducts = (
  products: ProductData[],
  categories: ICategory[],
  brands: IBrand[],
  colors: IColor[],
  searchParams: ReadonlyURLSearchParams,
  decodedUrl: string,
  filteredProducts: ProductData[] | null,
  setFilteredProducts: (filteredProducts: ProductData[]) => void
) => {
  // -----------------------------------------------------------------------------------------------

  console.log({ decodedUrl });

  // -----------------------------------------------------------------------------------------------

  // Find And Brand & Category From searchParams and Database
  let findBrand: any;
  let findCategory: any;
  let updateDecodedUrl;

  switch (decodedUrl) {
    case "گوشی ساده": {
      updateDecodedUrl = "گوشی موبایل";
    }
    case "گوشی گیمینگ": {
      updateDecodedUrl = "گوشی موبایل";
    }
    case "گوشی 5G": {
      updateDecodedUrl = "گوشی موبایل";
    }
    case "گوشی پرچمدار": {
      updateDecodedUrl = "گوشی موبایل";
    }
  }

  if (decodedUrl.includes("تمامی")) {
    findCategory = categories.find(
      (category) => category.name === decodedUrl.split("-")[1]
    );
  } else {
    findBrand = brands.find((brand) => brand.name === decodedUrl.split("-")[1]);
    findCategory = categories.find(
      (category) => category.name === decodedUrl.split("-")[0]
    );
    if (updateDecodedUrl) {
      findCategory = categories.find(
        (category) => category.name === updateDecodedUrl
      );
    }
  }

  console.log({ findCategory });
  console.log({ findBrand });

  // Set Filtered Products Using useParams

  setFilteredProducts(
    products.filter((product) => {
      if (findBrand) {
        return (
          product.brand === findBrand._id &&
          product.category === findCategory._id
        );
      } else if (findCategory) {
        return product.category === findCategory._id;
      }
    })
  );

  // Set Filtered Products Using SearchParams
  const brand = searchParams.get("brand");
  const color = searchParams.get("color");
  const pto = searchParams.get("pto");
  const pfrom = searchParams.get("pfrom");

  // -----------------------------------------------------------------------

  // IF Brand is Exists In searchParams and Color is Not Exists
  if (brand && !color) {
    const splitedBrands = brand.split("_");
    const filteredBrands = brands.filter((brand) =>
      splitedBrands.includes(brand.name)
    );

    if (filteredProducts)
      setFilteredProducts(
        products.filter((product) =>
          filteredBrands.some(
            (brand) =>
              brand._id === product.brand &&
              product.category === findCategory._id
          )
        )
      );
  }

  // -----------------------------------------------------------------------

  // IF Brand And Color is Exists In searchParams
  if (brand && color) {
    const splitedBrands = brand.split("_");
    const filteredBrands = brands.filter((brand) =>
      splitedBrands.includes(brand.name)
    );

    const splitedColors = color.split("_");
    const filteredColors = colors.filter((color) =>
      splitedColors.includes(color.name)
    );

    if (filteredProducts) {
      setFilteredProducts(
        products.filter((product) => {
          return product.images.some(
            (image) =>
              filteredColors.some((color) => color._id === image.color) &&
              product.category === findCategory._id &&
              filteredBrands.some(
                (brand) =>
                  brand._id === product.brand &&
                  product.category === findCategory._id
              )
          );
        })
      );
    }
  }

  // -----------------------------------------------------------------------

  // IF Color is Exists In searchParams and Brand is Not Exists
  if (color && !brand) {
    const splitedColors = color.split("_");
    const filteredColors = colors.filter((color) =>
      splitedColors.includes(color.name)
    );

    if (filteredProducts) {
      setFilteredProducts(
        products.filter((product) => {
          return product.images.some(
            (image) =>
              filteredColors.some((color) => color._id === image.color) &&
              product.category === findCategory._id
          );
        })
      );
    }
  }

  // -------------------------------------------------------------------------------------

  console.log("HI-0");
  console.log("FindCategory", findCategory);

  // IF Pto & Pfrom & Brand is True

  if (pto && pfrom && !(brand && color)) {
    setFilteredProducts(
      products.filter((product) =>
        product.images.some(
          (item) =>
            item.price >= +pfrom &&
            item.price <= +pto &&
            product.category === findCategory._id
        )
      )
    );
  }

  if (pto && pfrom && brand && !color) {
    const splitedBrands = brand.split("_");
    const filteredBrands = brands.filter((brand) =>
      splitedBrands.includes(brand.name)
    );
    setFilteredProducts(
      products.filter((product) =>
        product.images.some(
          (item) =>
            item.price >= +pfrom &&
            item.price <= +pto &&
            product.category === findCategory._id &&
            filteredBrands.some(
              (brand) =>
                brand._id === product.brand &&
                product.category === findCategory._id
            )
        )
      )
    );
  }

  console.log("HI-1");

  // IF Pto & Pfrom & Color is True

  if (pto && pfrom && !brand && color) {
    const splitedColors = color.split("_");
    const filteredColors = colors.filter((color) =>
      splitedColors.includes(color.name)
    );

    setFilteredProducts(
      products.filter((product) =>
        product.images.some(
          (item) =>
            item.price >= +pfrom &&
            item.price <= +pto &&
            product.category === findCategory._id &&
            filteredColors.some(
              (color) =>
                color._id === item.color &&
                product.category === findCategory._id
            )
        )
      )
    );
  }

  console.log("HI-2");

  if (pto && pfrom && brand && color) {
    const splitedColors = color.split("_");
    const filteredColors = colors.filter((color) =>
      splitedColors.includes(color.name)
    );
    const splitedBrands = brand.split("_");
    const filteredBrands = brands.filter((brand) =>
      splitedBrands.includes(brand.name)
    );

    setFilteredProducts(
      products.filter((product) =>
        product.images.some(
          (item) =>
            item.price >= +pfrom &&
            item.price <= +pto &&
            filteredColors.some((color) => color._id === item.color) &&
            filteredBrands.some((brand) => brand._id === product.brand)
        )
      )
    );
  }

  // let updatedProducts;

  let updatedProducts;

  switch (decodedUrl) {
    case "گوشی ساده":
      updatedProducts = products.filter(
        (product) => product.specifications.simplePhone
      );
      break;
    case "گوشی 5G":
      updatedProducts = products.filter(
        (product) => product.specifications.fiveG
      );
      break;
    case "گوشی گیمینگ":
      updatedProducts = products.filter(
        (product) => product.specifications.gaming
      );
      break;
    case "گوشی پرچمدار":
      updatedProducts = products.filter(
        (product) => product.specifications.flagship
      );
      break;
  }

  if (updatedProducts) {
    setFilteredProducts(updatedProducts);
  }
};

export default filterProducts;
