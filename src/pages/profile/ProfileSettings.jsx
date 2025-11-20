import React, { useState } from "react";

export default function ProfileSettings() {
  const [form, setForm] = useState({
    name: "Admin",
    email: "admin@everruchi.com",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-amber-400 focus:outline-none";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Profile Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className={inputClass}
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className={inputClass}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              className={inputClass}
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              className={inputClass}
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-5">
            <button
              type="button"
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
