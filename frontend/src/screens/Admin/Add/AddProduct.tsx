import React, { useEffect, useState, FormEvent } from "react";
import Title from "../../../components/Admin/Title";

interface IProduct {
  name: string;
  _id: string;
  countInStock: number;
  description: string;
  price: number;
  brand: string;
  category: string;
}

interface ICategory {
  name: string;
  brand: [{ name: string }];
  _id: string;
}

interface IBrand {
  name: string;
  _id: string;
}

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  const [name, setName] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!description.trim()) {
      alert("Description is required");
      return;
    }
    if (price === 0) {
      alert("Price is required");
      return;
    }
    if (brand === "") {
      alert("Brand is required");
      return;
    }
    if (category === "") {
      alert("Category is required");
      return;
    }
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        countInStock,
        description,
        price,
        brand,
        category,
      }),
    });
    const data = res.json();
    console.log({ data });
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, [products, allBrands, allCategories]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch("http://localhost:5000/api/brands");
      const data = await res.json();
      setAllBrands(data);
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      setAllCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2 m-3">
      <Title title="اضافه کردن محصول" />
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Product Name"
          className="border px-2 py-1.5 rounded-sm"
        />
        <input
          type="number"
          value={countInStock}
          onChange={(e) => setCountInStock(+e.target.value)}
          placeholder="Enter CountInStock"
          className="border px-2 py-1.5 rounded-sm"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          placeholder="Enter Price"
          className="border px-2 py-1.5 rounded-sm"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="border px-2 py-1.5 rounded-sm"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="border px-2 py-1.5 rounded-sm"
        >
          {allCategories.map((c: ICategory) => (
            <option key={c._id} value={c.name}>
              {c._id} - {c.name}
            </option>
          ))}
        </select>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border px-2 py-1.5 rounded-sm"
        >
          {allBrands.map((b: IBrand) => (
            <option key={b._id} value={b.name}>
              {b._id} - {b.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-2 py-1.5 rounded-sm"
        >
          Send
        </button>
      </form>
      <div className="flex flex-col gap-3 mt-10 border-t-4 border-yellow-600">
        {products.map((product: IProduct) => (
          <div key={product._id} className="flex items-center gap-10">
            <h2>Name : {product.name}</h2>
            <span>Category : {product.category}</span>
            <span>Brand : {product.brand}</span>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-600 text-white px-2 py-1 rounded-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;
