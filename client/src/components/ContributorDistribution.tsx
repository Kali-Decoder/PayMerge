"use client";

import { useState, useEffect } from "react";
import { Contributor } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";
import { useAccount, useWriteContract } from "wagmi";

import Image from "next/image";
import { useDataContext } from "@/context/UserContext";

interface ContributorDistributionProps {
  repositoryId: string;
  accessToken?: string;
}

export function ContributorDistribution({
  repositoryId,
  accessToken,
}: ContributorDistributionProps) {
  const { address, chain } = useAccount();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalBounty, setTotalBounty] = useState<number>(0);
  const [walletAddresses, setWalletAddresses] = useState<
    Record<string, string>
  >({});

  const { distributeFunds, getTokenDetails } = useDataContext();
  const [tokenAddress, setTokenAddress] = useState("");

  const [percentageArray, setPercentageArray] = useState<number[]>([]);

  const [tokenDetails, setTokenDetails] = useState<any>({});

  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch(
          `/api/github/repositories/${repositoryId}/contributors`
        );
        if (!response.ok) throw new Error("Failed to fetch contributors");
        const data = await response.json();
        setContributors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchContributors();
    }
  }, [repositoryId, accessToken]);

  const addContributors = async (
    contributors: any[],
    walletAddresses: any,
    totalBounty: number
  ) => {
    let getPercentageArray = contributors.map((contributor) => {
      return Math.floor(contributor?.contributionPercentage);
    });
    let _walletAddresses = Object.values(walletAddresses);
    console.log(
      "Wallet Addresses",
      _walletAddresses,
      contributors,
      tokenAddress
    );
    console.log("_walletAddresses Array", _walletAddresses);
    setPercentageArray(getPercentageArray);
    if (contributors.length !== _walletAddresses.length) {
      console.log("Contributors and Wallet Addresses length should be same");
      return;
    }
    if (!tokenAddress) {
      console.log("Token Address is required");
      return;
    }

    const tx = await distributeFunds(
      _walletAddresses,
      address,
      getPercentageArray,
      totalBounty,
      tokenAddress
    );
    if (tx?.hash) {
      setTransactionHash(tx.hash);
    }
  };

  const handleWalletAddressChange = (
    contributorId: string,
    address: string
  ) => {
    setWalletAddresses((prev) => ({
      ...prev,
      [contributorId]: address,
    }));
  };

  const isValidAddress = (address: string) => {
    try {
      return ethers.isAddress(address);
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-8 rounded-2xl shadow-lg border border-indigo-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-indigo-700 drop-shadow-lg">
            Contribution Distribution
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-sm text-gray-500">Total Bounty</span>
            <Input
              type="number"
              min="0"
              step="0.1"
              value={totalBounty}
              onChange={(e) => setTotalBounty(Number(e.target.value))}
              className="w-full sm:w-24 border border-indigo-100 rounded-lg"
            />
            <Input
              type="text"
              value={tokenAddress}
              placeholder="Bounty Token Address"
              onChange={async (e) => {
                setTokenAddress(e.target.value);
                if (tokenAddress) {
                  let result = await getTokenDetails(tokenAddress);
                  setTokenDetails(result);
                }
              }}
              className="w-full sm:w-64 border border-indigo-100 rounded-lg"
            />
          </div>
        </div>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm sm:text-md text-gray-500 font-bold">
              Token Name
            </span>
            <span className="text-sm sm:text-md text-green-600 font-semibold">
              {tokenDetails?.name}
            </span>
            <span className="text-sm sm:text-md text-gray-500 font-bold">
              Token Symbol
            </span>
            <span className="text-sm sm:text-md text-green-600 font-semibold">
              {tokenDetails?.symbol}
            </span>
            <span className="text-sm sm:text-md text-gray-500 font-bold">
              Token Balance
            </span>
            <span className="text-sm sm:text-md text-green-600 font-semibold">
              {tokenDetails?.balance / 1e6} USDC
            </span>
          </div>
        </div>
        <div className="space-y-6 mt-6">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-white rounded-xl shadow border border-indigo-100 hover:shadow-lg transition-all gap-4"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <Image
                  src={contributor.avatarUrl}
                  alt={contributor.login}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-indigo-100 shadow"
                  height={48}
                  width={48}
                />
                <div>
                  <h3 className="font-bold text-indigo-700 text-base sm:text-lg">
                    {contributor.login}
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {contributor.contributionPercentage}% contribution (
                    {contributor.contributions.commits} commits,{" "}
                    {contributor.contributions.pullRequests} PRs,{" "}
                    {contributor.contributions.reviews} reviews)
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                <div className="text-right">
                  <div className="font-bold text-green-600 text-sm sm:text-base">
                    {(
                      (totalBounty *
                        (contributor.contributionPercentage ?? 0)) /
                      100
                    ).toFixed(4)}{" "}
                    {tokenDetails?.symbol}
                  </div>
                </div>
                <Input
                  placeholder="Wallet Address"
                  value={walletAddresses[contributor.id] || ""}
                  onChange={(e) =>
                    handleWalletAddressChange(contributor.id, e.target.value)
                  }
                  className={`w-full sm:w-64 border rounded-lg ${
                    walletAddresses[contributor.id] &&
                    !isValidAddress(walletAddresses[contributor.id])
                      ? "border-red-500"
                      : "border-indigo-100"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all w-full sm:w-auto"
            onClick={async () => {
              await addContributors(contributors, walletAddresses, totalBounty);
            }}
          >
            Distribute Bounty
          </button>
          {transactionHash && (
            <a
              href={`https://sepolia.basescan.org/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold underline text-sm"
            >
              View Transaction
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
