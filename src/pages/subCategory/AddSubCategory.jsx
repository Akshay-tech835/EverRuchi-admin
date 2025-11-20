// src/pages/subcategories/AddSubCategory.jsx
import { useState } from "react";
import { List, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSubCategoryContext } from "../../context/SubCategoryContext";
import { useCategoryContext } from "../../context/CategoryContext";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const { addSubCategory } = useSubCategoryContext();
  const { categories } = useCategoryContext();

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: null,
  });

  // Convert image file → Base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert selected file to Base64 (persistent storage)
    let base64Image = null;
    if (form.image) {
      base64Image = await toBase64(form.image);
    }

    const newSubCategory = {
      categoryId: form.categoryId,
      name: form.name,
      description: form.description,
      image: base64Image, // ⬅ SAVE BASE64 (fixes refresh issue)
      id: Date.now(),
    };

    addSubCategory(newSubCategory);
    alert("✅ Subcategory added successfully!");
    navigate("/subcategory/list");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add Subcategory</h2>
        <button
          onClick={() => navigate("/subcategory/list")}
          className="flex items-center gap-2 bg-amber-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-600 transition"
        >
          <List size={16} /> Subcategory List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Select */}
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <Upload size={14} /> Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 mt-1 cursor-pointer focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />

          {/* Preview */}
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-md border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-amber-600 transition"
        >
          Add Subcategory
        </button>
      </form>
    </div>
  );
}
