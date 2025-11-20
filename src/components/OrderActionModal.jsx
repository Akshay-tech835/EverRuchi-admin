import React from "react";
import { Edit3, Trash2, X } from "lucide-react";

export default function OrderActionModal({ order, onClose, onEdit, onDeleteClick }) {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-72 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Actions</h2>

        <div className="flex flex-col gap-3">
          <button
            className="flex gap-3 px-4 py-2 border rounded hover:bg-orange-500 hover:text-white"
            onClick={() => {
              onClose();
              onEdit(order);
            }}
          >
            <Edit3 size={18} /> Edit
          </button>

          <button
            className="flex gap-3 px-4 py-2 border rounded hover:bg-red-600 hover:text-white"
            onClick={() => {
              onClose();
              onDeleteClick(order);
            }}
          >
            <Trash2 size={18} /> Delete
          </button>

          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
