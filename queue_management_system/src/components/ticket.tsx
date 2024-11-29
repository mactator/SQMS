"use client";
import { easeIn, motion } from "framer-motion";
import React from "react";

const TicketComponent = ({ number }: { number: string }) => {
  return (
    <motion.div
      drag
      dragConstraints={{
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
      whileHover={{
        scale: 1.1,
        rotate: 2,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        rotate: -2,
        transition: { duration: 0.1 },
      }}
      className="flex justify-center items-center p-4"
    >
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg w-64 overflow-hidden">
        {/* Inner content with some padding */}
        <div className="relative z-10 flex justify-between items-center p-4">
          {/* Left side label */}
          <div className="text-white font-semibold text-lg">Your Number</div>
          {/* Vertical dashed line */}
          <div className="h-16 border-l-2 border-dashed border-gray-200 mx-2"></div>
          {/* Right side number */}
          <div className="text-4xl font-bold text-white pr-4">{number}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketComponent;
