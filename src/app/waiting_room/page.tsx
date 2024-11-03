"use client";
import Display from "@/components/display";
import Ticket from "@/components/ticket";
import { div } from "framer-motion/client";
import React from "react";

const Page = () => {
  const [counter, setCounter] = React.useState(0); // Initial counter value
  const [isAnimating, setIsAnimating] = React.useState(false);

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
        <h1 className="text-2xl font-bold mb-4 text-center py-8">Waiting Room</h1>
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
        <div className="flex-col items-center justify-center  my-1">
        <Ticket />
        </div>
    </div>
  );
};

export default Page;