import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

export default function Hero() {
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
          className="text-3xl md:text-7xl font-bold leading-tight "
        >
          Make your pharmaceutical network smarter — in supply, analytics, and beyond
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-gray-600 max-w-2xl"
        >
          See what hospitals need, fix supply gaps, deliver medicines faster, and track your operations — that’s what a modern pharma platform should do.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-4 mt-8"
        >
          <Link
            to="/register"
            className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-md font-semibold transition"
          >
            Sign up for PharmaLink
          </Link>

          <Link
            to="/login"
            className="border border-black px-6 py-3 rounded-md font-semibold hover:bg-black hover:text-white transition"
          >
            Start for Free
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}