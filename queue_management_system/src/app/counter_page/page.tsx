"use client";
import React from "react";
import { getApiBaseUrl } from "../utils/url";

const Page = () => {
  const apiBaseUrl = getApiBaseUrl();
  const handleNextCustomer = async () => {
    try {
      // Step 3.a: Call the first API to get the next ticket
      const queueResponse = await fetch(`${apiBaseUrl}:3000/api/queue/next/`);

      // Call notify-queue API regardless of the response
      await fetch(`${apiBaseUrl}:3002/notify-queue/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: queueResponse.ok ? "success" : "failure",
        }),
      });

      if (!queueResponse.ok) {
        throw new Error("Failed to fetch the next ticket.");
      }

      const queueData = await queueResponse.json();

      const ticketNumber = queueData?.ticket?.number;
      if (!ticketNumber) {
        throw new Error("Invalid ticket data received.");
      }

      // Step 3.b: Notify using the ticket number
      const notifyResponse = await fetch(`${apiBaseUrl}:3002/notify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket: {
            number: ticketNumber,
          },
          counter: "c2",
        }),
      });

      if (!notifyResponse.ok) {
        throw new Error("Failed to notify.");
      }

      alert(`Customer with ticket number ${ticketNumber} has been notified!`);
    } catch (error) {
      console.error(error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleNextCustomer}
        className="btn btn-lg font-semibold px-12 py-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-transform transform hover:scale-105"
      >
        Next Customer
      </button>
    </div>
  );
};

export default Page;
