import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { useProductContext } from "../../context/ProductContext";

export default function EditProductModal({ product, onClose }) {
  const { editProduct } = useProductContext();

  const categories = [
    "Powder",
    "Whole Spices",
    "Blended Spices",
    "Masala Mix",
    "Seasonings",
  ];

  const [form, setForm] = useState({
    name: product.name || "",
    description: product.description || "",
    category: product.category || "",
    price: product.price || "",
    stock: product.stock || "",
    image: product.image || null,
    video: product.video || null,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setForm({ ...form, [e.target.name]: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      image: form.image instanceof File ? URL.createObjectURL(form.image) : form.image,
      video: form.video instanceof File ? URL.createObjectURL(form.video) : form.video,
    };

    editProduct(updatedProduct);
    alert("✅ Product updated successfully!");
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 overflow-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative my-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Product Name *</label>
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
            <label className="text-sm font-medium text-gray-700">Description *</label>
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
              <label className="text-sm font-medium text-gray-700">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price *</label>
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
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
</div>


          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Upload size={14} /> Product Image *
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2 mt-1 cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            {form.image && (
              <img
                src={form.image instanceof File ? URL.createObjectURL(form.image) : form.image}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Video Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Upload size={14} /> Product Video *
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2 mt-1 cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            {form.video && (
              <video
                src={form.video instanceof File ? URL.createObjectURL(form.video) : form.video}
                controls
                className="mt-2 w-40 rounded-md border"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded-md font-medium hover:bg-amber-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
