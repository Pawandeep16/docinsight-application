"use client"; // Ensure this is a client-side component

import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Header from "../Component/Header";
import image from "../Assets/icons/hero.jpg";
import Image from "next/image";
import About from "../Component/About";
import Information from "../Component/Information";
import { components } from "../Component/info";
import PlansComp from "../Component/plansComp";
import ContactUs from "../Component/ContactUs";
import TeamMembers from "../Component/teammembers";
import Footer from "../Component/footer";
function Homepage() {
  return (
    <div className="flex flex-col scroll-smooth">
      <Header className="z-60" />

      {/* Hero Section */}
      <div className="relative">
        <div className="h-screen">
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt="Background Image"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-sans p-5">
          {/* Hero Heading Animation */}
          <motion.h1
            className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-bold z-10 p-5"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Advanced Legal Document Analysis Tool
          </motion.h1>
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold z-10 p-5">
            Revolutionizing Legal Workflows with AI-Powered Document Analysis
          </h1>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f3e57] via-black/20 to-black opacity-100"></div>
      </div>

      <About />

      {/* Information Section */}
      {components.map((item, index) => (
        <Information
          key={index}
          direction={item.direction}
          image={item.image}
          heading={item.heading}
          description={item.description}
        />
      ))}

      {/* Plans Section */}

      <PlansComp />

      {/* Team Members Section */}

      <TeamMembers />

      {/* Contact Us Section */}

      <ContactUs />
      <Footer />
    </div>
  );
}

export default Homepage;
