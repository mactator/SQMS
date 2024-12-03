"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { getApiGatewayOrigin } from "../utils/url";
import { Loading01Icon } from "hugeicons-react";
import { motion } from "framer-motion";

const Page = () => {
  const apiBaseUrl = getApiGatewayOrigin();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleGetTicket = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/api/queue/`, {
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
        const notifyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STREAM_SERVICE}/notify-queue/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ticketNumber: data.ticket.number }),
          }
        );

        if (!notifyResponse.ok) {
          throw new Error("Failed to notify queue");
        }

        // Navigate to the user page with the ticket number as a parameter
        router.push(`/user/${data.ticket.number}`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      setError(error.message ?? error);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {error && <div className="text-red-700">{error}</div>}
      <button
        disabled={loading}
        onClick={handleGetTicket}
        className="btn btn-lg font-semibold px-12 py-3 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-transform transform hover:scale-105 text-white"
      >
        {loading && (
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
            }}
          >
            <Loading01Icon />
          </motion.div>
        )}
        Get Your Ticket
      </button>
    </div>
  );
};

export default Page;
