import React, { useState } from "react";
import { api } from "../api";

export default function CreateDrugForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    expiry_date: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("inventory/create-drug/", form);
      alert("Drug created successfully");
      setForm({ name: "", description: "", quantity: "", expiry_date: "", price: "" });
      if (onCreated) onCreated();
    } catch (err) {
      alert("Failed to create drug");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <h2 className="text-lg font-semibold mb-3">Create New Drug</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Drug Name" required className="px-3 py-2 border rounded" />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" required className="px-3 py-2 border rounded" />
        <input name="expiry_date" type="date" value={form.expiry_date} onChange={handleChange} required className="px-3 py-2 border rounded" />
        <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" required className="px-3 py-2 border rounded" />
      </div>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 border rounded mt-4" />
      <button type="submit" disabled={loading} className="mt-4 bg-black text-white px-4 py-2 rounded">
        {loading ? "Creating..." : "Create Drug"}
      </button>
    </form>
  );
}