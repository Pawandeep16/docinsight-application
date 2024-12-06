"use client"; 

import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Pricing from "../Component/pricing";
import { plans } from "./info";

function PlansComp() {
  return (
    <div className="flex flex-col bg-black relative py-10">
      {/* Animated Heading */}
      <div className="z-10 text-center">
        <motion.h1
          className="text-white font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl p-5 lg:p-10"
          initial={{ opacity: 0, y: 50 }} // Starting state
          whileInView={{ opacity: 1, y: 0 }} // Final state
          transition={{ duration: 1, ease: "easeOut" }} // Animation details
          viewport={{ once: true }} // Trigger animation only once
        >
          Choose the Perfect Plan for Your Needs
        </motion.h1>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-16 lg:gap-20 z-10 mt-5 lg:mt-10">
        {plans.map((plan, index) => (
          <Pricing key={index} {...plan} />
        ))}
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"></div>
    </div>
  );
}

export default PlansComp;
