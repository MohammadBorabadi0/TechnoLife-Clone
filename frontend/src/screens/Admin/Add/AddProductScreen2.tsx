'use client';
import createFormData from '@/utils/createFormData';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ImageData {
  file: File;
  color: string;
  price: number;
  [key: string]: any;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'color' || name === 'price' || name === 'file') {
      if (files) {
        const newImages = Array.from(files).map((file) => ({
          file,
          color: '',
          price: 0,
        }));
        setProductData({ ...productData, images: [...productData.images, ...newImages] });
      }
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('brand', '6593aa6321eb400b983e4c3d');
    // formData.append('category', '65954b1ab541ee5dc8e2370c');
    // formData.append('name', productData.name);
    // formData.append('description', productData.description);

    // productData.images.forEach((image, index) => {
    //   formData.append(`image`, image.file);
    //   formData.append(`color[${index}]`, image.color);
    //   formData.append(`price[${index}]`, image.price.toString());
    // });

    const formData = createFormData(productData, productData.images);

    // Make a POST request to the backend API using formData
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      console.log({ data });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name='name'
          className='border rounded-sm'
          value={productData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="countInStock">CountInStock:</label>
        <input
          type="number"
          id="countInStock"
          name='countInStock'
          className='border rounded-sm'
          value={productData.countInStock}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          id="discount"
          name='discount'
          className='border rounded-sm'
          value={productData.discount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input className='border rounded-sm'
          id="description"
          name='description'
          value={productData.description}
          onChange={handleChange}
        />
      </div>
      {productData.images.map((image, index) => (
        <div key={index}>
          <div className='border'>
            <label htmlFor={`image-${index}`}>Image {index + 1}:</label>
            <input
              type="file"
              name='file'
              accept='.png,.jpg,.jpeg,.webp'
              id={`image-${index}`}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name='color'
            className='border rounded-sm'
            value={image.color}
            onChange={(e) => handleImageDetailsChange(index, 'color', e.target.value)}
          />
          <input
            type="number"
            name='price'
            className='border rounded-sm'
            value={image.price}
            onChange={(e) => handleImageDetailsChange(index, 'price', e.target.value)}
          />
        </div>
      ))}
      <button type="button" className='bg-blue-600 text-white p-2' onClick={handleAddImage}>
        Add Another Image
      </button>


      <button type="button" className='bg-blue-600 text-white p-2' onClick={handleAddImage}>
        Add Another Image
      </button>
      <button type="submit" className='bg-green-600 text-white p-2'>Submit</button>
    </form>
  );
};

export default AddProductForm;

// ----------------------------------------------
// {
//   productData.images.map((image, index) => (
//     <div key={index}>
//       <input className='border p-2 rounded-sm'
//         type="text"
//         value={image.color}
//         onChange={(e) => handleImageDetailsChange(index, 'color', e.target.value)}
//       />
//       <input
//         type="number" className='border p-2 rounded-sm'
//         value={image.price}
//         onChange={(e) => handleImageDetailsChange(index, 'price', e.target.value)}
//       />
//     </div>
//   ))
// }

// __________________________________________________________________________

// const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append('brand', '6593aa6321eb400b983e4c3d');
//   formData.append('category', '65954b1ab541ee5dc8e2370c');
//   formData.append('name', productData.name);
//   formData.append('description', productData.description);
//   productData.images.forEach((image, index) => {
//     formData.append(`image`, image.file);
//     formData.append(`color[${index}]`, image.color);
//     formData.append(`price[${index}]`, image.price.toString());
//   });

//   // Make a POST request to the backend API using formData
//   try {
//     const response = await fetch('http://localhost:5000/api/products', {
//       method: 'POST',
//       body: formData,
//       credentials: 'include',
//     });

//     const data = await response.json();

//     console.log({ data });

//   } catch (error) {
//     console.log(error);
//   }
// };