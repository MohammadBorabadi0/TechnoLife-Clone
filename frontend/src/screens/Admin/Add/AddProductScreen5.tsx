'use client';

import AddImage from '@/components/Admin/add/AddImage';
import BasicInformation from '@/components/Admin/add/BasicInformation';
import ProductSpecifications from '@/components/Admin/add/ProductSpecifications';
import createFormData from '@/utils/createFormData';
import { SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { initialData, useProductStore } from '@/store/store';
import { useRouter } from 'next/navigation';

const AddProductForm: React.FC = () => {

    const { productData: product, setProductData: setProduct, addProduct } = useProductStore(state => state);
    const [showSpecifications, setShowSpecifications] = useState(false);

    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const addImage = () => {
        setProduct({
            ...product,
            images: [...product.images, { file: '', color: '', price: 0 }],
        });
    };

    const deleteImage = (index: number) => {
        const updatedImages = product.images.filter((image, i) => i !== index);
        setProduct({ ...product, images: updatedImages });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = createFormData(product, product.images);

        try {
            console.log({ product });
            addProduct(formData);
            // router.push('/admin/products');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setProduct(initialData)
    }, []);

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 m-3'>
            <div className='flex gap-5'>
                <button
                    type="button"
                    onClick={addImage}
                    className='bg-purple-700 text-white px-4 py-2 w-fit rounded'
                >افزودن تصویر برای محصول
                </button>
                <button
                    type='button'
                    onClick={() => setShowSpecifications(!showSpecifications)}
                    className='bg-amber-600 text-white px-4 py-2 w-fit rounded'>
                    {showSpecifications ? "پنهان کردن فرم مشخصات محصول" : " نمایش فرم مشخصات محصول"}
                </button>
            </div>
            <BasicInformation
                name={product.name}
                brand={product.brand}
                category={product.category}
                description={product.description}
                handleChange={handleInputChange}
                countInStock={product.countInStock}
                discount={product.discount}
                handleSelectChange={handleSelectChange}
            />

            {product.images.map((image, index) => (
                <AddImage
                    key={index}
                    index={index}
                    color={image.color}
                    file={image.file}
                    price={image.price}
                    handleDelete={deleteImage}
                />
            ))}

            {showSpecifications && <ProductSpecifications
                battery={product.battery}
                bluetooth={product.bluetooth}
                connectionType={product.connectionType}
                cpu={product.cpu}
                gpu={product.gpu}
                os={product.os}
                ram={product.ram}
                dimensions={product.dimensions}
                mainCamera={product.mainCamera}
                selfieCamera={product.selfieCamera}
                memory={product.memory}
                outputPower={product.outputPower}
                screenSize={product.screenSize}
                screenType={product.screenType}
                sensors={product.sensors}
                weight={product.weight}
                handleChange={handleInputChange}
            />}
            <button type="submit" className='bg-purple-700 text-white py-3 rounded'>افزودن محصول</button>
        </form>
    );
};

export default AddProductForm;