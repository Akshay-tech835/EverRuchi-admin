import React, { useState } from "react";
import { Plus } from "lucide-react";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import UserActionModal from "../../components/UserActionModal";
import { useUserContext } from "../../context/UserContext";

// 🔥 Import Action + Edit + Delete Modals
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

export default function UserList() {
  const navigate = useNavigate();
  const { users, deleteUser  } = useUserContext();

  // 🔥 Modal States
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔥 Handle action button from table
  const handleOpenActions = (user) => {
    setSelectedUser(user);
    setShowActionModal(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">User List</h2>

        <button
          onClick={() => navigate("/users/add")}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* User Table - 🔥 Pass the Action Handler */}
      <UserTable users={currentUsers} onActionClick={handleOpenActions} />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 text-gray-600">
        <span>
          {users.length > 0 ? (
            <>
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, users.length)} of {users.length} Results
            </>
          ) : (
            "No results"
          )}
        </span>

        {/* Pagination buttons */}
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
      className={`px-3 py-1 border-t border-b border-gray-300 ${
        i === 0 ? "" : "border-l-0"
      } ${
        currentPage === i + 1
          ? "bg-amber-500 text-white"
          : "hover:bg-gray-100"
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

      {/* 🔥 Action Modal */}
      {showActionModal && (
  <UserActionModal
    user={selectedUser}
    onClose={() => setShowActionModal(false)}
    onEdit={(user) => {
      setShowActionModal(false);
      setSelectedUser(user);
      setShowEditModal(true);
    }}
    onDeleteClick={(user) => {     // ✅ FIXED
      setShowActionModal(false);
      setSelectedUser(user);
      setShowDeleteModal(true);
    }}
  />
)}


      {/* 🔥 Edit Modal */}
      {showEditModal && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* 🔥 Delete Modal */}
      {showDeleteModal && (
  <DeleteUserModal
    user={selectedUser}
    onClose={() => setShowDeleteModal(false)}
    onDelete={(id) => {
      deleteUser(id);        // ✅ delete from context
      alert("User deleted successfully!"); // ✅ alert message
      setShowDeleteModal(false);
    }}
  />
)}

    </div>
  );
}
