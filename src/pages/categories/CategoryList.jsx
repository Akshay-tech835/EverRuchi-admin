import React, { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategoryContext } from "../../context/CategoryContext";
import CategoryActionModal from "../../components/CategoryActionModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

export default function CategoryList() {
  const navigate = useNavigate();
  const { categories, deleteCategory } = useCategoryContext();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Category List</h2>
        <button
          onClick={() => navigate("/categories/add")}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Table */}
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
            {currentCategories.length > 0 ? (
              currentCategories.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-amber-50 transition duration-150">
                  <td className="border border-gray-200 px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{cat.name}</td>
                  <td className="border border-gray-200 px-4 py-2 max-w-xs truncate">{cat.description}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ) : "—"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowActionModal(true);
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-orange-500 hover:text-white transition"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No categories added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     {/* Pagination */}
<div className="flex justify-between items-center mt-8 text-gray-600">
  <span>
    Showing {(currentPage - 1) * itemsPerPage + 1}–
    {Math.min(currentPage * itemsPerPage, categories.length)} of {categories.length} Results
  </span>
  <div className="flex items-center">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
      className="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &larr;
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 border-t border-b border-gray-300 ${i === 0 ? "" : "border-l-0"} ${
          currentPage === i + 1 ? "bg-amber-500 text-white" : "hover:bg-gray-100"
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-l-0"
    >
      &rarr;
    </button>
  </div>
</div>

      {/* Action Modal */}
      {showActionModal && selectedCategory && (
        <CategoryActionModal
          category={selectedCategory}
          onClose={() => setShowActionModal(false)}
          onEdit={() => setShowEditModal(true)}
          onDelete={() => setShowDeleteModal(true)}
        />
      )}

      {/* Edit Category Modal */}
      {showEditModal && selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
          onDelete={(id) => {
            deleteCategory(id);
            setShowDeleteModal(false);
            setSelectedCategory(null);
            alert("✅ Category deleted successfully!");
          }}
        />
      )}
    </div>
  );
}
