"use client";
import Container from "@/components/container";
import Display from "@/components/display";
import Ticket from "@/components/ticket";
import Link from "next/link";
import React from "react";

const Page = () => {
  const [counter, setCounter] = React.useState(0); // Initial counter value
  const [inputValue, setInputValue] = React.useState(""); // For the input field
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue)) {
      setCounter(parsedValue); // Update counter with the entered number
      setIsAnimating(true); // Trigger the animation
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Link
        className="btn btn-lg font-semibold px-12 py-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-transform transform hover:scale-105"
        href="/waiting_room"
      >
        Get Your Ticket
      </Link>
    </div>
  );
};

export default Page;

{
  /* <Ticket /> */
}
// <h1 className="text-2xl font-bold mb-4">Ticket Dispenser</h1>
// <Display
// counter={counter}
// isAnimating={isAnimating}
// setIsAnimating={setIsAnimating}
// />
// <div className="m-4"></div>
// <input
// type="number"
// value={inputValue}
// onChange={handleInputChange}
// className="input input-bordered w-full max-w-xs"
// placeholder="Enter ticket number"
// />
// <div className="m-4"></div>
// <button onClick={handleSubmit} className="btn ">
{
  /* Set Ticket Number */
}
{
  /* </button> */
}
