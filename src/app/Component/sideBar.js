import React, { useState } from "react";
import {
  FileTextOutlined,
  LogoutOutlined,
  SaveFilled,
} from "@ant-design/icons";
import Link from "next/link";

function SideBar({ isOpen, setIsOpen }) {
  const [openChat, setOpenChat] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggelchat = () => {
    setOpenChat(!openChat);
  };

  return (
    <div className="h-full flex flex-col w-full mx-auto py-2  ">
      <div
        className="p-2 cursor-pointer flex flex-col space-y-1 transition-all duration-300 z-20  "
        onClick={toggleMenu}
      >
        <span
          className={`block h-1 w-8 bg-black rounded-full transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2  bg-white" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-8 bg-black rounded-full transition-opacity duration-300 ${
            isOpen ? "opacity-0 bg-white" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-1 w-8 bg-black rounded-full transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2 bg-white" : ""
          }`}
        ></span>
      </div>

      {/* Sidebar content */}
      <div
        className={`fixed top-16 flex flex-col  left-0 h-full w-1/6 bg-[#152b47] text-white transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0  " : "-translate-x-full"
        }`}
      >
        {/* Add additional sidebar content here */}
        <div className=" mt-20 text-white ">
          <Link className=" flex items-start justify-start p-4" href="">
            <SaveFilled style={{ fontSize: "25px", color: "#ffff" }} />

            <div className="flex flex-col">
              {" "}
              <h1
                onClick={toggelchat}
                className=" flex flex-col mx-4  font-bold text-xl  "
              >
                Saved Chats
              </h1>
              <div
                className={`  ${
                  openChat
                    ? " block transition-transform duration-500 ease-in-out "
                    : " hidden"
                }`}
              >
                <ul className="p-4 mr-6 mt-2">
                  <li className="hover:text-blue-500">Chhat 1</li>
                  <li>Chhat 1</li>
                  <li>Chhat 1</li>
                  <li>Chhat 1</li>
                </ul>
              </div>
            </div>
          </Link>
          <Link className=" flex p-4  justify-start  items-center " href="">
            <FileTextOutlined style={{ fontSize: "25px", color: "#ffff" }} />
            <h1 className=" mx-4  font-bold text-xl">Generate Templates</h1>
          </Link>
        </div>
        <Link className=" flex p-4 " href="">
          <LogoutOutlined style={{ fontSize: "25px", color: "#ffff" }} />
          <h1 className=" mx-4  font-bold text-xl">SignOut</h1>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
