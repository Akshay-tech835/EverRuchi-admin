import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";

const data = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 18000 },
  { month: "Mar", sales: 15000 },
  { month: "Apr", sales: 20000 },
  { month: "May", sales: 25000 },
  { month: "Jun", sales: 22000 },
];

const allOrders = [
  { id: "ORD1234", customer: "Ravi Kumar", product: "Garam Masala", status: "Delivered", date: "2025-11-08", amount: 299 },
  { id: "ORD1235", customer: "Priya Sharma", product: "Chana Masala", status: "Pending", date: "2025-11-09", amount: 199 },
  { id: "ORD1236", customer: "Amit Patel", product: "Sambhar Powder", status: "Delivered", date: "2025-11-09", amount: 349 },
  { id: "ORD1237", customer: "Sneha Rao", product: "Kitchen King", status: "Cancelled", date: "2025-11-10", amount: 249 },
  { id: "ORD1238", customer: "Vikas Reddy", product: "Biryani Masala", status: "Delivered", date: "2025-11-10", amount: 329 },
  { id: "ORD1239", customer: "Neha Joshi", product: "Pav Bhaji Masala", status: "Pending", date: "2025-11-11", amount: 189 },
  { id: "ORD1240", customer: "Rohit Singh", product: "Chicken Masala", status: "Cancelled", date: "2025-11-12", amount: 259 },
];

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const filteredOrders = allOrders.filter((order) => {
    const matchStatus = statusFilter === "All" || order.status === statusFilter;
    const matchSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const handleExportCSV = () => {
    const csvRows = [
      ["Order ID", "Customer", "Product", "Status", "Date", "Amount"],
      ...filteredOrders.map((o) => [o.id, o.customer, o.product, o.status, o.date, o.amount]),
    ];
    const csvContent = csvRows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "everruchi_orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">
          Monitor Everruchi’s sales, customers, and order performance in real-time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard title="Total Products" value="128" icon={<Package size={22} />} color="from-amber-400 to-amber-600" />
        <SummaryCard title="Total Orders" value="542" icon={<ShoppingCart size={22} />} color="from-green-400 to-green-600" />
        <SummaryCard title="Revenue" value="₹2,45,000" icon={<IndianRupee size={22} />} color="from-blue-400 to-blue-600" />
        <SummaryCard title="Customers" value="327" icon={<Users size={22} />} color="from-purple-400 to-purple-600" />
      </div>

      {/* 📊 Monthly Sales Review */}
{/* 📊 Monthly Sales Review (Enhanced) */}
<div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
    <BarChart3 className="text-amber-500" size={22} />
    Monthly Sales Review
  </h3>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* 1️⃣ Monthly Sales Trend */}
    <div className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-xl shadow-sm border group hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gray-700">📈 Monthly Sales</h4>
        <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded-full">
          +12.5% vs last month
        </span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `₹${v / 1000}k`} />
          <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
          <Bar
            dataKey="sales"
            fill="#f59e0b"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* 2️⃣ Category Revenue */}
    <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl shadow-sm border group hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gray-700">💰 Category Revenue</h4>
        <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded-full">
          +8.3% vs last month
        </span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={[
            { name: "Spices", revenue: 45000 },
            { name: "Snacks", revenue: 25000 },
            { name: "Pickles", revenue: 15000 },
            { name: "Beverages", revenue: 12000 },
            { name: "Instant Mix", revenue: 8000 },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `₹${v / 1000}k`} />
          <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
          <Bar
            dataKey="revenue"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* 3️⃣ Orders Overview */}
    <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl shadow-sm border group hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gray-700">🛒 Orders Overview</h4>
        <span className="text-red-600 text-xs font-medium bg-red-100 px-2 py-0.5 rounded-full">
          -3.2% vs last month
        </span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={[
            { name: "Delivered", count: 320 },
            { name: "Pending", count: 140 },
            { name: "Cancelled", count: 82 },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#10b981"
            radius={[8, 8, 0, 0]}
            animationDuration={900}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* 4️⃣ Profit Analysis */}
    <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl shadow-sm border group hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-gray-700">📊 Profit Analysis</h4>
        <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded-full">
          +10.1% vs last month
        </span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={[
            { name: "Jan", profit: 8000 },
            { name: "Feb", profit: 11000 },
            { name: "Mar", profit: 9500 },
            { name: "Apr", profit: 13000 },
            { name: "May", profit: 16000 },
            { name: "Jun", profit: 14000 },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `₹${v / 1000}k`} />
          <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
          <Bar
            dataKey="profit"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

{/* 🏆 Best Selling Products Section */}
<div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
    <BarChart3 className="text-green-500" size={22} />
    Best Selling Products
  </h3>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50 border-b">
        <tr className="text-left text-gray-600">
          <th className="py-3 px-4">Rank</th>
          <th className="py-3 px-4">Product</th>
          <th className="py-3 px-4">Category</th>
          <th className="py-3 px-4">Units Sold</th>
          <th className="py-3 px-4">Revenue</th>
          <th className="py-3 px-4">Stock Status</th>
          <th className="py-3 px-4 text-right">Growth</th>
        </tr>
      </thead>
      <tbody>
        {[
          {
            rank: 1,
            product: "Everruchi Garam Masala",
            category: "Spices",
            units: 530,
            revenue: 159000,
            stock: "In Stock",
            growth: "+15%",
          },
          {
            rank: 2,
            product: "Chana Masala",
            category: "Spices",
            units: 460,
            revenue: 137000,
            stock: "In Stock",
            growth: "+12%",
          },
          {
            rank: 3,
            product: "Sambhar Powder",
            category: "South Indian",
            units: 410,
            revenue: 122000,
            stock: "Out of Stock",
            growth: "+10%",
          },
          {
            rank: 4,
            product: "Pav Bhaji Masala",
            category: "Snacks",
            units: 370,
            revenue: 108000,
            stock: "In Stock",
            growth: "+9%",
          },
          {
            rank: 5,
            product: "Biryani Masala",
            category: "Rice Mix",
            units: 320,
            revenue: 98000,
            stock: "Out of Stock",
            growth: "+7%",
          },
        ].map((item) => (
          <tr
            key={item.rank}
            className="border-b hover:bg-amber-50 transition cursor-pointer"
          >
            <td className="py-3 px-4 font-semibold text-gray-700">
              #{item.rank}
            </td>
            <td className="px-4 font-medium text-gray-800">{item.product}</td>
            <td className="px-4 text-gray-500">{item.category}</td>
            <td className="px-4">{item.units}</td>
            <td className="px-4 font-semibold text-gray-700">
              ₹{item.revenue.toLocaleString()}
            </td>
            <td className="px-4">
              <span
                className={`${
                  item.stock === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                } px-2 py-1 rounded-full text-xs font-medium`}
              >
                {item.stock}
              </span>
            </td>
            <td className="px-4 text-right">
              <span className="text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full text-xs">
                {item.growth}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



      {/* Orders Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border pl-8 pr-3 py-2 rounded-lg text-sm focus:ring-amber-200 focus:outline-none"
              />
            </div>
            <div className="flex items-center border rounded-lg px-2">
              <Filter className="text-gray-500" size={16} />
              <select
                className="ml-2 text-sm border-none outline-none bg-transparent py-1"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-2 rounded-lg text-sm hover:shadow-md hover:scale-[1.03] transition"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-amber-50 transition cursor-pointer"
                  >
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="px-4">{order.customer}</td>
                    <td className="px-4">{order.product}</td>
                    <td className="px-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4">{order.date}</td>
                    <td className="px-4 text-right font-semibold text-gray-700">
                      ₹{order.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
       {/* Pagination */}
<div className="flex justify-between items-center mt-8 text-gray-600">
  <span>
    Showing {startIndex + 1}–
    {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length} Results
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
        className={`px-3 py-1 border-t border-b border-gray-300 ${i === 0 ? "" : "border-l-0"} ${
          currentPage === i + 1 ? "bg-amber-500 text-white" : "hover:bg-gray-100"
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
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

// --- Components ---
function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg hover:-translate-y-1 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const base = "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "Delivered":
      return <span className={`${base} text-green-700 bg-green-100`}><CheckCircle size={14} /> {status}</span>;
    case "Pending":
      return <span className={`${base} text-amber-700 bg-amber-100`}><Clock size={14} /> {status}</span>;
    case "Cancelled":
      return <span className={`${base} text-red-700 bg-red-100`}><XCircle size={14} /> {status}</span>;
    default:
      return <span className={base}>{status}</span>;
  }
}
