export interface IColumn {
  id: string;
  name: string;
}

export interface ICategory {
  name: string;
  _id: string;
  brand?: IBrand[];
}

export interface IBrand {
  name: string;
  _id: string;
  category: string;
}

export interface IUser {
  _id?: string;
  mobile?: number;
  cardNumber?: number;
  nationalCode?: number;
  job?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
}

export interface IProduct {
  _id?: string;
  user?: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  countInStock: number;
  discount: number;
  images: [
    {
      file: string;
      color: string;
      price: number;
      _id?: string;
    }
  ];
  cpu: string;
  gpu: string;
  ram: string;
  os: string;
  memory: string;
  screenSize: string;
  screenType: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  sensors: string;
  connectionType: string;
  bluetooth: string;
  dimensions: string;
  weight: string;
  outputPower: string;
  key?: string;
}

//  -----------------------------------------------

export interface IColor {
  _id: string;
  code?: string;
  name: string;
}

export interface ImageData {
  file: File | null;
  color: string;
  price: number;
  _id?: string;
}

export interface ImageUploadData {
  file: string;
  color: string;
  price: number;
  _id?: string;
}

export interface ProductData {
  _id?: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  countInStock: number;
  discount?: number;
  createdAt?: string;
  orderCount?: number;
  discountTime?: number;
  rating?: number;
  reviews?: ReviewData[];
  specifications: ISpecificatons;
  images: ImageUploadData[];
}

export interface ReviewData {
  name: string;
  rating: number;
  comment: string;
  positivePoints?: string;
  negativePoints?: string;
  user: string;
  _id: string;
  createdAt: string;
}

export interface ISpecificatons {
  cpu: string;
  gpu: string;
  ram: string;
  os: string;
  memory: string;
  screenSize: string;
  screenType: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  sensors: string;
  connectionType: string;
  bluetooth: string;
  dimensions: string;
  weight: string;
  outputPower: string;
}

export interface ICart {
  productId: string;
  quantity: number;
  colorId: string;
  discount: number;
  price: number;
}

export interface IOrder {
  _id?: string;
  totalPrices?: number;
  totalPricesAfterDiscount?: number;
  shippingCost?: number;
  totalDiscountAmount?: number;
  createdAt?: Date;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult: {
    status: string;
  };
  sendCompany: string;
  orderItems: {
    product: string;
    quantity: number;
    price: number;
    discount: number;
    color: string;
  }[];
}

export interface ShippingAddress {
  province: string;
  city: string;
  quarter: string;
  postalAddress: string;
  postalCode: string;
  houseNumber: string;
  phoneNumber: string;
}

export interface AddressFormValues {
  firstname: string;
  lastname: string;
  phonenumber: string;
  province: string;
  city: string;
  quarter: string;
  postalAddress: string;
  housenumber: string;
  postalCode: string;
}
