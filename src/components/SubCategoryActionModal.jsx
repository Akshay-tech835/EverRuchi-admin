// src/components/SubCategoryActionModal.jsx
import React from "react";
import { Edit3, Trash2, X } from "lucide-react";

export default function SubCategoryActionModal({ subCategory, onClose, onEdit, onDelete }) {
  if (!subCategory) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-72 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-4">Actions</h3>

        <div className="flex flex-col gap-3">
          {/* EDIT */}
          <button
            onClick={() => {
              onClose();
              onEdit(subCategory);
            }}
            className="flex items-center gap-3 px-4 py-2 border rounded hover:bg-orange-500 hover:text-white transition"
          >
            <Edit3 size={18} />
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={() => {
              onClose();
              onDelete(subCategory); // matches prop name
            }}
            className="flex items-center gap-3 px-4 py-2 border rounded hover:bg-red-600 hover:text-white transition"
          >
            <Trash2 size={18} />
            Delete
          </button>

          {/* CANCEL */}
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
