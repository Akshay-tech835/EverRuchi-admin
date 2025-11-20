import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react"; // <-- make sure Eye and EyeOff are imported
import { useUserContext } from "../../context/UserContext";

export default function EditUserModal({ user, onClose }) {
  const { editUser } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        password: user.password || "",
        role: user.role || "Staff",
        status: user.status || "Active",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser({ id: user.id, ...form });
    alert("User updated successfully!");
    onClose();
  };

  const roles = ["Admin", "Staff", "Manager", "Sales", "Warehouse"];

  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg mx-3 rounded-lg shadow-lg p-6 relative 
        max-h-[90vh] overflow-y-auto"   // <---- FIX
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
          </div>

          {/* Role + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              >
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows="3"
            ></textarea>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
