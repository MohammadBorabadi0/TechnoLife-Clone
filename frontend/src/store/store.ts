import { create } from "zustand";

import { url } from "../utils/constants";

export const initialData = {
  name: "",
  brand: "",
  category: "",
  description: "",
  countInStock: 0,
  discount: 0,
  discountTime: 0,
  reviews: [],
  specifications: {
    cpu: "",
    gpu: "",
    os: "",
    dimensions: "",
    mainCamera: "",
    selfieCamera: "",
    memory: "",
    outputPower: "",
    ram: "",
    screenSize: "",
    screenType: "",
    bluetooth: "",
    battery: "",
    connectionType: "",
    sensors: "",
    weight: "",
  },
  images: [],
};

// Types
import {
  AddressFormValues,
  IBrand,
  ICart,
  ICategory,
  IColor,
  IOrder,
  IProduct,
  IUser,
  ProductData,
  ReviewData,
} from "../utils/type";
import toast from "react-hot-toast";
import { initialAddressFormValues, sendCompanyData } from "@/data/data";
import { pid } from "process";

// ----------------------------------------------------------

// Product Store

interface IProductStore {
  products: ProductData[] | [];
  product: ProductData | null;
  productData: ProductData;
  reviews: ReviewData | [];
  setProductData: (data: ProductData) => void;
  setProduct: (product: ProductData | null) => void;
  fetchProducts: () => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  addProduct: (formData: FormData) => Promise<void>;
  addProductReview: (id: string, review: ReviewData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, data: FormData) => Promise<void>;
  filteredProducts: ProductData[] | null;
  setFilteredProducts: (filteredProducts: ProductData[]) => void;
}

export const useProductStore = create<IProductStore>((set) => ({
  filteredProducts: [],
  setFilteredProducts: (filteredProducts: ProductData[]) =>
    set({ filteredProducts }),
  // -------------------------------------------------------------------------
  products: [],
  product: null,
  productData: initialData,
  reviews: [],
  setProductData: (data) => set({ productData: data }),
  setProduct: (product: ProductData | null) => {
    set(() => ({ product }));
  },
  fetchProducts: async () => {
    try {
      const response = await fetch(`${url}/api/products`);
      const { data } = await response.json();
      set({ products: data });
    } catch (err) {
      console.log(err);
    }
  },
  fetchProduct: async (id: string) => {
    try {
      const response = await fetch(`${url}/api/products/${id}`);
      console.log({ response });
      const { data } = await response.json();
      set({ product: data });
    } catch (err) {
      console.error(err);
    }
  },
  addProduct: async (formData: FormData) => {
    try {
      const response = await fetch(`${url}/api/products`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      console.log({ data });

      set((state) => ({
        products: [...state.products],
      }));
    } catch (error) {
      console.log(error);
      throw new Error("هنگام افزودن محصول مشکلی به وجود آمد");
    }
  },
  addProductReview: async (id: string, review: ReviewData) => {
    try {
      const response = await fetch(`${url}/api/products/${id}/reviews`, {
        method: "POST",
        body: JSON.stringify(review),
        credentials: "include",
      });

      const data = await response.json();

      console.log({ data });

      set((state) => ({
        products: [...state.products],
      }));
    } catch (error) {
      console.log(error);
      throw new Error("هنگام افزودن محصول مشکلی به وجود آمد");
    }
  },
  deleteProduct: async (id: string) => {
    await fetch(`${url}/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },
  updateProduct: async (id: string, data: FormData) => {
    try {
      const response = await fetch(`${url}/api/products/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      const result = await response.json();

      console.log({ result });
      console.log({ data });

      set((state) => ({ products: [...state.products] }));
    } catch (error) {
      console.log(error);
      throw new Error("There was a problem");
    }
  },
}));

// ------------------------------------------------------------------------

// Category Store

interface ICategoryStore {
  categories: ICategory[];
  category: ICategory | null;
  fetchCategories: () => Promise<void>;
  fetchCategory: (id: string) => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<ICategoryStore>((set) => ({
  categories: [],
  category: null,
  fetchCategories: async () => {
    try {
      const response = await fetch(`${url}/api/categories`);
      const { data } = await response.json();
      set({ categories: data });
    } catch (err) {
      console.error(err);
    }
  },
  fetchCategory: async (id: string) => {
    try {
      const response = await fetch(`${url}/api/categories/${id}`);
      const { data } = await response.json();
      console.log({ data });
      set({ category: data });
    } catch (err) {
      console.error(err);
    }
  },
  addCategory: async (name: string) => {
    try {
      const response = await fetch(`${url}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      console.log({ data });

      set((state) => ({ categories: [...state.categories] }));
    } catch (error) {
      console.log(error);
    }
  },
  updateCategory: async (id: string, name: string) => {
    try {
      const response = await fetch(`${url}/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const { data } = await response.json();

      set((state) => {
        const updateData = state.categories.find((i) => i._id === id);
        if (updateData) {
          updateData.name = data.name;
        }
        return { categories: [...state.categories] };
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (id: string) => {
    await fetch(`${url}/api/categories/${id}`, {
      method: "DELETE",
    });
    set((state) => ({
      categories: state.categories.filter((category) => category._id !== id),
    }));
  },
}));

// ------------------------------------------------------------------------

// Brand Store

interface IBrandStore {
  brands: IBrand[];
  brand: IBrand | null;
  fetchBrands: () => Promise<void>;
  fetchBrand: (id: string) => Promise<void>;
  addBrand: (brandName: string, categoryIds: string[]) => Promise<void>;
  updateBrand: (id: string, name: string, category: string) => Promise<void>;
  deleteBrand: (id: string) => Promise<void>;
}

export const useBrandStore = create<IBrandStore>((set) => ({
  brands: [],
  brand: null,
  fetchBrands: async () => {
    try {
      const response = await fetch(`${url}/api/brands`);
      const { data } = await response.json();
      set({ brands: data });
    } catch (err) {
      console.error(err);
    }
  },
  fetchBrand: async (id: string) => {
    try {
      const response = await fetch(`${url}/api/brands/${id}`);
      const { data } = await response.json();

      console.log({ fetchBrand: data });

      set({ brand: data });
    } catch (err) {
      console.error(err);
    }
  },
  addBrand: async (brandName: string, categoryIds: string[]) => {
    try {
      const response = await fetch(`${url}/api/brands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: brandName, category: categoryIds }),
      });

      const data = await response.json();
      console.log({ data });

      if (!response.ok) {
        throw new Error("Failed to add brand");
      }

      set((state) => ({ brands: [...state.brands] }));
    } catch (error) {
      console.log(error);
    }
  },
  updateBrand: async (id: string, name: string, category: string) => {
    try {
      const response = await fetch(`${url}/api/brands/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category }),
      });
      if (!response.ok) {
        throw new Error("Failed to update brand");
      }

      const { data } = await response.json();

      console.log({ data });

      set((state) => {
        const updateData = state.brands.find((i) => i._id === id);
        if (updateData) {
          updateData.name = data.brand.name;
        }
        return { brands: [...state.brands] };
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteBrand: async (id: string) => {
    await fetch(`${url}/api/brands/${id}`, {
      method: "DELETE",
    });
    set((state) => ({
      brands: state.brands.filter((brand) => brand._id !== id),
    }));
  },
}));

// ------------------------------------------------------------

// Brand Store

interface IUserStore {
  users: IUser[];
  user: IUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  userProfile: IUser | undefined;
  fetchUsers: () => Promise<void>;
  fetchUser: () => Promise<void>;
  getUserById: (id: string) => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  registerUser: (user: IUser) => Promise<void>;
  loginUser: (user: IUser) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const useUserStore = create<IUserStore>((set) => ({
  users: [],
  userProfile: undefined,
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  setIsLoggedIn: (isLoggedIn: boolean) => {
    set(() => ({ isLoggedIn }));
  },
  setIsAdmin: (isAdmin: boolean) => {
    set(() => ({ isAdmin }));
  },
  getUserById: async (id: string) => {
    try {
      const response = await fetch(`${url}/api/auth/user/${id}`, {
        credentials: "include",
      });
      const { data } = await response.json();

      console.log({ getuserbyid: data });

      set({ user: data });
    } catch (err) {
      console.log(err);
    }
  },
  fetchUsers: async () => {
    try {
      const response = await fetch(`${url}/api/auth/users`, {
        credentials: "include",
      });
      const { data } = await response.json();

      console.log({ data });

      set({ users: data });
    } catch (err) {
      console.log(err);
    }
  },
  fetchUser: async () => {
    try {
      const response = await fetch(`${url}/api/auth/user/profile`, {
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        if (data.data.isAdmin) {
          set(() => ({ isAdmin: true }));
        } else {
          set(() => ({ isAdmin: false }));
        }
        set({ userProfile: data, isLoggedIn: true });
      }
    } catch (err) {
      console.log(err);
      console.log("Fetch User Error");
    }
  },
  registerUser: async (user: IUser) => {
    const res = await fetch(`${url}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }),
    });
    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      set((state) => ({ users: [...state.users, user], isLoggedIn: true }));
    } else {
      toast.error(data.message);
      throw new Error("هنگام ثبت نام در سایت مشکلی پیش آمد");
    }
  },
  loginUser: async (user: IUser) => {
    const res = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const data = await res.json();

    if (data.success) {
      if (data.data.isAdmin) {
        set(() => ({ isAdmin: true }));
      } else {
        set(() => ({ isAdmin: false }));
      }

      toast.success(data.message);
      set((state) => ({ users: [...state.users, user], isLoggedIn: true }));
    } else {
      toast.error(data.message);
      throw new Error("هنگام ورود به سایت مشکلی پیش آمد");
    }
  },
  updateUser: async (user: IUser) => {
    console.log({ store: user });

    const res = await fetch(`${url}/api/auth/user/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      set((state) => ({ users: [...state.users] }));
    } else {
      toast.error(data.message);
      throw new Error("هنگام ویرایش کاربر مشکلی به وجود آمد");
    }
  },
  deleteUser: async (id: string) => {
    await fetch(`${url}/api/auth/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    set((state) => ({
      users: state.users.filter((user) => user._id !== id),
    }));
  },
  logoutUser: async () => {
    await fetch(`${url}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    set(() => ({
      isAdmin: false,
      isLoggedIn: false,
      user: undefined,
      userProfile: undefined,
    }));
  },
}));

// ------------------------------------------------------------

// Sidebar Store

interface ISidebarStore {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
  showSidebar: true,
  setShowSidebar: (showSidebar: boolean) => set({ showSidebar }),
}));

// ------------------------------------------------------------------------

interface ICompareStore {
  compareProducts: IProduct[];
  setCompareProducts: (product: IProduct) => void;
}

export const useCompareStore = create<ICompareStore>((set) => ({
  compareProducts: [],
  setCompareProducts: (product: IProduct) =>
    set((state) => ({
      compareProducts: [...state.compareProducts, product],
    })),
}));

// ------------------------------------------------------------------------

// Color Store

interface IColorStore {
  colors: IColor[];
  color: IColor | null;
  code: string;
  setColorCode: (code: string) => void;
  fetchColors: () => Promise<void>;
  fetchColor: (id: string) => Promise<void>;
  addColor: (name: string, code: string) => Promise<void>;
  updateColor: (id: string, name: string, code: string) => Promise<void>;
  deleteColor: (id: string) => Promise<void>;
}

export const useColorStore = create<IColorStore>((set) => ({
  colors: [],
  color: null,
  code: "#FFFFFF",
  setColorCode: (code: string) => {
    set(() => ({
      code,
    }));
  },
  fetchColors: async () => {
    try {
      const response = await fetch(`${url}/api/colors`);
      const { data } = await response.json();
      set({ colors: data });
    } catch (err) {
      console.error(err);
    }
  },
  fetchColor: async (id: string) => {
    try {
      const response = await fetch(`${url}/api/colors/${id}`);
      const { data } = await response.json();
      set({ color: data });
    } catch (err) {
      console.error(err);
    }
  },
  addColor: async (name: string, code: string) => {
    try {
      await fetch(`${url}/api/colors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });

      set((state) => ({ colors: [...state.colors] }));
    } catch (error) {
      console.log(error);
    }
  },
  updateColor: async (id: string, name: string, code: string) => {
    try {
      const response = await fetch(`${url}/api/colors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });
      if (!response.ok) {
        throw new Error("Failed to update color");
      }

      const { data } = await response.json();

      set((state) => {
        const updateData = state.colors.find((i) => i._id === id);
        if (updateData) {
          updateData.code = data.code;
          updateData.name = data.name;
        }
        return { colors: [...state.colors] };
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteColor: async (id: string) => {
    const response = await fetch(`${url}/api/colors/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    console.log({ data });

    set((state) => ({
      colors: state.colors.filter((color) => color._id !== id),
    }));
  },
}));

// ------------------------------------------------------------------------------------

// Show Add Comment Modal

interface IModal {
  showAddCommentModal: boolean;
  showShareModal: boolean;
  showConfirmModal: boolean;
  showAddAddressForm: boolean;
  showAddress: boolean;
  setShowAddCommentModal: (isShow: boolean) => void;
  setShowShareModal: (isShow: boolean) => void;
  setShowConfirmModal: (isShow: boolean) => void;
  setShowAddAdressForm: (isShow: boolean) => void;
  setShowAddress: (isShow: boolean) => void;
}

export const useModal = create<IModal>((set) => ({
  showAddCommentModal: false,
  showShareModal: false,
  showConfirmModal: false,
  showAddAddressForm: false,
  showAddress: false,
  setShowAddCommentModal: (isShow: boolean) => {
    set(() => ({
      showAddCommentModal: isShow,
    }));
  },
  setShowShareModal: (isShow: boolean) => {
    set(() => ({ showShareModal: isShow }));
  },
  setShowConfirmModal: (isShow: boolean) => {
    set(() => ({ showConfirmModal: isShow }));
  },
  setShowAddAdressForm: (isShow: boolean) => {
    set(() => ({ showAddAddressForm: isShow }));
  },
  setShowAddress: (isShow: boolean) => {
    set(() => ({ showAddress: isShow }));
  },
}));

// ------------------------------------------------------------------------------------

// Product Comment

interface IProductReview {
  reviews: [] | ReviewData;
  setReviews: (reviews: ReviewData) => void;
  addReview: (
    id: string,
    rating: number,
    comment: string,
    positivePoints: string,
    negativePoints: string
  ) => Promise<void>;
}

export const useProductReview = create<IProductReview>((set) => ({
  reviews: [],
  addReview: async (
    id: string,
    rating: number,
    comment: string,
    positivePoints: string,
    negativePoints: string
  ) => {
    const response = await fetch(`${url}/api/products/${id}/reviews`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        rating,
        comment,
        positivePoints,
        negativePoints,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      throw new Error("هنگام ثبت نظر شما مشکلی به وجود آمد");
    }
  },
  setReviews: (reviews: ReviewData) => {
    set(() => ({
      reviews,
    }));
  },
}));

// ------------------------------------------------------------------------------------

interface IStore {
  activeIndex: number;
  activeTab: string;
  activePaymentIndex: number | null;
  showPaymentInstallment: boolean;
  sendCompanyIndex: number;
  activeDayIndex: number;
  activeTimeIndex: number | null;
  setActiveIndex: (index: number) => void;
  setActivePaymentIndex: (index: number | null) => void;
  setShowPaymentInstallment: (isShow: boolean) => void;
  setActiveTab: (activeTab: string) => void;
  setSendCompanyIndex: (index: number) => void;
  setActiveDayIndex: (index: number) => void;
  setActiveTimeIndex: (index: number) => void;
}

export const useStore = create<IStore>((set) => ({
  activeIndex: 0,
  activeTab: "specifications",
  activePaymentIndex: 0,
  showPaymentInstallment: false,
  sendCompanyIndex: 0,
  activeDayIndex: 0,
  activeTimeIndex: null,
  setActiveIndex: (index: number) => {
    set(() => ({
      activeIndex: index,
    }));
  },
  setActivePaymentIndex: (index: number | null) => {
    set(() => ({
      activePaymentIndex: index,
    }));
  },
  setShowPaymentInstallment: (isShow: boolean) => {
    set(() => ({
      showPaymentInstallment: isShow,
    }));
  },
  setActiveTab: (activeTab: string) => {
    set(() => ({ activeTab }));
  },
  setSendCompanyIndex: (index: number) => {
    set(() => ({
      sendCompanyIndex: index,
    }));
  },
  setActiveDayIndex: (index: number) => {
    set(() => ({
      activeDayIndex: index,
    }));
  },
  setActiveTimeIndex: (index: number) => {
    set(() => ({
      activeTimeIndex: index,
    }));
  },
}));

// ------------------------------------------------------------------------------------

interface ICartStore {
  cartItems: ICart[] | [];
  removeAllCartItems: () => void;
  addToCart: (cartItems: ICart) => void;
  decreaseQuantity: (productId: string) => void;
  removeCartItem: (productId: string) => void;
}

export const useCartStore = create<ICartStore>((set) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const initialCartItems = isLocalStorageAvailable
    ? localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : []
    : [];

  return {
    cartItems: initialCartItems,
    removeAllCartItems: () => {
      if (isLocalStorageAvailable) {
        localStorage.setItem("cartItems", JSON.stringify([]));
      }
      set(() => ({ cartItems: [] }));
    },
    addToCart: (cartItem: ICart) => {
      set((state) => {
        const existingCartItemIndex = state.cartItems.findIndex(
          (item) => item.productId === cartItem.productId
        );

        if (existingCartItemIndex !== -1) {
          const updatedCartItems = state.cartItems.map((item, index) => {
            if (index === existingCartItemIndex) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });

          if (isLocalStorageAvailable) {
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          }

          return { cartItems: updatedCartItems };
        } else {
          // If item does not exist, add it to cartItems
          const updatedCartItems = [...state.cartItems, cartItem];

          if (isLocalStorageAvailable) {
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
          }

          return { cartItems: updatedCartItems };
        }
      });
    },
    decreaseQuantity: (productId: string) => {
      set((state) => {
        let updatedCartItems = state.cartItems;

        const findCartItem = updatedCartItems.find(
          (cart) => cart.productId === productId
        );

        if (findCartItem?.quantity && findCartItem.quantity > 1) {
          findCartItem.quantity--;
        }

        if (isLocalStorageAvailable) {
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }

        return { ...state, cartItems: updatedCartItems };
      });
    },
    removeCartItem: (productId: string) => {
      set((state) => {
        let updatedCartItems = state.cartItems;

        updatedCartItems = updatedCartItems.filter(
          (cartItem) => cartItem.productId !== productId
        );

        if (isLocalStorageAvailable) {
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }

        return { ...state, cartItems: updatedCartItems };
      });
    },
  };
});

// export const useCartStore = create<ICartStore>((set) => ({
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems") as string)
//     : [],
//   removeAllCartItems: () => {
//     localStorage.setItem("cartItems", JSON.stringify([]));
//     set(() => ({ cartItems: [] }));
//   },
//   addToCart: (cartItem: ICart) => {
//     set((state) => {
//       const existingCartItemIndex = state.cartItems.findIndex(
//         (item) => item.productId === cartItem.productId
//       );

//       if (existingCartItemIndex !== -1) {
//         // If item already exists, increase quantity by 1
//         const updatedCartItems = state.cartItems.map((item, index) => {
//           if (index === existingCartItemIndex) {
//             return { ...item, quantity: item.quantity + 1 };
//           }
//           return item;
//         });

//         // Save updated cartItems in localStorage
//         localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

//         return { cartItems: updatedCartItems };
//       } else {
//         // If item does not exist, add it to cartItems
//         const updatedCartItems = [...state.cartItems, cartItem];

//         // Save updated cartItems in localStorage
//         localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

//         return { cartItems: updatedCartItems };
//       }
//     });
//   },
//   decreaseQuantity: (productId: string) => {
//     set((state) => {
//       let updatedCartItems = state.cartItems;

//       const findCartItem = updatedCartItems.find(
//         (cart) => cart.productId === productId
//       );

//       if (findCartItem?.quantity && findCartItem.quantity > 1) {
//         findCartItem.quantity--;
//       }

//       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

//       return { ...state, cartItems: updatedCartItems };
//     });
//   },
//   removeCartItem: (productId: string) => {
//     set((state) => {
//       let updatedCartItems = state.cartItems;

//       updatedCartItems = updatedCartItems.filter(
//         (cartItem) => cartItem.productId !== productId
//       );

//       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

//       return { ...state, cartItems: updatedCartItems };
//     });
//   },
// }));

// -------------------------------------------------------------------------------------

// Shipment Store

interface ShipmentStore {
  addressFormValues: AddressFormValues;
  setAddressFormValues: (values: AddressFormValues) => void;
}

export const useShipmentStore = create<ShipmentStore>((set) => {
  const addressFormValues =
    typeof window !== "undefined" &&
    JSON.parse(
      localStorage.getItem("addressFormValues") ||
        JSON.stringify(initialAddressFormValues)
    );

  const setAddressFormValues = (values: AddressFormValues) => {
    set({ addressFormValues: values });
    typeof window !== "undefined" &&
      localStorage.setItem("addressFormValues", JSON.stringify(values));
  };

  return {
    addressFormValues,
    setAddressFormValues,
  };
});

// export const useShipmentStore = create<ShipmentStore>((set) => ({
//   addressFormValues: localStorage.getItem("addressFormValues")
//     ? JSON.parse(localStorage.getItem("addressFormValues") as string)
//     : initialAddressFormValues,
//   setAddressFormValues: (values: AddressFormValues) => {
//     set({ addressFormValues: values });
//     localStorage.setItem("addressFormValues", JSON.stringify(values));
//   },
// }));

// -------------------------------------------------------------------------------------

// Order Store

interface OrderStore {
  myOrders: IOrder[] | null;
  status: string;
  allOrders: IOrder[] | null;
  order: IOrder | null;
  setStatus: (status: string) => void;
  addOrder: (data: IOrder) => Promise<void>;
  fetchOrder: (id: string) => Promise<void>;
  fetchMyOrders: () => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  updateOrderStatus: (status: string, id: string) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  myOrders: null,
  status: "awaiting payment",
  allOrders: null,
  order: null,
  setStatus: (status: string) => {
    set(() => ({ status }));
  },
  fetchOrder: async (id: string) => {
    try {
      const response = await fetch(`${url}/api/orders/${id}`, {
        credentials: "include",
      });
      const { data } = await response.json();

      set({ order: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchMyOrders: async () => {
    try {
      const response = await fetch(`${url}/api/orders/my`, {
        credentials: "include",
      });
      const { data } = await response.json();

      set({ myOrders: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchAllOrders: async () => {
    try {
      const response = await fetch(`${url}/api/orders`, {
        credentials: "include",
      });
      const { data } = await response.json();

      set({ allOrders: data });
    } catch (error) {
      console.error(error);
    }
  },
  addOrder: async (data: IOrder) => {
    console.log({ data });

    const response = await fetch(`${url}/api/orders`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log({ response });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      localStorage.setItem("cartItems", JSON.stringify([]));
    } else {
      toast.error(result.message);
      throw new Error("هنگام ثبت سفارش و پرداخت شما مشکلی به وجود آمد");
    }
  },
  updateOrderStatus: async (status: string, id: string) => {
    console.log({ status, id });

    const response = await fetch(`${url}/api/orders/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    console.log({ response });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      // localStorage.setItem("cartItems", JSON.stringify([]));
    } else {
      toast.error(data.message);
      throw new Error("هنگام ویرایش سفارش مشکلی به وجود آمد");
    }
  },
}));

// ---------------------------------------------------------------------------------------------------

// Banner Store

interface BannerStore {
  label: string;
  image: File | null;
  setLabel: (label: string) => void;
  setImage: (image: File | null) => void;
  banners: null | ICategory[];
  createBanner: () => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  fetchBanners: () => Promise<void>;
}

export const useBannerStore = create<BannerStore>((set, get) => ({
  label: "",
  image: null,
  setLabel: (label) => set({ label }),
  setImage: (image) => set({ image }),
  banners: null,
  createBanner: async () => {
    const { label, image } = get();

    const formData = new FormData();
    formData.append("label", label);
    formData.append("image", image as File);

    try {
      const response = await fetch(`${url}/api/banners`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        set({ label: "", image: null });
        toast.success(data.message);
      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  },
  deleteBanner: async (id: string) => {
    try {
      const response = await fetch(`${url}/api/banners/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  },
  fetchBanners: async () => {
    try {
      const response = await fetch(`${url}/api/banners`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        set(() => ({ banners: data.data }));
      }
    } catch (error) {
      throw new Error("Error");
    }
  },
}));

// ---------------------------------------------------------------------------------------------------

interface FilterStore {
  filters: { brand: null | string; color: null | string };
  setFilters: (filters: {
    brand: null | string;
    color: null | string;
    pto: null | string;
    pfrom: null | string;
  }) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: { brand: null, color: null },
  setFilters: (filters: {
    brand: null | string;
    color: null | string;
    pto: null | string;
    pfrom: null | string;
  }) => {
    set({ filters });
  },
}));

// ---------------------------------------------------------------------------------------------------

interface CompateProductsState {
  showCompareProducts: boolean;
  compareProducts: ProductData[];
  setShowCompareProducts: (isShow: boolean) => void;
  addToCompareProducts: (product: ProductData) => void;
  removeFromCompareProducts: (productId: string) => void;
  removeAllCompareProducts: () => void;
  isExistsInCompareProducts: (productId: string) => boolean;
}

export const useCompareProductStore = create<CompateProductsState>((set) => ({
  showCompareProducts: false,
  compareProducts: [],
  setShowCompareProducts: (isShow: boolean) => {
    set(() => ({ showCompareProducts: isShow }));
  },
  addToCompareProducts: (product: ProductData) => {
    set((state) => {
      if (
        !state.compareProducts.some((p) => p._id === product._id) &&
        state.compareProducts.length < 4
      ) {
        if (
          state.compareProducts.some((p) => p.category !== product.category)
        ) {
          toast.error(
            "فقط محصولات مرتبط با یک دسته بندی را میتوانید مقایسه کنید"
          );
          return state;
        }

        // Add the product to the compareProducts array
        const updatedCompareProducts = [...state.compareProducts, product];

        return {
          ...state,
          compareProducts: updatedCompareProducts,
        };
      } else if (state.compareProducts.some((p) => p._id === product._id)) {
        toast.error("این محصول قبلا به مقایسه اضافه شده است");
      } else {
        toast.error("حداکثر تعداد مجاز برای مقایسه 4 کالا میباشد");
      }
      return state;
    });
  },
  removeFromCompareProducts: (productId: string) => {
    set((state) => {
      // Filter out the product with the specified productId
      const filteredCompareProducts = state.compareProducts.filter(
        (product) => product._id !== productId
      );

      return {
        compareProducts: filteredCompareProducts,
      };
    });
  },
  removeAllCompareProducts: () => {
    set(() => ({ compareProducts: [] }));
  },
  isExistsInCompareProducts: (productId: string): boolean => {
    let exists = false;
    set((state) => {
      exists = state.compareProducts.some(
        (product) => product._id === productId
      );
      return state;
    });
    return exists;
  },
}));
