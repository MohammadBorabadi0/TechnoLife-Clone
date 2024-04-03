import Banner from "../models/Banner.js";
import asyncHandler from "../middlewares/async.js";

const getAllBanners = asyncHandler(async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const createBanner = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    const { label } = req.body;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "لطفا تصویر را وارد کنید" });
    }

    if (label.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "لطفا نام بنر را وارد کنید" });
    }
    const newBanner = new Banner({ imageUrl: file.filename, name: label });
    await newBanner.save();
    res.status(201).json({
      success: true,
      data: newBanner,
      message: "بنر با موفقیت ایجاد شد",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const deleteBanner = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({ _id: id });

    if (!banner) {
      return res
        .status(404)
        .json({ succses: false, message: "بنری با این مشخصات پیدا نشد" });
    }

    await banner.remove();

    res.status(200).json({ success: true, message: "بنر با موفقیت حذف شد" });
  } catch (error) {
    res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const deleteAllBanners = asyncHandler(async (req, res) => {
  try {
    await Banner.deleteMany();
    return res
      .status(200)
      .json({ success: true, message: "همه بنر ها با موفقیت حذف شدند" });
  } catch (error) {
    res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

export { getAllBanners, createBanner, deleteBanner, deleteAllBanners };
