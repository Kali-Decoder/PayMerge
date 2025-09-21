import Link from "next/link";
import { Repository } from "@/types";
import { GitBranch, StarIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition-shadow border border-indigo-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FaGithub className="h-6 w-6 text-gray-800" />
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-700 border border-green-200">
            Public
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-indigo-700 uppercase flex items-center gap-2">
            {repository.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {repository.description || "No description provided"}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
            <StarIcon className="h-4 w-4 mr-1" />
            <span>{repository.stars || 0}</span>
          </div>
          <div className="flex items-center font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            <GitBranch className="h-4 w-4 mr-1" />
            <span>{repository.forks || 0}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          href={`/dashboard/repositories/${repository.id}`}
          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
        >
          Set up bounty →
        </Link>
      </div>
    </div>
  );
}
