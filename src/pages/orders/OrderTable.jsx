import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function OrderTable({ orders, onActionClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="border px-3 py-2">S.No</th>
            <th className="border px-3 py-2">Customer</th>
            <th className="border px-3 py-2">Product</th>
            <th className="border px-3 py-2">Quantity</th>
            <th className="border px-3 py-2">Price</th>
            <th className="border px-3 py-2">Notes</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-6 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((o, idx) => (
              <tr key={o.id} className="hover:bg-amber-50">
                <td className="border px-3 py-2">{idx + 1}</td>
                <td className="border px-3 py-2">{o.customerName}</td>
                <td className="border px-3 py-2">{o.product}</td>
                <td className="border px-3 py-2">{o.quantity}</td>
                <td className="border px-3 py-2">₹{o.price}</td>
                <td className="border px-3 py-2">{o.notes}</td>
                <td className="border px-3 py-2">
                  <button
                    onClick={() => onActionClick(o)}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:bg-orange-500 hover:text-white"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
