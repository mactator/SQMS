"use client";
import Display from "@/components/display";
import Ticket from "@/components/ticket";
import { div } from "framer-motion/client";
import React from "react";

const Page = () => {
  const [counter, setCounter] = React.useState(0); // Initial counter value
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [fullQueue, setFullQueue] = React.useState([]); // State to store the full queue

  React.useEffect(() => {
    async function fetchQueue() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/queue/fullQueue"
        );
        if (response.ok) {
          const data = await response.json();
          setFullQueue(data.queue);
        } else {
          console.error("Failed to fetch queue");
        }
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    }
    fetchQueue();
  }, []); // Fetch queue on component mount

  function simulateCounter() {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 5000);
    if (counter > 99) {
      setCounter(0);
    }
  }

  simulateCounter();

  return (
    <div>
      <div className="flex flex-col v-screen my-1">
        <h1 className="text-2xl font-bold mb-4 text-center py-8">
          Waiting Room
        </h1>
        <div className="flex flex-row justify-evenly">
          <Display
            counter={counter}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
          <Display
            counter={counter + 1}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
          <Display
            counter={counter + 2}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
          <Display
            counter={counter + 3}
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
          />
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="card w-36 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-2xl font-bold">Now Serving</h2>
            </div>
          </div>
          <div className="card w-36 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-2xl font-bold">Now Serving</h2>
            </div>
          </div>
          <div className="card w-36 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-2xl font-bold">Now Serving</h2>
            </div>
          </div>
          <div className="card w-36 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-2xl font-bold">Now Serving</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col items-center justify-center my-1"></div>
      {/* Full Queue Component */}
      <div className="mt-8 p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Full Queue</h2>
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
