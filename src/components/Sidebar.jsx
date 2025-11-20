import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Layers,
  FolderTree,
  LogOut,
  Receipt,
  ClipboardList,
   Menu,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  List,
} from "lucide-react";
import { Link, useLocation, useNavigate  } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showUsersMenu, setShowUsersMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
    const [showSubCategoriesMenu, setSubShowCategoriesMenu] = useState(false);
    const [showOrdersMenu, setShowOrdersMenu] = useState(false);
    const [showPaymentMenu, setShowPaymentMenu] = useState(false);
const navigate = useNavigate();

const handleLogout = () => {
  // Remove saved login data
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");

  // Redirect
  navigate("/login");
};


  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    //{ name: "Category", icon: <ShoppingCart size={20} />, path: "/categories" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 text-gray-100 min-h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold text-amber-400 ${!isOpen && "hidden"}`}>
          Everruchi
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-amber-400"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 mx-2 rounded-md hover:bg-gray-800 transition ${
              location.pathname === item.path ? "bg-gray-800 text-amber-400" : ""
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}

        {/* Products Dropdown */}
        <div className="mx-2">
          <button
            onClick={() => setShowProductsMenu(!showProductsMenu)}
            className={`flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-800 transition ${
              location.pathname.includes("/products")
                ? "bg-gray-800 text-amber-400"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Package size={20} />
              {isOpen && <span>Products</span>}
            </div>
            {isOpen &&
              (showProductsMenu ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              ))}
          </button>

          {showProductsMenu && (
            <div className="ml-8 mt-1 space-y-1">
              <Link
                to="/products/list"
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
                  location.pathname === "/products/list" ? "text-amber-400" : ""
                }`}
              >
                <List size={16} /> {isOpen && "Product List"}
              </Link>

              <Link
                to="/products/add"
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
                  location.pathname === "/products/add" ? "text-amber-400" : ""
                }`}
              >
                <PlusCircle size={16} /> {isOpen && "Add Product"}
              </Link>
            </div>
          )}
        </div>

        {/* Users Dropdown */}
        <div className="mx-2 mt-2">
          <button
            onClick={() => setShowUsersMenu(!showUsersMenu)}
            className={`flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-800 transition ${
              location.pathname.includes("/users")
                ? "bg-gray-800 text-amber-400"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              {isOpen && <span>Users</span>}
            </div>

            {isOpen &&
              (showUsersMenu ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              ))}
          </button>

          {showUsersMenu && (
            <div className="ml-8 mt-1 space-y-1">
              <Link
                to="/users/list"
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
                  location.pathname === "/users/list" ? "text-amber-400" : ""
                }`}
              >
                <List size={16} /> {isOpen && "User List"}
              </Link>

              <Link
                to="/users/add"
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
                  location.pathname === "/users/add" ? "text-amber-400" : ""
                }`}
              >
                <PlusCircle size={16} /> {isOpen && "Add User"}
              </Link>
            </div>
          )}
        </div>
{/* Categories Dropdown */}
<div className="mx-2 mt-2">
  <button
    onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
    className={`flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-800 transition ${
      location.pathname.includes("/categories")
        ? "bg-gray-800 text-amber-400"
        : ""
    }`}
  >
    <div className="flex items-center gap-3">
     <Layers size={20} />
      {isOpen && <span>Categories</span>}
    </div>

    {isOpen &&
      (showCategoriesMenu ? (
        <ChevronDown size={18} />
      ) : (
        <ChevronRight size={18} />
      ))}
  </button>

  {showCategoriesMenu && (
    <div className="ml-8 mt-1 space-y-1">
      <Link
        to="/categories/list"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/categories/list" ? "text-amber-400" : ""
        }`}
      >
        <List size={16} /> {isOpen && "Category List"}
      </Link>

      <Link
        to="/categories/add"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/categories/add" ? "text-amber-400" : ""
        }`}
      >
        <PlusCircle size={16} /> {isOpen && "Add Category"}
      </Link>
    </div>
  )}
</div>

{/* subCategories Dropdown */}
<div className="mx-2 mt-2">
  <button
    onClick={() => setSubShowCategoriesMenu(!showSubCategoriesMenu)}
    className={`flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-800 transition ${
      location.pathname.includes("/subCategory")
        ? "bg-gray-800 text-amber-400"
        : ""
    }`}
  >
    <div className="flex items-center gap-3">
      <FolderTree size={20} />
      {isOpen && <span>Sub Category</span>}
    </div>

    {isOpen &&
      (showSubCategoriesMenu ? (
        <ChevronDown size={18} />
      ) : (
        <ChevronRight size={18} />
      ))}
  </button>

  {showSubCategoriesMenu && (
    <div className="ml-8 mt-1 space-y-1">
      {/* Category Links */}
      <Link
        to="/subCategory/list"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/subCategory/list" ? "text-amber-400" : ""
        }`}
      >
        <List size={16} /> {isOpen && "Sub Category List"}
      </Link>

      <Link
        to="/categories/add"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/subCategory/add" ? "text-amber-400" : ""
        }`}
      >
        <PlusCircle size={16} /> {isOpen && "Add Sub Category"}
      </Link>

     
    </div>
  )}
</div>

{/* Orders Dropdown */}
<div className="mx-2 mt-2">
  <button
    onClick={() => setShowOrdersMenu(!showOrdersMenu)}
    className={`flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-800 transition ${
      location.pathname.includes("/orders")
        ? "bg-gray-800 text-amber-400"
        : ""
    }`}
  >
    <div className="flex items-center gap-3">
      <ClipboardList size={20} />

      {isOpen && <span>Orders</span>}
    </div>

    {isOpen &&
      (showOrdersMenu ? (
        <ChevronDown size={18} />
      ) : (
        <ChevronRight size={18} />
      ))}
  </button>

  {showOrdersMenu && (
    <div className="ml-8 mt-1 space-y-1">
      <Link
        to="/orders/list"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/orders/list" ? "text-amber-400" : ""
        }`}
      >
        <List size={16} /> {isOpen && "Order List"}
      </Link>

      <Link
        to="/orders/add"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/orders/add" ? "text-amber-400" : ""
        }`}
      >
        <PlusCircle size={16} /> {isOpen && "Add Order"}
      </Link>
    </div>
  )}
</div>

{/* Payments Dropdown */}
<div className="mx-2 mt-2">
  <button
    onClick={() => setShowPaymentMenu(!showPaymentMenu)}
    className={`flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-800 transition ${
      location.pathname.includes("/payment")
        ? "bg-gray-800 text-amber-400"
        : ""
    }`}
  >
    <div className="flex items-center gap-3">
      <Receipt size={20} />
      {isOpen && <span>Payments</span>}
    </div>

    {isOpen &&
      (showPaymentMenu ? (
        <ChevronDown size={18} />
      ) : (
        <ChevronRight size={18} />
      ))}
  </button>

  {showPaymentMenu && (
    <div className="ml-8 mt-1 space-y-1">
      <Link
        to="/payment/list"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/payment/list" ? "text-amber-400" : ""
        }`}
      >
        <List size={16} /> {isOpen && "Payment List"}
      </Link>

      <Link
        to="/payment/add"
        className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 text-sm ${
          location.pathname === "/payment/add" ? "text-amber-400" : ""
        }`}
      >
        <PlusCircle size={16} /> {isOpen && "Add Payment"}
      </Link>
    </div>
  )}
</div>



      </nav>

      {/* Footer */}
     <div
  onClick={handleLogout}
  className="p-4 border-t border-gray-700 flex items-center gap-3 cursor-pointer hover:bg-gray-800"
>
  <LogOut size={20} />
  {isOpen && <span>Logout</span>}
</div>

    </div>
  );
}
