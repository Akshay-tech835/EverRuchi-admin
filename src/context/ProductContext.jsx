import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const ProductContext = createContext();

// Custom hook
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  // Load products from localStorage if available
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  // Save products to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Add product with 100% unique ID
  const addProduct = (newProduct) => {
    const id = crypto.randomUUID(); // SAFE UNIQUE ID
    setProducts((prev) => [...prev, { ...newProduct, id }]);
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Edit product
  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, editProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
