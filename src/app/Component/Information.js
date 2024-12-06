"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Information = ({ direction, image, heading, description }) => {
  const isRight = direction === "right";
  const ref = useRef(null);

  // Image Animation using Framer Motion
  const { scrollYProgress } = useScroll({ target: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isRight ? ["-100vw", "0vw"] : ["100vw", "0vw"]
  );

  // Slide in Text for the Description motion
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="bg-black py-10">
      <div className="flex flex-col justify-center items-center bg-black text-white max-w-[90%] lg:max-w-[80%] mx-auto space-y-10 overflow-hidden">
        <div
          className={`flex flex-col-reverse lg:flex-row ${
            isRight ? "lg:flex-row-reverse" : ""
          } py-5 px-5 lg:px-10`}
        >
          {/* Image Section */}
          <motion.div
            style={{ scale, opacity }}
            className={`flex-1 flex justify-center lg:px-[50px] ${
              isRight ? "lg:justify-start" : "lg:justify-end"
            }`}
          >
            <Image
              src={image}
              alt="Description Image"
              height={400}
              width={400}
              className="object-contain"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            ref={(node) => {
              ref.current = node;
              inViewRef(node);
            }}
            initial="hidden"
            animate={controls}
            style={{ x, opacity }}
            variants={{
              hidden: { x: isRight ? "100vw" : "-100vw", opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { duration: 1 } },
            }}
            className="flex-1 flex flex-col text-lg sm:text-xl lg:text-2xl p-4 tracking-wide lg:tracking-widest space-y-4"
          >
            <h1 className="text-2xl font-bold py-2 lg:py-5">{heading}</h1>
            <p>{description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Information;
