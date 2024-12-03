"use client";
import { motion } from "framer-motion";
import { GridViewIcon } from "hugeicons-react";
import React from "react";
import Link from "next/link";
let counters = 0;
const Header = () => {
  const goToCounterPage = () => {
    open(`/counter_page/${++counters}`);
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          SQMS
        </Link>
      </div>
      <div className="flex-none space-x-4">
        <Link href="/ticket_dispenser" className="btn btn-ghost">
          Ticket Dispenser
        </Link>
        <Link href="/waiting_room" className="btn btn-ghost">
          Waiting Room
        </Link>
        <button onClick={goToCounterPage} className="btn btn-ghost">
          Counter Page
        </button>
        <motion.button
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          className="btn btn-square btn-ghost"
        >
          <GridViewIcon />
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
