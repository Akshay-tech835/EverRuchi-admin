import React, { createContext, useContext, useState, useEffect } from "react";

const PaymentContext = createContext();
export const usePaymentContext = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState(() => {
    try {
      const raw = localStorage.getItem("payments");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  const now = () => new Date().toISOString();

  // 👉 ADD PAYMENT (FINAL FIXED)
  const addPayment = (payment) => {
    const id =
      crypto?.randomUUID?.() ||
      `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const newPayment = {
      id,
      customerId: payment.customerId || "",
      customer: payment.customer || "",
      product: payment.product || "",
      quantity: Number(payment.quantity),         // ensure number
      price: payment.price || null,              // optional
      amount: Number(payment.amount),            // ensure number → FIX NaN
      status: (payment.status || "pending").toLowerCase(), // always lowercase
      notes: payment.notes || "",
      createdAt: now(),
    };

    setPayments((prev) => [...prev, newPayment]);
  };

  // 👉 DELETE PAYMENT
  const deletePayment = (id) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PaymentContext.Provider
      value={{ payments, addPayment, deletePayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
