"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GithubOutlined, LeftOutlined, LinkedinOutlined, MailOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import pawanImage from "../Assets/profilepics/pawan.png";
import jaspreetImage from "../Assets/profilepics/jaspreet.png";
import jeelImage from "../Assets/profilepics/jeel.png";
import mayankImage from "../Assets/profilepics/mayankpic.png";
import sakshiImage from "../Assets/profilepics/sakshi.png";
import darshanImage from "../Assets/profilepics/darshan.png";

// Team data
const teamMembers = [
  {
    name: "Pawandeep Singh Thandi",
    role: "Project Manager/Lead Developer",
    linkedinprofile: "https://www.linkedin.com/in/pawandeep-thandi-2432031ab/",
    email: "thandipawandeep@gmail.com",
    github: "https://github.com/pawandeepthandi",
    image: pawanImage,
  },
  {
    name: "Jaspreet Singh",
    role: "Lead Developer",
    linkedinprofile: "https://www.linkedin.com/in/jaspreet-singh-b63bb518a/",
    email: "jassingh.0244@gmail.com",
    github: "https://github.com/jaspreetsingh0244",
    image: jaspreetImage,
  },
  {
    name: "Jeel Dungarani",
    role: "UI/UX Designer",
    linkedinprofile: "https://www.linkedin.com/in/jeel-dungarani-0621281a1/",
    email: "jeelatwork@gmail.com",
    github: "https://github.com/jeeldungarani",
    image: jeelImage,
  },
  {
    name: "Darshan Bhut",
    role: "Data Analyst",
    linkedinprofile: "https://www.linkedin.com/in/darshan-bhut-53a878272/",
    email: "darshanbhut654@gmail.com",
    github: "https://github.com/darshanbhut",
    image: darshanImage,
  },
  {
    name: "Sakshi Patel",
    role: "Technical Content Developer",
    linkedinprofile: "https://www.linkedin.com/in/sakshi-patel-98628a283",
    email: "sakshi3patel@gmail.com",
    github: "https://github.com/sakshipatel",
    image: sakshiImage,
  },
  {
    name: "Mayank Anand",
    role: "Debugger & Tester",
    linkedinprofile: "https://www.linkedin.com/in/mayank-anand-a76263273/",
    email: "anandmayank0102@gmail.com",
    github: "",
    image: mayankImage,
  },
];

const TeamMembers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the number of slides
  const totalSlides = Math.ceil(teamMembers.length / 3);

  // Handle previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  // Handle next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Get the current set of team members to display
  const currentMembers = teamMembers.slice(
    currentIndex * 3,
    currentIndex * 3 + 3
  );

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-[#5e066f]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto py-12 text-center text-white">
        {/* Animated Heading */}
        <motion.h2
          className="text-3xl md:text-5xl lg:text-7xl font-semibold mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>

        <p className="mb-12 text-sm md:text-base">The experts bringing our vision to life</p>

        {/* Team Members Carousel */}
        <div className="flex justify-center items-center relative">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 text-white px-3 py-1 rounded-lg shadow-md hover: z-20"
          >
            <LeftOutlined style={{ fontSize: "30px" }} />
          </button>

          {/* Team Members */}
          <div className="flex space-x-4 transition-transform duration-700 ease-in-out flex-wrap justify-center gap-4">
            {currentMembers.map((member, index) => (
              <motion.div
                key={index}
                className="w-64 sm:w-72 md:w-80 bg-white shadow-md rounded-lg p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Image
                  className="rounded-full mx-auto mb-4"
                  src={member.image}
                  alt={`${member.name} Profile`}
                  width={120}
                  height={120}
                />
                <h3 className="text-xl font-medium text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  {/* LinkedIn Icon */}
                  {member.linkedinprofile && (
                    <Link target="_blank" href={member.linkedinprofile}>
                      <LinkedinOutlined style={{ fontSize: "25px", color: "#0077B5" }} />
                    </Link>
                  )}
                  {/* Email Icon */}
                  {member.email && (
                    <Link href={`mailto:${member.email}`}>
                      <MailOutlined style={{ fontSize: "25px", color: "#C71610" }} />
                    </Link>
                  )}
                  {/* GitHub Icon */}
                  {member.github && (
                    <Link target="_blank" href={member.github}>
                      <GithubOutlined style={{ fontSize: "25px", color: "#111" }} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 text-white px-3 py-1 rounded-lg shadow-md hover:text-3xl z-20"
          >
            <RightOutlined style={{ fontSize: "30px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
