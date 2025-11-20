import { useState } from "react";
import { Upload, Package, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../../context/CategoryContext";

// Helper function to convert file to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function AddCategory() {
  const navigate = useNavigate();
  const { addCategory } = useCategoryContext();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (form.image) {
      base64Image = await fileToBase64(form.image);
    }

    const newCategory = {
      ...form,
      id: Date.now(),
      image: base64Image,
    };

    addCategory(newCategory);
    alert("✅ Category added successfully!");
    navigate("/categories/list");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add Category</h2>
        <button
          onClick={() => navigate("/categories/list")}
          className="flex items-center gap-2 bg-amber-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-600 transition"
        >
          <Package size={16} /> Category List
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
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
            rows="3"
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Upload size={14} /> Upload Category Image <span className="text-red-500">*</span>
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
              src={form.image instanceof File ? URL.createObjectURL(form.image) : form.image}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-amber-600 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
