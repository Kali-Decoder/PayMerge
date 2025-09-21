"use client";
import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your GitHub",
      description:
        "Sign in with your GitHub account and select your repository.",
    },
    {
      number: "02",
      title: "Set Bounty Amount",
      description: "Specify the total prize amount and distribution criteria.",
    },
    {
      number: "03",
      title: "Review Analysis",
      description: "Review the automated analysis of contributions.",
    },
    {
      number: "04",
      title: "Distribute Rewards",
      description: "Automatically distribute rewards using smart contracts.",
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
      id="how-it-works"
      className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:text-center"
        >
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Simple and Transparent Process
          </p>
        </motion.div>

        <div className="mt-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(124,77,255,0.15)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center group border border-indigo-100"
              >
                <motion.span
                  className="text-4xl font-bold text-indigo-400 mb-4 group-hover:text-indigo-600 transition-colors duration-200"
                  whileHover={{ color: "#7C4DFF" }}
                >
                  {step.number}
                </motion.span>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200"
                  whileHover={{ color: "#7C4DFF" }}
                >
                  {step.title}
                </motion.h3>
                <p className="text-base text-gray-500 text-center">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
