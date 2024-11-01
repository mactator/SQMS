"use client";
import Container from "@/components/container";
import Display from "@/components/display";
import Ticket from "@/components/ticket";
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
    <div className="flex flex-col items-center justify-center h-screen">
      <Ticket />
      <h1 className="text-2xl font-bold mb-4">Ticket Dispenser</h1>
      <Display
        counter={counter}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
      <div className="m-4"></div>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className="input input-bordered w-full max-w-xs"
        placeholder="Enter ticket number"
      />
      <div className="m-4"></div>
      <button onClick={handleSubmit} className="btn ">
        Set Ticket Number
      </button>
    </div>
  );
};

export default Page;
