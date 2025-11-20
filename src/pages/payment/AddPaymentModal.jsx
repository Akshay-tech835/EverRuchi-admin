// src/pages/payments/AddPayment.jsx
import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePaymentContext } from "../../context/PaymentContext";

export default function AddPayment() {
  const navigate = useNavigate();
  const { addPayment } = usePaymentContext();

  // Product Prices (sample) — edit as required
  const productPrices = {
    "Red Chilli Powder": 120,
    "Turmeric Powder": 80,
    "Cumin Powder": 140,
    "Coriander Powder": 90,
    "Garam Masala": 150,
    "Fish Masala": 160,
    "Chicken Masala": 150,
  };

  const productList = Object.keys(productPrices);

  const [form, setForm] = useState({
    customer: "",
    product: "",
    quantity: "",
    amount: "",
    notes: "",
    status: "Pending", // allow choose
  });

  const updateAmount = (product, qty) => {
    const price = productPrices[product];
    const q = Number(qty);
    if (!price || !q) return "";
    return price * q;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // handle product and quantity special logic to auto-calc amount only when both present
    if (name === "product") {
      const amt = updateAmount(value, form.quantity);
      setForm((f) => ({ ...f, product: value, amount: amt || "", status: f.status }));
      return;
    }

    if (name === "quantity") {
      const amt = updateAmount(form.product, value);
      setForm((f) => ({ ...f, quantity: value, amount: amt || "", status: f.status }));
      return;
    }

    // normal fields (customer, amount (editable), notes, status)
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation basic
    if (!form.product || !form.quantity || !form.amount) {
      alert("Please fill product, quantity and amount.");
      return;
    }

    const newPayment = {
      ...form,
      quantity: Number(form.quantity),
      amount: parseFloat(form.amount),
    };

    addPayment(newPayment);
    alert("✅ Payment added successfully!");
    navigate("/payment/list");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add Payment</h2>

        <button
          onClick={() => navigate("/payment/list")}
          className="flex items-center gap-2 bg-amber-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-600 transition"
        >
          <Wallet size={16} />
          Payment List
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Customer (text input) */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
            placeholder="Enter customer name"
          />
        </div>

        {/* Product (dropdown) */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Product <span className="text-red-500">*</span>
          </label>
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400"
            required
          >
            <option value="">Select Product</option>
            {productList.map((prod) => (
              <option key={prod} value={prod}>
                {prod} {productPrices[prod] ? `— ₹${productPrices[prod]}` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Quantity <span className="text-red-500">*</span>
          </label>
          <select
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400"
            required
          >
            <option value="">Select Quantity</option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Amount (auto-filled but editable) */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Amount (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
        </div>

        {/* Status dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            rows="3"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-amber-600 transition"
        >
          Add Payment
        </button>
      </form>
    </div>
  );
}
