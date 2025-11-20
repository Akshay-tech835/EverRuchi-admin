import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useOrderContext } from "../../context/OrderContext";

export default function EditOrderModal({ order, onClose }) {
  const { editOrder } = useOrderContext();

  const [form, setForm] = useState({
    customerName: "",
    product: "",
    quantity: "",
    price: "",
    notes: "",
    status: "Pending",
  });

  // Example product list
  const products = ["Product A", "Product B", "Product C", "Product D"];
  const quantities = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    if (order) {
      setForm({
        customerName: order.customerName || "",
        product: order.product || "",
        quantity: order.quantity || "",
        price: order.price || "",
        notes: order.notes || "",
        status: order.status || "Pending",
      });
    }
  }, [order]);

  const updateField = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    editOrder({ ...order, ...form });
    alert("✅ Order updated successfully!");
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

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Order</h2>

        <form onSubmit={handleSave} className="space-y-4">

          {/* Customer Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Customer Name *</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={updateField}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
          </div>

          {/* Product */}
          <div>
            <label className="text-sm font-medium text-gray-700">Product *</label>
            <select
              name="product"
              value={form.product}
              onChange={updateField}
              className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            >
              <option value="">Select Product</option>
              {products.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Quantity + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Quantity *</label>
              <select
                name="quantity"
                value={form.quantity}
                onChange={updateField}
                className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              >
                <option value="">Select Quantity</option>
                {quantities.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={updateField}
                className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none
                       [&::-webkit-inner-spin-button]:appearance-none
                       [&::-webkit-outer-spin-button]:appearance-none"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={updateField}
              className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={updateField}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              rows="3"
            />
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
