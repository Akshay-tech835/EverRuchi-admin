// src/context/SubCategoryContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const SubCategoryContext = createContext();
export const useSubCategoryContext = () => useContext(SubCategoryContext);

export const SubCategoryProvider = ({ children }) => {
  const [subCategories, setSubCategories] = useState(() => {
    try {
      const raw = localStorage.getItem("subCategories");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("subCategories", JSON.stringify(subCategories));
  }, [subCategories]);

  const now = () => new Date().toISOString();

  // Add
  const addSubCategory = (subCategory) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const newSubCategory = {
      id,
      categoryId: subCategory.categoryId || "", // Link to parent category
      name: subCategory.name || "",
      description: subCategory.description || "",
      image: subCategory.image || null,
      createdAt: now(),
      updatedAt: now(),
      ...subCategory,
    };
    setSubCategories((prev) => [...prev, newSubCategory]);
    return newSubCategory;
  };

  // Edit
  const editSubCategory = (updated) => {
    setSubCategories((prev) =>
      prev.map((sc) =>
        sc.id === updated.id ? { ...sc, ...updated, updatedAt: now() } : sc
      )
    );
  };

  // Delete
  const deleteSubCategory = (id) => {
    setSubCategories((prev) => prev.filter((sc) => sc.id !== id));
  };

  const getSubCategoryById = (id) =>
    subCategories.find((sc) => sc.id === id) || null;

  // Optional: get subcategories by categoryId
  const getByCategoryId = (categoryId) =>
    subCategories.filter((sc) => sc.categoryId === categoryId);

  return (
    <SubCategoryContext.Provider
      value={{
        subCategories,
        addSubCategory,
        editSubCategory,
        deleteSubCategory,
        getSubCategoryById,
        getByCategoryId,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};
