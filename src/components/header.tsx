'use client';
import { motion } from "framer-motion";
import {
  DashboardBrowsingIcon,
  DashboardCircleIcon,
  DoorIcon,
  GridViewIcon,
  ListViewIcon,
} from "hugeicons-react";
import React from "react";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">SQMS</a>
      </div>
      <div className="flex-none">
              <motion.button  animate={{
                  scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                    
        }} className="btn btn-square btn-ghost">
          <GridViewIcon />
              </motion.button>
              
      </div>
    </div>
  );
};

export default Header;
