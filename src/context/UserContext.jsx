import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Load from localStorage
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem("users");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Failed to parse users from localStorage", err);
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (err) {
      console.error("Failed to save users", err);
    }
  }, [users]);

  const now = () => new Date().toISOString();

  // ➕ Add User
  const addUser = (user) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const newUser = {
      id,
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",     // ✅ Added
      password: user.password || "",
      role: user.role || "Staff",
      status: user.status || "Active",
      profileImage: user.profileImage || null,
      createdAt: now(),
      updatedAt: now(),
      ...user,
    };

    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  // ✏️ Edit User
  const editUser = (updated) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === updated.id
          ? { ...u, ...updated, updatedAt: now() }
          : u
      )
    );
  };

  // ❌ Delete User
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // 🔍 Get User
  const getUserById = (id) => users.find((u) => u.id === id) || null;

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        editUser,
        deleteUser,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
