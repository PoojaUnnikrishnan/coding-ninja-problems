import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-5 py-[10px] bg-[#218324] rounded-xl border-none text-white font-bold flex gap-2 justify-center items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
