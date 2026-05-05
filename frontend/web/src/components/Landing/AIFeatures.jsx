import React from "react";
import { motion } from "framer-motion";

/* Animation configs */
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

/* Reusable components */
const Card = ({ children, className }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -5 }}
    className={`rounded-xl p-6 bg-white text-black border border-gray-200 shadow-sm transition ${className}`}
  >
    {children}
  </motion.div>
);

const Tag = ({ children }) => (
  <span className="px-3 py-1 bg-gray-100 rounded-full font-medium text-xs">
    {children}
  </span>
);

/* Main component */
export default function AIFeatures() {
  return (
    <div className="bg-white px-6 md:px-20 py-20">
      {/* Header Section */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">
          How Our Architecture Works
        </h1>
        <p className="text-lg text-gray-600">
          We leverage a modern, robust tech stack to deliver fast, scalable, and
          secure applications. Here is a breakdown of the core technologies
          powering our platform.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6 auto-rows-[220px]"
      >
        {/* CARD 1: Frontend */}
        <Card className="col-span-2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-3 inline-block">
              Frontend
            </span>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Built for speed and interactivity with React.
            </h2>
            <p className="text-sm text-gray-600">
              Our user interface is built using React to provide a fluid,
              component-driven, and highly responsive experience across all
              devices.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs mt-4">
            {["React", "Tailwind CSS", "Framer Motion", "JavaScript", "Vite"].map(
              (item) => (
                <Tag key={item}>{item}</Tag>
              )
            )}
          </div>
        </Card>

        {/* CARD 2: Backend */}
        <Card className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-md mb-3 inline-block">
              Backend
            </span>
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Powered by Django.
            </h2>
            <p className="text-sm text-gray-600">
              Robust business logic, secure user authentication, and intelligent
              data processing run on Python's Django framework.
            </p>
          </div>

        </Card>

        {/* CARD 3: Database */}
        <Card className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded-md mb-3 inline-block">
              Database
            </span>
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Dynamic storage with MongoDB.
            </h2>
            <p className="text-sm text-gray-600">
              A flexible, document-oriented NoSQL database designed to handle
              unstructured data efficiently and scale as we grow.
            </p>
          </div>

          <div className="mt-4">
            <span className="px-3 py-1 bg-purple-50 text-black rounded-full text-sm font-semibold border border-purple-100">
              🍃 NoSQL
            </span>
          </div>
        </Card>

        {/* CARD 4: Integration */}
        <Card className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded-md mb-3 inline-block">
              Integration
            </span>
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              How the system communicates.
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
              UI
            </div>
            <div className="text-xs text-gray-400 font-bold">→</div>
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
              API
            </div>
            <div className="text-xs text-gray-400 font-bold">→</div>
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
              DB
            </div>
          </div>
        </Card>

        {/* CARD 5: Architecture */}
        <Card className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 bg-gray-50 px-2 py-1 rounded-md mb-3 inline-block">
              Architecture
            </span>
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              Built for performance.
            </h2>
            <p className="text-sm text-gray-600">
              Our infrastructure is optimized to provide high availability and
              continuous deployment with zero downtime.
            </p>
          </div>

          <div className="mt-4">
            <button
              aria-label="Learn more about architecture"
              className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition shadow-sm"
            >
              Learn More
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}