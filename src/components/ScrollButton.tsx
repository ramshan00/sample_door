
"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ScrollDownButton() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8, // Scroll down by 80% of the viewport height
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
      <motion.button
        onClick={scrollToContent}
        className="p-2 rounded-full border border-primary/50 text-primary"
        aria-label="Scroll down"
        initial={{ y: 0 }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
