// src/pages/products/AddProduct.jsx
import { useState } from "react";
import { Package, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProductContext();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: null, // Base64
    video: null, // File object (NOT base64)
    videoPreview: null, // Object URL for preview
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Convert Image & Video to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (e.target.name === "image") {
      // Convert image to base64 (SAFE)
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }

    if (e.target.name === "video") {
      // Store video as file (NOT base64)
      const videoUrl = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        video: file,
        videoPreview: videoUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...form,
      id: crypto.randomUUID(), // Unique ID
      price: parseFloat(form.price),
      stock: parseInt(form.stock),

      // 🚫 Prevent storing video in localStorage
      video: form.videoPreview || null, 
    };

    addProduct(newProduct);

    alert("✅ Product added successfully!");
    navigate("/products/list");
  };

  const categories = [
    "Select Category",
    "Powder",
    "Whole Spices",
    "Blended Spices",
    "Masala Mix",
    "Seasonings",
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>
        <button
          onClick={() => navigate("/products/list")}
          className="flex items-center gap-2 bg-amber-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-600 transition"
        >
          <Package size={16} />
          Product List
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Product Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            rows="3"
            required
          />
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            >
              {categories.map((cat, index) => (
                <option
                  key={index}
                  value={index === 0 ? "" : cat}
                  disabled={index === 0}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none
                       [&::-webkit-inner-spin-button]:appearance-none
                       [&::-webkit-outer-spin-button]:appearance-none
                       [&::-moz-appearance]:textfield"
              required
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <select
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          >
            <option value="">Select quantity</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Upload size={14} /> Upload Product Image{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 mt-1 cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Upload size={14} /> Upload Product Video{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 mt-1 cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          {form.videoPreview && (
            <video
              src={form.videoPreview}
              controls
              className="mt-2 w-40 rounded-md border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-amber-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
