import React from "react";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">S.No</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Category</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Price</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Stock</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Video</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
            {/* 👇 make Action header left-aligned */}
            <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-500">
                No products added
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr key={p.id} className="hover:bg-amber-50 transition duration-150">
                <td className="border border-gray-200 px-4 py-2">{i + 1}</td>
                <td className="border border-gray-200 px-4 py-2">{p.name}</td>
                <td className="border border-gray-200 px-4 py-2">{p.category}</td>

                {/* ✅ Updated price with ₹ symbol and proper formatting */}
                <td className="border border-gray-200 px-4 py-2">
                  ₹{Number(p.price).toLocaleString("en-IN")}
                </td>

                <td className="border border-gray-200 px-4 py-2">{p.stock}</td>

                <td className="border border-gray-200 px-4 py-2">
                  {p.image && (
                    <img
                      src={p.image}
                      alt="Product"
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  {p.video && (
                    <video
                      src={p.video}
                      controls
                      className="h-20 w-28 rounded"
                    />
                  )}
                </td>

                <td className="border border-gray-200 px-4 py-2">{p.description}</td>

                {/* 👇 Action buttons also left-aligned */}
                <td className="border border-gray-200 px-4 py-2 text-left">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Delete
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
