import { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  UserCircle,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToProfile = () => navigate("/profile/settings");
  const goToManageUsers = () => navigate("/users/list");

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-gray-900 border-b border-gray-800 px-6 py-3 shadow-sm sticky top-0 z-50 text-white">

      {/* Left Section */}
      <div className="flex items-center gap-4 w-1/3">
        <h1 className="text-lg font-semibold text-amber-400 hidden sm:block">
          EverRuchi Admin Panel
        </h1>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex justify-center w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-3 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 w-1/3 justify-end ml-4">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-800 transition"
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-300" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Bell size={20} className="text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50">
              <div className="p-3 font-medium text-amber-400 border-b border-gray-700">
                Notifications
              </div>

              <ul className="max-h-60 overflow-y-auto text-sm text-gray-200">
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                  🛒 New order placed (Order #1234)
                </li>
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                  📦 Product “Chana Masala” is low on stock
                </li>
                <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                  👤 New user registered
                </li>
              </ul>

              <div className="text-center text-xs py-2 text-amber-400 cursor-pointer hover:underline">
                View all
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <UserCircle size={28} className="text-gray-300" />
            <span className="hidden sm:block font-medium">Admin</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-semibold text-amber-400">Admin</p>
                <p className="text-xs text-gray-400">admin@everruchi.com</p>
              </div>

              <ul className="text-sm text-gray-200">
                <li
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  onClick={goToProfile}
                >
                  Profile Settings
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  onClick={goToManageUsers}
                >
                  Manage Users
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-800 text-red-400 cursor-pointer font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
