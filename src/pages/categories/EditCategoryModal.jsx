import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
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

export default function EditCategoryModal({ category, onClose }) {
  const { editCategory } = useCategoryContext();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description,
        image: category.image || null,
      });
    }
  }, [category]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImage = form.image;

    if (form.image instanceof File) {
      finalImage = await fileToBase64(form.image);
    }

    await editCategory({
      id: category.id,
      name: form.name,
      description: form.description,
      image: finalImage,
    });

    alert("✅ Category updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-6 rounded shadow w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <button className="absolute right-4 top-4" onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <Upload size={14} /> Category Image
            </label>
            <input
              type="file"
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

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
