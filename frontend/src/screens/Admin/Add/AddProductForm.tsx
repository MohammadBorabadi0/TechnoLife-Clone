import { useProductStore } from "@/store/store";
import createFormData from "@/utils/createFormData";
import { ChangeEvent, FormEvent, useState } from "react";

const AddProductForm: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    countInStock: 0,
    discount: 0,
    color: "",
    price: 0,
    cpu: "",
    gpu: "",
    ram: "",
    os: "",
    memory: "",
    screenSize: "",
    screenType: "",
    mainCamera: "",
    selfieCamera: "",
    battery: "",
    sensors: "",
    connectionType: "",
    bluetooth: "",
    dimensions: "",
    weight: "",
    outputPower: "",
  });

  const [image, setImage] = useState<null | File>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === "image" && files) {
      setImage(files[0]);
    } else {
      setData({ ...data, [name]: e.target.value });
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = createFormData(data, image);

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    console.log({ result });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add input fields for product details and file upload */}
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        name="image"
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      {/* Add other input fields for product details */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProductForm;
