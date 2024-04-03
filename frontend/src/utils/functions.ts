import { parse } from "persian_util";
import toast from "react-hot-toast";
import { IBrand, ICart, ICategory } from "./type";

export const En_To_Fa = (num: string) => {
  return parse.En_To_Fa(num);
};

// Function to fetch images and convert them to type File
export const fetchImagesFromFirebase = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
  const file = new File([blob], filename, { type: blob.type });
  return file;
};

export const copyCurrentUrlToClipboard = () => {
  // Get the current URL
  const currentUrl = window.location.href;

  // Copy the URL to the clipboard
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      console.log("URL copied to clipboard: " + currentUrl);
      toast.success("کپی شد");
    })
    .catch((error) => {
      console.error("Failed to copy URL to clipboard: ", error);
      toast.error("مشکلی در کپی کردن لینک به وجود آمد.");
    });
};

export const calculateCartSummary = (cartItems: ICart[]) => {
  return cartItems.reduce(
    (acc, item) => {
      const discountAmount =
        ((item.price * item.discount) / 100) * item.quantity;
      const shippingCost = item.quantity * 28000;

      acc.totalPrices += item.price * item.quantity;
      acc.totalPricesAfterDiscount +=
        (item.price - discountAmount) * item.quantity;
      acc.totalDiscountAmount += discountAmount;
      acc.shippingCost += shippingCost;

      return acc;
    },
    {
      totalPrices: 0,
      totalPricesAfterDiscount: 0,
      totalDiscountAmount: 0,
      shippingCost: 0,
    }
  );
};

export const convertToPersianDate = (gregorianDateStr: Date) => {
  const gregorianDate = new Date(gregorianDateStr);

  const persianDayOfWeek = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
  }).format(gregorianDate);
  const persianDate = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(gregorianDate);

  return { persianDate, persianDayOfWeek };
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "awaiting payment":
      return {
        text: "در انتظار پرداخت",
        textColor: "#0ea5e9",
        bgColor: "#e0f2fe",
      };
    case "processing":
      return {
        text: "در حال پردازش",
        textColor: "#f59e0b",
        bgColor: "#fef3c7",
      };
    case "delivered":
      return {
        text: "تحویل داده شده",
        textColor: "#f97316",
        bgColor: "#ffedd5",
      };
    case "returned":
      return {
        text: "مرجوع شده",
        textColor: "#9333ea",
        bgColor: "#f3e8ff",
      };
    case "canceled and suspended":
      return {
        text: "لغو شده",
        textColor: "#dc2626",
        bgColor: "#fee2e2",
      };
    default:
      return { text: status, textColor: "", bgColor: "" };
  }
};

// export const getCategoryAndBrandFromURL = (
//   decodedUrl: string,
//   categories: ICategory[],
//   brands: IBrand[]
// ) => {
//   let findBrand;
//   let findCategory;

//   if (decodedUrl.includes("تمامی")) {
//     findCategory = categories.find(
//       (category) => category.name === decodedUrl.split("-")[1]
//     );
//   } else {
//     findBrand = brands.find((brand) => brand.name === decodedUrl.split("-")[1]);
//     findCategory = categories.find(
//       (category) => category.name === decodedUrl.split("-")[0]
//     );
//   }

//   return { findBrand, findCategory };
// };

export const findCategoryFromURL = (decodedUrl: string, categories: ICategory[]) => {
  if (decodedUrl.includes("تمامی")) {
    return categories.find(
      (category) => category.name === decodedUrl.split("-")[1]
    );
  } else {
    return categories.find(
      (category) => category.name === decodedUrl.split("-")[0]
    );
  }
};

// Function to find brand based on decoded URL
export const findBrandFromURL = (decodedUrl: string, brands: IBrand[]) => {
  return brands.find((brand) => brand.name === decodedUrl.split("-")[1]);
};
