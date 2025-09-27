
"use client";
import { motion, Variants } from "framer-motion";
import ScrollDownButton from "@/components/ScrollButton";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const buttonVariant: Variants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 16px 40px rgba(5, 192, 224, 0.25)",
  },
  tap: {
    scale: 0.97,
  },
};

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <section className="container relative z-10 mx-auto w-full min-h-[85vh] flex flex-col justify-center py-15 px-5 md:px-16 text-white gap-2">
      {/* Hero Text */}
      <div className="overflow-hidden ">
        <motion.p
          className="text-right text-5xl sm:text-6xl md:text-7xl font-bold hover:scale-95 transition-all duration-300 uppercase"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Live Smarter
        </motion.p>
      </div>

      <div className="overflow-hidden">
        <motion.p
          className="text-right text-5xl sm:text-6xl md:text-7xl font-medium hover:scale-95 transition-all duration-300 uppercase"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          We will handle your roommate{" "}
          <span className="font-bold text-primary">hustle</span>
        </motion.p>
      </div>

      {/* Subtext */}
      <motion.div
        className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-muted-foreground text-right hover:scale-95 transition-all duration-300 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <p>No more endless scrolling. No more mismatched living.</p>
        <p>
         Our AI finds your perfect roommate and home checking profiles, scoring compatibility, and flagging red flags, so you get the right fit without stress.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="flex justify-end mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.8 }}
      >
        <Button asChild
          className="font-semibold shadow-lg cursor-pointer bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          aria-label="Start Now"
          size="lg"
        >
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariant}
          >
            <Link href="/signup">
              Get Started
            </Link>
          </motion.div>
        </Button>
      </motion.div>

      {/* Scroll Button */}

      <ScrollDownButton />
    </section>
    </div>
  );
}
