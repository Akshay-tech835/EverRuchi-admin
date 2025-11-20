import React, { useState } from "react";
import { usePaymentContext } from "../../context/PaymentContext";
import { useNavigate } from "react-router-dom";

export default function PaymentList() {
  const { payments } = usePaymentContext();
  const navigate = useNavigate();

  // 👉 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = payments.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(payments.length / rowsPerPage);

 // 👉 Total Calculation (safe)
const totalAmount = payments.reduce((sum, p) => {
  const amt = parseFloat(p.amount);
  return sum + (isNaN(amt) ? 0 : amt);
}, 0);


  // 👉 Navigate Pages
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Payment List</h2>

        <button
          onClick={() => navigate("/payment/add")}
          className="bg-amber-500 text-white px-4 py-2 rounded"
        >
          + Add Payment
        </button>
      </div>

      {/* Total Box */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <h3 className="text-lg font-bold">
          Total Payment Received: ₹{totalAmount}
        </h3>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded p-4">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
                <th className="p-2 border">CustomerName</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Amount</th>
              
              <th className="p-2 border">Notes</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No Payments Found
                </td>
              </tr>
            ) : (
              currentData.map((p) => (
                <tr key={p.id}>
                     <td className="p-2 border">{p.customer}</td>
                  <td className="p-2 border">{p.product}</td>
                  <td className="p-2 border">{p.quantity}</td>
                  <td className="p-2 border">₹{p.amount}</td>
 <td className="p-2 border">{p.notes || "-"}</td>
                 <td className="p-2 border">
  <button
    className={`px-3 py-1 rounded-md text-sm font-medium
      ${
        (p.status || "pending").toLowerCase() === "completed"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }
    `}
  >
    {(p.status || "pending").charAt(0).toUpperCase() +
      (p.status || "pending").slice(1)}
  </button>
</td>


                 
                </tr>
              ))
            )}
          </tbody>
        </table>

       {/* Pagination Footer */}
<div className="flex justify-between items-center mt-4 text-gray-600">
  <span>
    Showing {payments.length === 0 ? 0 : indexOfFirst + 1}–
    {Math.min(indexOfLast, payments.length)} of {payments.length} Results
  </span>

  {/* Numbered Pagination (Same as ProductList) */}
  <div className="flex items-center">
    {/* Prev Button */}
    <button
      disabled={currentPage === 1}
      onClick={() => goToPage(currentPage - 1)}
      className="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &larr;
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
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

    {/* Next Button */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => goToPage(currentPage + 1)}
      className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-l-0"
    >
      &rarr;
    </button>
  </div>
</div>


      </div>
    </div>
  );
}
