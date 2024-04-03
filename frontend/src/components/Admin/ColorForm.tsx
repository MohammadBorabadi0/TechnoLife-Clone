import React, { ChangeEvent, useState } from 'react';
import { IColor, ImageData } from '@/utils/type';

interface SelectColorProps {
    colors: IColor[]; // Assuming colors is an array of color objects
}

const SelectColor: React.FC<SelectColorProps> = ({ colors }) => {
    const [imageData, setImageData] = useState<ImageData[]>([]);

    const handleFileChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newFile = files[0];
            setImageData(prevImageData => {
                const updatedData = [...prevImageData];
                updatedData[index].file = newFile;
                return updatedData;
            });
        }
    };

    const handlePriceChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseFloat(e.target.value);
        setImageData(prevImageData => {
            const updatedData = [...prevImageData];
            updatedData[index].price = newPrice;
            return updatedData;
        });
    };

    const handleColorChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setImageData(prevImageData => {
            const updatedData = [...prevImageData];
            updatedData[index].checked = checked;
            return updatedData;
        });
    };

    console.log({ imageData });

    return (
        <div>
            {colors.map((data, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.checked}
                            onChange={handleColorChange(index)}
                        />
                        {data.name}
                    </label>
                    {data.checked && (
                        <div>
                            <label htmlFor={`file-${index}`}>Select Image</label>
                            <input
                                type="file"
                                id={`file-${index}`}
                                onChange={handleFileChange(index)}
                            />
                            <input
                                type="number"
                                value={imageData[index].price}
                                onChange={handlePriceChange(index)}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SelectColor;
