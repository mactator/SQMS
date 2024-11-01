import React from "react";

import { ReactNode } from "react";

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {children}        
    </div>
  );
};

export default Container;
