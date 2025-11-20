import React from "react";
import { X } from "lucide-react";

export default function DeleteOrderModal({ order, onClose, onDelete }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Delete Order</h2>

        <p className="mb-4">
          Are you sure you want to delete the order for 
          <strong> {order.customerName}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => onDelete(order.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
