import React, { createContext, useContext, useState, useEffect } from "react";

const CategoryContext = createContext();
export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    try {
      const raw = localStorage.getItem("userCategories");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Failed to parse categories from localStorage", err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("userCategories", JSON.stringify(categories));
    } catch (err) {
      console.error("Failed to save categories", err);
    }
  }, [categories]);

  const now = () => new Date().toISOString();

  const addCategory = (category) => {
    const id = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const newCategory = {
      id,
      name: category.name || "",
      description: category.description || "",
      image: category.image || null, // store Base64 here
      createdAt: now(),
      updatedAt: now(),
      ...category,
    };

    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const editCategory = (updated) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? { ...c, ...updated, updatedAt: now() } : c))
    );
  };

  const deleteCategory = (id) => setCategories((prev) => prev.filter((c) => c.id !== id));

  const getCategoryById = (id) => categories.find((c) => c.id === id) || null;

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, editCategory, deleteCategory, getCategoryById }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
