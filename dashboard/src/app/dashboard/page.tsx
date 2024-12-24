"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const branches = [5001, 5002, 5003, 5004, 5005]; // Example branch list

export default function DashboardDefaultPage() {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<number | string>("");

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const branch = Number(event.target.value);
    setSelectedBranch(branch);
    router.push(`/dashboard/${branch}/overview`); // Navigate to the branch overview
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Please select a branch or navigate to a specific section using the links below.
      </p>

      {/* Branch Selector */}
      <div className="mt-5">
        <h2 className="text-xl font-semibold text-gray-700">Select a Branch</h2>
        <select
          className="mt-2 w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleBranchChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select a branch...
          </option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              Branch {branch}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Links */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700">Quick Links</h2>
        <ul className="list-none mt-3 space-y-2">
          {branches.map((branch) => (
            <li key={branch}>
              <Link
                href={`/dashboard/${branch}/overview`}
                className="text-blue-600 hover:underline"
              >
                Branch {branch} Overview
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/dashboard/queue-metrics"
              className="text-blue-600 hover:underline"
            >
              Queue Metrics
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/performance"
              className="text-blue-600 hover:underline"
            >
              Performance Analytics
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="text-blue-600 hover:underline"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
