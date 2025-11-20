import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();
export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem("orders");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const now = () => new Date().toISOString();

  const addOrder = (order) => {
    const id = crypto?.randomUUID?.() || `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newOrder = {
      id,
      customerName: order.customerName || "",
      product: order.product || "",
      quantity: order.quantity || 1,
      price: order.price || 0,
      notes: order.notes || "",
      status: order.status || "Pending",
      createdAt: now(),
      updatedAt: now(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return newOrder;
  };

  const editOrder = (updated) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === updated.id
          ? { ...o, ...updated, updatedAt: now() }
          : o
      )
    );
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, editOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
