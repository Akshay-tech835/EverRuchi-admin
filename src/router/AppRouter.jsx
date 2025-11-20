import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Categories from "../pages/categories/Categories";
import ProfileSettings from "../pages/profile/ProfileSettings";
import PaymentList from "../pages/payment/PaymentList";
import AddPayment from "../pages/payment/AddPaymentModal";

import Login from "../pages/Login";
import ProductList from "../pages/products/ProductList";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProductModal";
import EditUser from "../pages/users/EditUserModal";
import AddUser from "../pages/users/AddUser";
import UsersList from "../pages/users/UserList";
import EditCategory from "../pages/categories/EditCategoryModal";
import AddCategory from "../pages/categories/AddCategory";
import CategoryList from "../pages/categories/CategoryList";

import EditSubCategory from "../pages/subCategory/EditSubCategoryModal";
import AddSubCategory from "../pages/subCategory/AddSubCategory";
import SubCategoryList from "../pages/subCategory/SubCategoryList";

import EditOrder from "../pages/orders/EditOrderModal";
import AddOrder from "../pages/orders/AddOrder";
import OrderList from "../pages/orders/OrderList";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Login page outside layout */}
        <Route path="/login" element={<Login />} />

        {/* Admin pages inside layout */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Product routes */}
          
          <Route path="products/list" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />  
          {/* Other pages */}
          <Route path="categories" element={<Categories />} />
          
         
          {/* category Routes */}
          <Route path="categories/list" element={<CategoryList />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
           {/* sub category Routes */}
          <Route path="subCategory/list" element={<SubCategoryList />} />
          <Route path="subCategory/add" element={<AddSubCategory />} />
          <Route path="subCategory/edit/:id" element={<EditSubCategory />} />
          {/* user Routes */}
          <Route path="users/list" element={<UsersList />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
           {/* order Routes */}
            <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="orders/list" element={<OrderList />} />
          <Route path="orders/add" element={<AddOrder />} />
          <Route path="orders/edit/:id" element={<EditOrder />} /> 
           {/* Payments (only list) */}
            <Route path="/payment/list" element={<PaymentList />} />
            <Route path="/payment/add" element={<AddPayment />} />
        </Route>
      </Routes>
    </Router>
  );
}
