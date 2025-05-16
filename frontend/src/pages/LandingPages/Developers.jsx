import React from "react";
import { motion } from "framer-motion";

// Developer data array
const developers = [
  {
    name: "ASHAR PERWEZ",
    regNumber: "21105109009",
    email: "asharperwez@gmail.com",
    description: "MERN Stack | Tailwind | MongoDB | REST APIs",
    image: "/Ashar.jpg",
  },
  {
    name: "ANKIT KUMAR",
    regNumber: "21105109036",
    email: "kumarsinghankit922@gmail.com",
    description: "MERN Stack | React | Node.js | Docker |  Express | Socket.IO ",
    image: "/Ankit.jpg",
  },
  {
    name: "SHIVANI",
    regNumber: "22105109902",
    email: "shivani3806@gmail.com",
    description: "Full Stack | Next.js | Tailwind | MongoDB | Framer Motion",
    image: "/Shivani.jpg",
  },
  {
    name: "CHANDA KUMARI",
    regNumber: "22105109905",
    email: "chandakri5241@gmail.com",
    description: "React | Python | Tailwind | PostgreSQL",
    image: "/Chanda.jpg",
  },
];

// Animation variant for entrance
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Developers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 flex flex-col items-center">
      <h2 className="text-white text-4xl font-bold mt-44 mb-12">Meet Our Developers</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl">
        {developers.map((dev, i) => (
          <motion.div
            key={dev.regNumber}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.07,
              boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.6)",
              transition: { duration: 0.3 },
            }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 transition-transform duration-300"
          >
            <img
              src={dev.image}
              alt={dev.name}
              className="w-28 h-28 object-cover rounded-full border-4 border-indigo-500 shadow-md"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{dev.name}</h3>
              <p className="text-sm text-gray-500">{dev.regNumber}</p>
              <p className="text-sm text-indigo-600 font-medium">{dev.email}</p>
              <p className="text-gray-600 mt-2 text-sm">{dev.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
