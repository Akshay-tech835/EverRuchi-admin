import React from "react";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">S.No</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No categories added
              </td>
            </tr>
          ) : (
            categories.map((c, i) => (
              <tr key={c.id} className="hover:bg-amber-50 transition duration-150">
                <td className="border border-gray-200 px-4 py-2">{i + 1}</td>
                <td className="border border-gray-200 px-4 py-2">{c.name}</td>
                <td className="border border-gray-200 px-4 py-2">{c.description}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-left">
                  <button
                    onClick={() => onEdit(c)}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(c)}
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
