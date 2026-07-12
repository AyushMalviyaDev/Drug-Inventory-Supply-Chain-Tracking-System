import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();

  const roles = [
    { value: "manufacturer", label: "Manufacturer" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "distributor", label: "Distributor" },
    { value: "transporter", label: "Transporter" },
  ];

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
    tc: false,
    role: "manufacturer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRoleSelect = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // ✅ frontend validation
    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }

    if (!form.tc) {
      setError("Please accept Terms & Conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/user/register/",
        form
      );

      localStorage.setItem("email", form.email);
      navigate("/verify", { state: { email: form.email } });

    } catch (err) {
      if (err.response?.data) {
        const errors = err.response.data;
        const firstError = Object.values(errors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-black">
            Create account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose your role to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role Selection (cards UI) */}
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => (
              <div
                key={r.value}
                onClick={() => handleRoleSelect(r.value)}
                className={`p-3 border rounded-xl cursor-pointer text-center text-sm font-medium transition
                  ${form.role === r.value
                    ? "border-black bg-gray-100"
                    : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {r.label}
              </div>
            ))}
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="tc"
              onChange={handleChange}
              required
            />
            Accept Terms & Conditions
          </label>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>

      </motion.div>
    </div>
  );
}