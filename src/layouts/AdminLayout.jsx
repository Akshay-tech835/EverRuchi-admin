import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar"; // ✅ use your Sidebar component
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        <Topbar /> {/* ✅ keep your topbar as-is */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
