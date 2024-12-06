"use client";
import Image from "next/image";
import React, { useState } from "react";
import { init, send } from '@emailjs/browser';
import backImage from "../Assets/icons/contactus.png"
// Initialize EmailJS with your User ID
init('user_6xnkAOnakPLCYPRAVZ4zR'); // Replace with your EmailJS User ID

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(''); // Clear previous messages

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    try {
      const response = await send('service_l1r912o', 'template_9uepqru', templateParams);

      if (response.status === 200) {
        setResponseMessage('Message sent successfully!');
      } else {
        setResponseMessage('Failed to send message.');
      }
    } catch (error) {
      console.error('Error occurred while sending message:', error);
      setResponseMessage('An error occurred while sending the message.');
    }
  };

  return (
    <div className="relative bg-black h-full flex flex-col-reverse  lg:flex-row text-white">
      <div className="z-20  p-10 flex flex-col justify-center items-center lg:w-1/2">
        <h1 className="text-6xl md:text-6xl font-bold text-left flex ">Contact Us</h1>
        <div className="mt-10 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="text-black">
            <input
              className="w-full px-4 py-3 outline-none rounded-lg border border-gray-500 mb-5"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full px-4 py-3 outline-none rounded-lg border border-gray-500 mb-5"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className="w-full px-4 py-3 outline-none rounded-lg border border-gray-500 h-40 mb-5 resize-none"
              placeholder="Please write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#750a6c] h-16 text-white font-bold text-lg rounded-sm hover:bg-[#b733ac]"
            >
              Submit
            </button>
          </form>
          {responseMessage && (
            <p className="mt-5 text-center text-white font-bold">{responseMessage}</p>
          )}
        </div>
      </div>
      <div className="lg:w-1/2   ">
        <Image
          src={backImage}
          alt="Conatus Icon"
          layout="responsive"
          height={500}
          width={1200}
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#5e066f] via-black/20 to-black opacity-100 z-10"></div>
    </div>
  );
}

export default ContactUs;
