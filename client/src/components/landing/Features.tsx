"use client";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "Automatic Analysis",
      description:
        "Analyze contributions based on commits, pull requests, and code quality",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Fair Distribution",
      description: "Distribute rewards based on quantifiable contributions",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Smart Contracts",
      description: "Automated payouts using blockchain technology",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <div
      id="features"
      className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:text-center"
        >
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Better way to reward contributors
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Automate your hackathon prize distribution with blockchain
            technology and GitHub integration.
          </p>
        </motion.div>

        <div className="mt-12">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(124,77,255,0.15)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-start group border border-indigo-100"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-200"
                >
                  {feature.icon}
                </motion.div>
                <motion.p
                  className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200"
                  whileHover={{ color: "#7C4DFF" }}
                >
                  {feature.title}
                </motion.p>
                <p className="text-base text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
