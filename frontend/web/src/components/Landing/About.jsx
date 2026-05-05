import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="w-full bg-gray-100 py-20 px-6 md:px-20 overflow-hidden text-black">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT CONTENT */}
        <motion.div variants={fadeLeft}>
          <h1 className="text-3xl md:text-4xl font-semibold text-black leading-tight mb-6">
            Your pharma platform — <br /> Built for Healthcare & Supply Intelligence
          </h1>

          <div className="border-l-2 border-black pl-4 mb-6">
            <h3 className="font-semibold text-gray-900">
              Built for Healthcare & Supply Intelligence
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Drug Supply & Demand Intelligence
            </p>

            <div className="mt-3 space-y-1 text-black text-sm font-medium cursor-pointer">
              <p className="hover:underline">Supply Chain Insights →</p>
              <p className="hover:underline">Demand Tracker →</p>
              <p className="hover:underline">Distributor Network →</p>
            </div>
          </div>

          <div className="text-sm text-gray-500 space-y-1 mb-6">
            <p>Inventory & Stock Management</p>
            <p>Healthcare Network Integration</p>
            <p>Order & Distribution Management</p>
            <p>Analytics & Reporting</p>
            <p>Smart Dashboard</p>
            
          </div>

          <button className="px-5 py-2 border border-black text-sm font-medium hover:bg-black hover:text-white transition">
            Learn More →
          </button>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          variants={fadeRight}
          className="relative flex justify-center"
        >
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white p-3">
            
            <img
              src="/image.png"
              alt="dashboard"
              className="rounded-lg w-full h-full object-cover"
            />

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}