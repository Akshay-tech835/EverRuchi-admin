import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function UserTable({ users, onActionClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">S.No</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Full Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Phone</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Address</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id} className="hover:bg-amber-50 transition duration-150">
                <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2">{user.fullName}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-200 px-4 py-2">{user.address}</td>
                <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-medium ${
                      user.status === "Active" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="border border-gray-200 px-4 py-2 text-left">
                  <button
                    type="button"
                    onClick={() => onActionClick(user)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-gray-600 hover:bg-orange-500 hover:text-white transition"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
