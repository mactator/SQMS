"use client";
import Display from "@/components/display";
import React from "react";
import { getApiBaseUrl } from "../utils/url";
import FadingWaitingText from "@/components/fading_waiting_text";

const Page = () => {
  const [counterValues, setCounterValues] = React.useState<
    Record<string, number>
  >({});
  const [fullQueue, setFullQueue] = React.useState<{ number: number }[]>([]); // Ensure fullQueue structure matches expected API response
  const [isAnimating, setIsAnimating] = React.useState(false);
  const apiBaseUrl = getApiBaseUrl();

  // Set up SSE for counter values
  React.useEffect(() => {
    const eventSource = new EventSource(`${apiBaseUrl}:3002/stream/`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Ensure data matches expected structure
        console.log("Received SSE data:", data); // Debugging log
        setCounterValues(data); // Replace entire state with the latest data
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error for counter values:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Set up SSE for the full queue
  React.useEffect(() => {
    const eventSource = new EventSource(`${apiBaseUrl}:3002/stream-queue/`);

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

  return (
    <div>
      <div className="flex flex-col v-screen my-1">
        <h1 className="text-2xl font-bold mb-4 text-center py-8">
          Waiting Room
        </h1>
        <div className="flex flex-row justify-evenly">
          {Object.keys(counterValues).length > 0 ? (
            Object.entries(counterValues).map(([key, value]) => (
              <Display
                key={key}
                counterName={key}
                counter={value}
                isAnimating={isAnimating}
                setIsAnimating={setIsAnimating}
              />
            ))
          ) : (
            <p className="text-center">No counters available...</p>
          )}
        </div>
      </div>

      {/* Full Queue Display */}
      <div className="mt-8 p-4">
        <FadingWaitingText></FadingWaitingText>
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
    </div>
  );
};

export default Page;
