import React, { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import ActionModal from "../../components/ActionModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal"; // Correct import

export default function ProductList() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProductContext();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Product List</h2>
        <button
          onClick={() => navigate("/products/add")}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">S.No</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Stock</th>

              {/* newly added headers */}
              <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Video</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Description</th>

              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-amber-50 transition duration-150">
                  <td className="border border-gray-200 px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{product.category}</td>
                  <td className="border border-gray-200 px-4 py-2">₹{product.price}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {product.stock > 0 ? (
                      <span className="text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    )}
                  </td>

                  {/* Image cell */}
                  <td className="border border-gray-200 px-4 py-2">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name || "Product image"}
                        className="w-14 h-14 object-cover rounded border"
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Video cell */}
                  <td className="border border-gray-200 px-4 py-2">
                    {product.video ? (
                      <video
                        src={product.video}
                        controls
                        className="w-24 h-14 rounded border"
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Description cell */}
                  <td className="border border-gray-200 px-4 py-2 max-w-xs truncate">
                    {product.description || "—"}
                  </td>

                  <td className="border border-gray-200 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-medium ${
                        product.status === "Active" ? "bg-blue-800" : "bg-blue-400"
                      }`}
                    >
                      {product.status || "Active"}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(product);
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
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No products added yet.
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
          {Math.min(currentPage * itemsPerPage, products.length)} of {products.length} Results
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
              className={`px-3 py-1 border-t border-b border-gray-300 ${
                i === 0 ? "" : "border-l-0"
              } ${currentPage === i + 1 ? "bg-blue-800 text-white" : "hover:bg-gray-100"}`}
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
      {showActionModal && selectedProduct && (
        <ActionModal
          product={selectedProduct}
          onClose={() => setShowActionModal(false)}
          onEdit={() => {
            setShowActionModal(false);
            setShowEditModal(true);
          }}
          onDelete={() => {
            setShowActionModal(false);
            setShowDeleteModal(true);
          }}
        />
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Product Modal */}
{showDeleteModal && selectedProduct && (
  <DeleteProductModal
    product={selectedProduct}
    onClose={() => {
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }}
    onConfirm={(id) => {
      deleteProduct(id);           // delete product from context
      setShowDeleteModal(false);   // close modal
      setSelectedProduct(null);    // reset product
      alert("✅ Product deleted successfully!");
    }}
  />
)}



    </div>
  );
}
