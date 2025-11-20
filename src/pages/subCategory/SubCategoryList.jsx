// src/pages/subcategories/SubCategoryList.jsx
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SubCategoryTable from "./SubCategoryTable"; // create similar to UserTable
import SubCategoryActionModal from "../../components/SubCategoryActionModal";
import { useSubCategoryContext } from "../../context/SubCategoryContext";

// Modals
import EditSubCategoryModal from "./EditSubCategoryModal";
import DeleteSubCategoryModal from "./DeleteSubCategoryModal";

export default function SubCategoryList() {
  const navigate = useNavigate();
  const { subCategories, deleteSubCategory } = useSubCategoryContext();

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(subCategories.length / itemsPerPage);
  const currentSubCategories = subCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenActions = (subCat) => {
    setSelectedSubCategory(subCat);
    setShowActionModal(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Subcategory List</h2>
        <button
          onClick={() => navigate("/subcategory/add")}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Subcategory
        </button>
      </div>

      {/* Table */}
      <SubCategoryTable
        subCategories={currentSubCategories}
        onActionClick={handleOpenActions}
      />

      {/* Pagination */}
     <div className="flex justify-between items-center mt-8 text-gray-600">
  <span>
    Showing {(currentPage - 1) * itemsPerPage + 1}–
    {Math.min(currentPage * itemsPerPage, subCategories.length)} of {subCategories.length} Results
  </span>
  <div className="flex items-center">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
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
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-l-0"
    >
      &rarr;
    </button>
  </div>
</div>


      {/* Action Modal */}
      {showActionModal && selectedSubCategory && (
        <SubCategoryActionModal
          subCategory={selectedSubCategory}
          onClose={() => setShowActionModal(false)}
          onEdit={(subCat) => {
            setShowActionModal(false);
            setSelectedSubCategory(subCat);
            setShowEditModal(true);
          }}
          onDelete={(subCat) => {
            setShowActionModal(false);
            setSelectedSubCategory(subCat);
            setShowDeleteModal(true);
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedSubCategory && (
        <EditSubCategoryModal
          subCategory={selectedSubCategory}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedSubCategory && (
        <DeleteSubCategoryModal
          subCategory={selectedSubCategory}
          onClose={() => setShowDeleteModal(false)}
          onDelete={(id) => {
            deleteSubCategory(id);
            alert("✅ Subcategory deleted successfully!");
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
