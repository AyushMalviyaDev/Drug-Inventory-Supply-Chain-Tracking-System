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

const developers = [
  {
    name: "Ayush Malviya",
    role: "Full Stack Developer",
    desc: "Focused on building scalable backend systems and integrating APIs for seamless data flow.",
  },
  {
    name: "Arpita Sharma",
    role: "Backend Developer",
    desc: "",
  },
  {
    name: "Anurag Vaishnav",
    role: "UI/UX",
    desc: "Designs clean and responsive interfaces with a strong focus on user experience.",
  },
  {
    name: "Ayukti Thakur",
    role: "AI/ML Engineer",
    desc: "Builds intelligent models for demand prediction and analytics in pharma systems.",
  },
];

export default function Credits() {
  return (
    <div className="bg-gray-100 py-20 px-6 md:px-20">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-black">
          Meet the Team
        </h1>
        <p className="text-gray-600 mt-4">
          The minds behind PharmaLink
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {developers.map((dev, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="group p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition">
              {dev.name.charAt(0)}
            </div>

            {/* Name */}
            <h2 className="text-lg font-semibold text-black">
              {dev.name}
            </h2>

            {/* Role */}
            <p className="text-sm text-gray-500 mb-3">
              {dev.role}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-600">
              {dev.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}