// src/pages/users/AddUser.jsx
import { useState } from "react";
import { List, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function AddUser() {
  const navigate = useNavigate();
  const { addUser } = useUserContext();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...form, id: Date.now() };
    addUser(newUser);
    alert("✅ User added successfully!");
    navigate("/users/list");
  };

  const roles = ["Select Role", "Admin", "Staff", "Manager"];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add User</h2>

        <button
          onClick={() => navigate("/users/list")}
          className="flex items-center gap-2 bg-amber-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-600 transition"
        >
          <List size={16} />
          User List
        </button>
      </div>

      {/* Form */}
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
              {roles.map((role, index) => (
                <option
                  key={index}
                  value={index === 0 ? "" : role}
                  disabled={index === 0}
                >
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Status
            </label>
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
          <label className="text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-amber-600 transition"
        >
          Add User
        </button>

      </form>
    </div>
  );
}
