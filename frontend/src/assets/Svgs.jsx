import React from "react";

const SquareBrack1 = ({ width = 8, height = 42, color = "#fff" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 8 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H8V2H2V40H8V42H0V0Z" fill={color} />
    </svg>
  );
};

const SquareBrack2 = ({ width = 8, height = 42, color = "#fff" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 8 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H8V42H0V40H6V2H0V0Z" fill={color} />
    </svg>
  );
};

export { SquareBrack1, SquareBrack2 };
