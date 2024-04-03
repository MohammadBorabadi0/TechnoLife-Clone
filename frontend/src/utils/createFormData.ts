// import { IProduct } from "./type";

import { ProductData } from "./type";

// interface IImageFormData {
//   price: number;
//   color: string;
//   image: File | null;
// }

// const createFormData = (data: IProduct, image: File | null, imageFormData: IImageFormData[]) => {
//   const formData = new FormData();

//   // Append fields from the data object
//   for (const key in data) {
//     if (Object.prototype.hasOwnProperty.call(data, key)) {
//       const value = data[key as keyof IProduct];
//       if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
//         // Handle array of objects
//         value.forEach((item, index) => {
//           // formData.append(`${key}[${index}]`, item);
//           formData.append(`${key}[${index}]`, JSON.stringify(item));
//         });
//       } else {
//         // Handle other types
//         formData.append(key, String(value));
//       }
//     }
//   }

//   // Append fields from the imageFormData array
//   imageFormData.forEach((item, index) => {
//     formData.append(`image_${index}_price`, String(item.price));
//     formData.append(`image_${index}_color`, item.color);
//     if (item.image) {
//       formData.append(`image_${index}`, item.image);
//     }
//   });

//   // Append the image file
//   if (image) {
//     formData.append('image', image);
//   }

//   return formData;
// };

// ------------------------------------------------

// const createFormData = (data: any, imagesData: any) => {
//   const formData = new FormData();
//   for (const key in data) {
//     if (data.hasOwnProperty(key)) {
//       formData.append(key, data[key]);
//     }
//   }
//   if (imagesData) {
//     imagesData.forEach((image: any, index: number) => {
//       console.log(image);
//       // formData.append(`image`, image.file);
//       formData.append(`color[${index}]`, image.color);
//       formData.append(`price[${index}]`, image.price);
//     });
//   }
//   return formData;
// };

// export default createFormData;

// -----------------------

const createFormData = (data: any, imagesData: any) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  if (imagesData) {
    imagesData.forEach((image: any, index: number) => {
      if (!image?.file?.name) {
        formData.append(`image${index}`, image.file);
      }

      formData.append("upload_preset", "ijvepqse");
      formData.append("image", image.file);
      formData.append(`color${index}`, image.color);
      formData.append(`price${index}`, image.price);
    });
  }
  return formData;
};

export default createFormData;
