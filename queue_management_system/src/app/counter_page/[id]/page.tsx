"use client";
import React, { useState } from "react";
import { getApiGatewayOrigin } from "../../utils/url";
import { useParams } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

const Page = () => {
  const { id: counterId } = useParams();
  const apiBaseUrl = getApiGatewayOrigin();
  // let currentTicket = undefined;
  const [currentTicket, setCurrentTicket] = useState<number | undefined>();

  const [fullQueue, setFullQueue] = React.useState<{ number: number }[]>([]);

  const [error, setError] = useState();

  // Set up SSE for the full queue
  React.useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_STREAM_SERVICE}/stream-queue/`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Ensure data matches expected structure
        console.log("Received SSE queue data:", data); // Debugging log
        setFullQueue(data); // Replace entire state with the latest data
      } catch (error) {
        console.error("Error parsing SSE queue data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error for queue:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleNextCustomer = async () => {
    try {
      // Step 3.a: Call the first API to get the next ticket
      const queueResponse = await fetch(`${apiBaseUrl}/api/queue/next/`);

      // Call notify-queue API regardless of the response
      fetch(`${process.env.NEXT_PUBLIC_STREAM_SERVICE}/notify-queue/`, {
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
      // currentTicket = ticketNumber;
      setCurrentTicket(ticketNumber);
      console.log("currentTicket = " + ticketNumber);

      // Step 3.b: Notify using the ticket number
      const notifyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STREAM_SERVICE}/notify/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket: {
              number: ticketNumber,
            },
            counter: counterId,
          }),
        }
      );

      if (!notifyResponse.ok) {
        throw new Error("Failed to notify.");
      }

      // alert(`Customer with ticket number ${ticketNumber} has been notified!`);
    } catch (error: any) {
      console.error(error);
      // alert(`Error: ${error}`);
      setError(error.message ?? error);
    }
  };

  return (
    <div className="flex flex-col gap-16 justify-center items-center h-screen">
      <div className="text-red-700">{error}</div>
      {/* Full Queue Display */}
      <div className="mt-8 p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {fullQueue.length > 0 ? (
            fullQueue.map((ticket) => (
              <div
                key={ticket.number}
                className="bg-gray-200 shadow-md p-4 rounded-lg text-center"
              >
                <p className="text-lg font-medium">Ticket #{ticket.number}</p>
              </div>
            ))
          ) : (
            <p>Loading queue...</p>
          )}
        </div>
      </div>
      <button
        key={currentTicket}
        className="pointer-events-none btn btn-lg h-28 w-36 font-semibold p-2 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-transform transform hover:scale-105"
      >
        Serving:{" "}
        <div className="bg-gray-200 shadow-md p-4 rounded-lg text-center">
          <p className="text-lg font-medium">Ticket #{currentTicket}</p>
        </div>
      </button>
      <button
        onClick={handleNextCustomer}
        className="btn btn-lg flex justify-center items-center font-semibold px-12 py-3 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-transform transform hover:scale-105"
      >
        Next Customer
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Page;
