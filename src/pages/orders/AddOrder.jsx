import { useState } from "react";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";

export default function AddOrder() {
  const navigate = useNavigate();
  const { addOrder } = useOrderContext();

  const [form, setForm] = useState({
    customerName: "",
    product: "",
    quantity: "",
    price: "",
    notes: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      ...form,
      id: crypto.randomUUID(),
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    };

    addOrder(newOrder);

    alert("✅ Order added successfully!");
    navigate("/orders/list");
  };

  const products = [
    "Select Product",
    "Product A",
    "Product B",
    "Product C",
    "Product D",
  ];

  const quantities = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add Order</h2>
        <button
          onClick={() => navigate("/orders/list")}
          className="flex items-center gap-2 bg-amber-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-600 transition"
        >
          <Package size={16} /> Order List
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Customer Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
        </div>

        {/* Product + Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Product <span className="text-red-500">*</span>
            </label>
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            >
              {products.map((p, i) => (
                <option key={i} value={i === 0 ? "" : p} disabled={i === 0}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <select
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            >
              <option value="">Select quantity</option>
              {quantities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
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

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-amber-600 transition"
        >
          Add Order
        </button>
      </form>
    </div>
  );
}
