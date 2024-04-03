import asyncHandler from "../middlewares/async.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";

const getBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    return res.json({ success: true, data: brands });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const getBrandById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findOne({ _id: id });
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "برند با این مشخصات پیدا نشد" });
    }

    return res.status(200).json({ success: true, data: brand });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  console.log(req.body);

  if (!name || !category) {
    return res.status(400).json({
      success: false,
      message: "نام برند و دسته بندی مورد نظر را وارد کنید ",
    });
  }
  try {
    const isExistsCategory = await Category.findOne({ _id: category });

    if (!isExistsCategory) {
      return res
        .status(404)
        .json({ success: false, message: "دسته بندی با این مشخصات پیدا نشد" });
    }

    const createBrand = await Brand.create({
      name,
      category,
    });

    await Category.findOneAndUpdate({ _id: category }, {
        $push: { brand: createBrand }
    });

    return res.json({ message: "Create Brand", data: createBrand });
  } catch (error) {
    res.status(500).json("مشکلی بوجود آمده است. لطفا دوباره امتحان کنید.");
  }

  // try {
  //     const { name, category } = req.body;

  //     console.log(req.body);

  //     // if (!name || !category) {
  //     //     return res.status(400)
  //     //         .json({ success: false, message: 'نام برند و دسته بندی نباید خالی باشند' })
  //     // }

  //     const createBrand = await Brand.create({ name });

  //     console.log({ createBrand });

  //     await Category.findOneAndUpdate({ _id: category }, {
  //         $push: { brand: createBrand }
  //     });

  //     console.log({ createBrand2: createBrand });

  //     res.json({ message: 'برند ایجاد شد', data: createBrand });
  // } catch (error) {
  //     res.status(500).json('مشکلی بوجود آمده است. لطفا دوباره امتحان کنید.');
  // }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { name, category: categoryId } = req.body;
    const { id: brandId } = req.params;

    console.log({ body: req.body });

    // Find all categories
    const allCategories = await Category.find({});

    // Filter and update the brands in each category
    const updatedCategories = allCategories.map((category) => {
      const filteredBrands = category.brand.filter(
        (brand) => brand.toString() !== brandId
      );
      category.brand = filteredBrands;
      return category.save();
    });

    // Wait for all category updates to complete
    await Promise.all(updatedCategories);

    const brand = await Brand.findOne({ _id: brandId });

    brand.name = name || brand.name;
    brand.category = categoryId || brand.category;
    await brand.save();

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "دسته بندی با این مشخصات پیدا نشد" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      { $addToSet: { brand: brand._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Brand removed from categories successfully",
      data: { brand, updatedCategory },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing brand from categories", error });
  }
  // };
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id: brandId } = req.params;

  const allCategories = await Category.find({});

  // Filter and update the brands in each category
  const updatedCategories = allCategories.map((category) => {
    const filteredBrands = category.brand.filter(
      (brand) => brand.toString() !== brandId
    );
    category.brand = filteredBrands;
    return category.save();
  });

  // Wait for all category updates to complete
  await Promise.all(updatedCategories);

  await Brand.findByIdAndDelete(brandId);

  return res.json({ success: true, message: "Delete Brand" });
});

export { getBrands, getBrandById, createBrand, updateBrand, deleteBrand };
