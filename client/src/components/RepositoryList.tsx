"use client";

import { useEffect, useState } from "react";
import { Repository } from "@/types";
import { RepositoryCard } from "./RepositoryCard";

interface RepositoryListProps {
  accessToken?: string;
}

export function RepositoryList({ accessToken }: RepositoryListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await fetch("/api/github/repositories");
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchRepositories();
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-lg rounded-2xl p-6 animate-pulse border border-indigo-100">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-0"
        >
          <RepositoryCard repository={repo} />
        </div>
      ))}
    </div>
  );
}
