import { motion } from "framer-motion";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { RepositoryList } from "@/components/RepositoryList";
import { CreateBountyButton } from "@/components/CreateBountyButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 flex justify-center items-start"
    >
      <div className="w-full max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-indigo-100 flex flex-col gap-6"
        >
          <div className="flex justify-between items-center border-b border-indigo-100 pb-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 drop-shadow-lg">
              Your Repositories
            </h1>
            <CreateBountyButton />
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.01,
            boxShadow: "0 8px 32px rgba(124,77,255,0.12)",
          }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100 transition hover:shadow-xl"
        >
          <RepositoryList accessToken={session?.accessToken} />
        </motion.div>
      </div>
    </motion.div>
  );
}
