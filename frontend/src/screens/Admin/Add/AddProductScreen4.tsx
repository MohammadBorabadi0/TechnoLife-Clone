'use client';

import Input from '@/components/Admin/add/Input';
import createFormData from '@/utils/createFormData';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ImageData {
    file: File;
    color: string;
    price: number;
    [key: string]: File | string | number;
}

interface ProductData {
    name: string,
    description: string,
    brand: string,
    category: string,
    countInStock: number,
    discount: number,
    cpu: string,
    gpu: string,
    ram: string,
    os: string,
    memory: string,
    screenSize: string,
    screenType: string,
    mainCamera: string,
    selfieCamera: string,
    battery: string,
    sensors: string,
    connectionType: string,
    bluetooth: string,
    dimensions: string,
    weight: string,
    outputPower: string,
    images: ImageData[];
}

const AddProductForm: React.FC = () => {
    const [productData, setProductData] = useState<ProductData>({
        name: '',
        description: '',
        battery: '',
        bluetooth: '',
        brand: '',
        category: '',
        connectionType: '',
        countInStock: 0,
        cpu: '',
        gpu: '',
        dimensions: '',
        discount: 0,
        mainCamera: '',
        selfieCamera: '',
        memory: '',
        os: '',
        outputPower: '',
        ram: '',
        screenSize: '',
        screenType: '',
        sensors: '',
        weight: '',
        images: [],
    });

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value, files } = e.target;

    //     if (name === 'color' || name === 'price' || name === 'file') {
    //         if (files && files.length > 0) {
    //             const newImages = Array.from(files).map((file) => ({
    //                 file,
    //                 color: '',
    //                 price: 0,
    //             }));
    //             setProductData({ ...productData, images: [...productData.images, ...newImages] });
    //         }
    //     } else {
    //         setProductData({ ...productData, [name]: value });
    //     }
    // };

    const handleImageDetailsChange = (index: number, property: string, value: string) => {
        const updatedImages = [...productData.images];
        updatedImages[index][property] = value;
        setProductData({ ...productData, images: updatedImages });
    };

    const handleAddImage = () => {
        const newImage = {
            file: new File([], ''),
            color: '',
            price: 0,
        };
        setProductData({ ...productData, images: [...productData.images, newImage] });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        console.log({ name, value, files });

        if (name === 'file' && (!productData.images || productData.images.length === 0)) {
            if (files && files.length > 0) {
                const newImages = Array.from(files).map((file) => ({
                    file,
                    color: '',
                    price: 0,
                }));
                setProductData({ ...productData, images: newImages });
            }
        }
        else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages = Array.from(files).map((file) => ({
                file,
                color: '',
                price: 0,
            }));
            setProductData((prevData) => ({
                ...prevData,
                images: prevData.images.concat(newImages),
            }));
        }
    };
    
    


    const handleImagePriceChange = (index: number, value: string) => {
        const updatedImages = [...productData.images];
        updatedImages[index].price = Number(value);
        setProductData({ ...productData, images: updatedImages });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ productData });

        const formData = createFormData(productData, '');
        formData.append('image', productData.images[0].file);
        // formData.append('image', productData.images[0].file);

        const response = await fetch('http://localhost:5000/api/products', {
            method: "POST",
            credentials: 'include',
            body: formData
        });

        const data = await response.json();

        console.log({ data });
    };

    return (
        <form onSubmit={handleFormSubmit} className='px-4 flex flex-col gap-4'>
            {/* Other form fields */}
            <Input
                handleChange={handleChange}
                label='Name'
                name='name'
                value={productData.name} />
            <Input
                handleChange={handleChange}
                label='Description'
                name='description'
                value={productData.description} />
            {productData.images.map((image, index) => (
                <div key={index}>
                    <input
                        type="file"
                        name="file"
                        accept='.png,.jpg,jpeg,.webp'
                        onChange={handleFileChange}
                    />
                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={image.price}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="button" className='bg-blue-600 text-white p-2' onClick={handleAddImage}>
                Add Another Image
            </button>
            <button type='submit' className='bg-green-600 text-white p-2'>Submit</button>
        </form>
        // <form onSubmit={handleFormSubmit}>
        //     {productData.images.map((image, index) => (
        //         <div key={index}>
        //             <input
        //                 type="file"
        //                 accept=".png,.jpg,.jpeg,.webp"
        //                 onChange={handleChange}
        //             />
        //             <input
        //                 type="text" className='border p-2'
        //                 value={image.color}
        //                 onChange={(e) => handleImageDetailsChange(index, 'color', e.target.value)}
        //             />
        //             <input
        //                 type="number" className='border p-2'
        //                 value={image.price}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //     ))}
        //     <button type="button" className='bg-blue-600 text-white p-2' onClick={handleAddImage}>
        //         Add Another Image
        //     </button>
        //     <button type="submit" className='bg-purple-600 text-white p-2'>Submit</button>
        // </form>
    );
};

export default AddProductForm;
