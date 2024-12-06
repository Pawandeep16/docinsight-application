"use client"; // Ensure this runs on the client-side

import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div
      className="flex  text-white bg-black py-10 h-auto md:h-[600px]"
    > 
    <motion.div
    className="flex justify-center items-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}>
      <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center w-[90%] md:w-[80%] leading-relaxed">
        Empower your legal team with DocInsight, an intuitive platform that
        simplifies document analysis and management. Enjoy seamless
        collaboration and enhanced productivity with AI-driven tools that
        transform complex documents into actionable insights. Say goodbye to
        tedious manual reviews and embrace a smarter, more efficient workflow!
      </p>
    </motion.div>
    </div>
  );
}

export default About;
