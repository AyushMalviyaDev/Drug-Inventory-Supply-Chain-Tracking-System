import React, { useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // hook your backend API here
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center pt-10 px-8 md:px-30 max-w-9xl"
      >
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl md:text-7xl font-bold leading-tight"
        >
          Get in touch with our team
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-gray-600 max-w-2xl"
        >
          Have questions about PharmaLink, need support, or want to partner with us?
          Fill out the form and our team will get back to you shortly.
        </motion.p>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="mt-10 max-w-2xl flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-black"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-md font-semibold transition"
          >
            Send Message
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}