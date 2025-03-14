import { AnimatePresence } from "framer-motion";
import React from "react";

const WaterDropGrid = ({ children }) => {
  return (
    <section
      className="min-h-screen bg-zinc-950 py-24"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23212326'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="mx-auto w-full max-w-xl px-4">
        <AnimatePresence>{children}</AnimatePresence>
      </div>
    </section>
  );
};

export default WaterDropGrid;

