'use client';

import Title from '@/components/Admin/add/Title';
import { useColorStore } from '@/store/store';
import { Checkbox, FormControlLabel } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';

const AddProductScreenLast = () => {
    const [checked, setChecked] = useState([false, false, false]);
    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
    const { colors, fetchColors, } = useColorStore(state => state);

    const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);

        if (!newChecked[index]) {
            const newFiles = [...files];
            newFiles[index] = null;
            setFiles(newFiles);
        }
    }

    const handleFileChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = [...files];
        if (e.target.files && e.target.files.length > 0) {
            newFiles[index] = e.target.files[0];
            setFiles(newFiles);
        }
    }

    const handleDeleteFile = (index: number) => {
        const newFiles = [...files];
        newFiles[index] = null;
        setFiles(newFiles);
    }

    useEffect(() => {
        fetchColors();
    }, [fetchColors]);

    return (
        <section className='m-3 mb-5 border rounded'>
            <Title activeStep={0} step={0} title='اضافه کردن رنگ و تصویر محصول' />
            <div className='grid grid-cols-3 gap-3 px-3 py-6'>
                {colors.map((data, index) => (
                    <div key={index} className='flex justify-between border-2 border-dashed rounded h-40'>
                        <FormControlLabel
                            control={<Checkbox checked={checked[index]} onChange={handleChange(index)} color='secondary' />}
                            label={data.name}
                        />
                        {checked[index] && (
                            <div className='w-40 m-6 flex items-center'>
                                {files[index] ? (
                                    <div className='flex items-center gap-5'>
                                        <img className='rounded w-24 object-cover' src={URL.createObjectURL(files[index] as Blob)} alt="Selected Image" />
                                        <button
                                            className='bg-red-600 text-white rounded-full p-2'
                                            onClick={() => handleDeleteFile(index)}
                                        >
                                            <BiTrash />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor={`file-input-${index}`} className="border-2 cursor-pointer border-dashed p-6 rounded">
                                        انتخاب تصویر
                                    </label>
                                )}
                                <input
                                    id={`file-input-${index}`}
                                    type='file'
                                    onChange={handleFileChange(index)}
                                    className="hidden"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AddProductScreenLast;