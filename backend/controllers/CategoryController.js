import asyncHandler from '../middlewares/async.js';
import Category from '../models/Category.js';

const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        return res.status(500)
            .json({ success: false, message: 'مشکلی در ارتباط با سرور به وجود آمد' });
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOne({ _id: id });
        if (!category) {
            return res.status(404)
                .json({ success: false, message: 'دسته بندی با این مشخصات پیدا نشد' })
        }

        return res.status(200).json({ success: true, data: category });

    } catch (error) {
        return res.status(500)
            .json({ success: false, message: 'مشکلی در ارتباط با سرور به وجود آمد' });
    }
});

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400)
                .json({ success: false, message: 'مقدار نام را وارد کنید' })
        }

        const findCategory = await Category.findOne({ name });

        if (findCategory) {
            // throw new Error('دسته بندی از قبل وجود دارد')
            return res.json({ success: false, message: 'دسته بندی با همین نام از قبل وجود دارد' });
        }

        const newCategory = await Category.create({ name });

        return res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ success: false, message: 'مشکلی در ارتباط با سرور به وجود آمد' });
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await Category.findOne({ _id: id });

        if (!category) {
            return res.status(404)
                .json({ success: false, message: 'دسته بندی با این مشخصات پیدا نشد' })
        }

        category.name = name || category.name;

        await category.save();

        return res.status(200)
            .json({ success: true, message: 'ویرایش با موفقیت انجام شد', data: category });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'مشکلی در ارتباط با سرور پیش آمد' })
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Delete Category', category });
});

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };