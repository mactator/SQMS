"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { getApiBaseUrl } from "../utils/url";

const Page = () => {
  const apiBaseUrl = getApiBaseUrl();
  const router = useRouter();

  const handleGetTicket = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}:3000/api/queue/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Empty body
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      const data = await response.json();

      if (data.success && data.ticket) {
        // Call the notification API
        const notifyResponse = await fetch(`${apiBaseUrl}:3002/notify-queue/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketNumber: data.ticket.number }),
        });

        if (!notifyResponse.ok) {
          throw new Error("Failed to notify queue");
        }

        // Navigate to the user page with the ticket number as a parameter
        router.push(`/user/${data.ticket.number}`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleGetTicket}
        className="btn btn-lg font-semibold px-12 py-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-transform transform hover:scale-105 text-white"
      >
        Get Your Ticket
      </button>
    </div>
  );
};

export default Page;
