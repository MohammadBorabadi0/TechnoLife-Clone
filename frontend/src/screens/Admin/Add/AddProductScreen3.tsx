'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ImageData {
    file: File;
    color: string;
    price: number;
    [key: string]: any; // Index signature to allow indexing with a string
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

// Reusable InputField component
const InputField: React.FC<{
    type: string;
    label: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ type, label, value, onChange }) => {
    return (
        <div>
            <label htmlFor={label}>{label}:</label>
            <input
                type={type}
                id={label}
                value={value}
                onChange={onChange}
                className="border rounded-sm"
            />
        </div>
    );
};

// Reusable FileInput component
const FileInput: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void }> = ({
    onChange,
}) => {
    return (
        <div className="border">
            <label>Image:</label>
            <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={onChange}
            />
        </div>
    );
};

// Reusable ImageDetails component
const ImageDetails: React.FC<{
    color: string;
    price: number;
    onColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ color, price, onColorChange, onPriceChange }) => {
    return (
        <div>
            <input
                type="text"
                value={color}
                onChange={onColorChange}
                className="border rounded-sm"
            />
            <input
                type="number"
                value={price}
                onChange={onPriceChange}
                className="border rounded-sm"
            />
        </div>
    );
};

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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        console.log({ files });

        if (files) {
            const newImages = Array.from(files).map((file) => ({
                file,
                color: '',
                price: 0,
            }));
            setProductData({ ...productData, images: [...productData.images, ...newImages] });
        }
    };

    const handleImageDetailsChange = (index: number, property: string, value: string) => {
        const updatedImages = [...productData.images];
        updatedImages[index][property] = value;
        setProductData({ ...productData, images: updatedImages });
    };

    console.log(productData.images);

    const handleAddImage = () => {
        const newImage = {
            file: new File([], ''), // Placeholder file
            color: '',
            price: 0,
        };
        setProductData({ ...productData, images: [...productData.images, newImage] });
    };

    // ... (handleFileChange, handleImageDetailsChange, handleAddImage remain unchanged)

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ... (form submission logic remains unchanged)
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <InputField
                type="text"
                label="name"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
            <InputField
                type="text"
                label="description"
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
            {productData.images.map((image, index) => (
                <div key={index}>
                    <FileInput onChange={(e) => handleFileChange(e)} />
                    <ImageDetails
                        color={image.color}
                        price={image.price}
                        onColorChange={(e) => handleImageDetailsChange(index, 'color', e.target.value)}
                        onPriceChange={(e) => handleImageDetailsChange(index, 'price', e.target.value)}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddImage}>Add Another Image</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddProductForm;
