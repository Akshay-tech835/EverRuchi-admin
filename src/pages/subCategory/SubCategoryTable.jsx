import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function SubCategoryTable({ subCategories, onActionClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">S.No</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Category ID</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {subCategories.length > 0 ? (
            subCategories.map((sub, index) => (
              <tr key={sub.id} className="hover:bg-amber-50 transition duration-150">
                <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2">{sub.categoryId}</td>
                <td className="border border-gray-200 px-4 py-2">{sub.name}</td>
                <td className="border border-gray-200 px-4 py-2 max-w-xs truncate">{sub.description}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {sub.image ? (
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ) : "—"}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-left">
                  <button
                    type="button"
                    onClick={() => onActionClick(sub)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-orange-500 hover:text-white transition"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No subcategories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
