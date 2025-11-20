// src/pages/subcategories/EditSubCategoryModal.jsx
import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useSubCategoryContext } from "../../context/SubCategoryContext";

export default function EditSubCategoryModal({ subCategory, onClose }) {
  const { editSubCategory } = useSubCategoryContext();

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (subCategory) {
      setForm({
        categoryId: subCategory.categoryId || "",
        name: subCategory.name || "",
        description: subCategory.description || "",
        image: subCategory.image || null,
      });
    }
  }, [subCategory]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result }); // save base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedSubCategory = {
      id: subCategory.id,
      categoryId: form.categoryId,
      name: form.name,
      description: form.description,
      image: form.image, // base64 (permanent)
    };

    editSubCategory(updatedSubCategory);
    alert("✅ Subcategory updated successfully!");
    onClose();
  };

  if (!subCategory) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg mx-3 rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Subcategory</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-medium">Category ID</label>
            <input
              type="text"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"

              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"

              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"

              required
            />
          </div>

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

            {/* Preview — base64 or existing image */}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
