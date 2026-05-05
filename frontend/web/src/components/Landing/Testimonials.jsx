import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const testimonials = [
  {
    name: "Sumit Sharma",
    role: "",
    feedback:
      "PharmaLink completely transformed how we track inventory. We reduced expired stock by nearly 30% within months.",
  },
  {
    name: "Harshal Jain",
    role: "",
    feedback:
      "The real-time insights and alerts help us maintain stock levels efficiently. It’s simple and extremely effective.",
  },
  {
    name: "Ayush Gupta",
    role: "",
    feedback:
      "Managing supply chains across multiple hospitals has never been easier. Everything is streamlined and transparent.",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white py-20 px-6 md:px-20">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-black">
          What Our Users Say
        </h1>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid md:grid-cols-3 gap-8"
      >
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition duration-300"
          >
            {/* Feedback */}
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              “{item.feedback}”
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-black">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}