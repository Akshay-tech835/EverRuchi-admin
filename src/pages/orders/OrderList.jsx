import React, { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
import OrderActionModal from "../../components/OrderActionModal";
import EditOrderModal from "./EditOrderModal";
import DeleteOrderModal from "./DeleteOrderModal";

export default function OrderList() {
  const navigate = useNavigate();
  const { orders, deleteOrder } = useOrderContext();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Order List</h2>
        <button
          onClick={() => navigate("/orders/add")}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Order
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">S.No</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Customer</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Product</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Quantity</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Notes</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-amber-50 transition duration-150">
                  <td className="border border-gray-200 px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{order.customerName}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.product}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.quantity}</td>
                  <td className="border border-gray-200 px-4 py-2">₹{order.price}</td>
                  <td className="border border-gray-200 px-4 py-2 max-w-xs truncate">{order.notes || "—"}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-medium ${
                        order.status === "Pending" ? "bg-yellow-500" :
                        order.status === "Processing" ? "bg-blue-500" :
                        order.status === "Shipped" ? "bg-purple-500" :
                        order.status === "Delivered" ? "bg-green-600" :
                        "bg-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(order);
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
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No orders added yet.
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
    {Math.min(currentPage * itemsPerPage, orders.length)} of {orders.length} Results
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
        } ${
          currentPage === i + 1
            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() => setCurrentPage((prev) => prev + 1)}
      className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-l-0"
    >
      &rarr;
    </button>
  </div>
</div>


      {/* Action Modal */}
      {showActionModal && selectedOrder && (
        <OrderActionModal
          order={selectedOrder}
          onClose={() => setShowActionModal(false)}
          onEdit={() => {
            setShowActionModal(false);
            setShowEditModal(true);
          }}
          onDeleteClick={() => {
            setShowActionModal(false);
            setShowDeleteModal(true);
          }}
        />
      )}

      {/* Edit Order Modal */}
      {showEditModal && selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Order Modal */}
      {showDeleteModal && selectedOrder && (
        <DeleteOrderModal
          order={selectedOrder}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedOrder(null);
          }}
          onDelete={(id) => {
            deleteOrder(id);
            setShowDeleteModal(false);
            setSelectedOrder(null);
            alert("✅ Order deleted successfully!");
          }}
        />
      )}
    </div>
  );
}
