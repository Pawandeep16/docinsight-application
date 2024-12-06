import React from "react";
import { GoogleOutlined, GithubOutlined, TwitterOutlined } from "@ant-design/icons"; // Ant Design icons

function Footer() {
  return (
    <div className="bg-black text-white py-10">
      {/* Footer Container */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo or Name */}
        <h1 className="text-2xl font-bold pb-5">DocInsight</h1>
        <p className="text-sm md:text-base text-center px-5 md:px-10">
          Revolutionizing legal workflows with AI-powered document analysis. Follow us for updates!
        </p>

        {/* Social Links */}
        <div className="flex gap-6 mt-5">
          {/* Google */}
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-400 transition duration-300"
          >
            <GoogleOutlined style={{ fontSize: "24px" }} />
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/Docinsight-Devs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            <GithubOutlined style={{ fontSize: "24px" }} />
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition duration-300"
          >
            <TwitterOutlined style={{ fontSize: "24px" }} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700">
        <p className="text-center text-sm text-gray-500 pt-5">
          © {new Date().getFullYear()} DocInsight. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
