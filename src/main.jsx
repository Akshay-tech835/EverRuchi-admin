import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProductProvider } from "./context/ProductContext"; // ✅ import context
import { UserProvider } from "./context/UserContext";
import { CategoryProvider } from "./context/CategoryContext";
import { SubCategoryProvider } from "./context/SubCategoryContext";
import { OrderProvider } from "./context/OrderContext";
import { PaymentProvider } from "./context/PaymentContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <UserProvider>
        <CategoryProvider>
          <SubCategoryProvider>
           <OrderProvider>
            <PaymentProvider>
      <App />
      </PaymentProvider>
      </OrderProvider>
      </SubCategoryProvider>
      </CategoryProvider>
      </UserProvider>
    </ProductProvider>
  </React.StrictMode>
);
