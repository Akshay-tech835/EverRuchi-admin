import React from "react";

export default function DeleteUserModal({ user, onClose, onDelete }) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
          Delete User
        </h3>

        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-bold">{user.fullName}</span>?
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => onDelete(user.id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
