"use client";
import React, { useState } from "react";
import Logo from "../Assets/icons/Logo.svg";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  CloseOutlined,
  FileTextOutlined,
  SaveOutlined,
} from "@ant-design/icons";

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const [profileActive, setProfileActive] = useState(false);

  const profileHandler = () => {
    setProfileActive(!profileActive);
  };

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#1f3e57] h-[70px] sticky top-0 z-50 ">
      {/* Logo */}
      <Logo
        onClick={() => router.push("/")}
        className="w-[150px] md:w-[200px] h-8 md:h-10 hover:cursor-pointer"
      />

      {/* User Profile / Login Button */}
      <div className="flex items-center space-x-4 ">
        <div className="text-sm md:text-xl cursor-pointer text-[#F5F5F5]">
          {status === "authenticated" ? (
            <div className="relative flex justify-center items-center">
              {/* Outer circle */}
              <div className="rounded-full bg-[#ffffff2a] w-12 h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 flex justify-center items-center">
                {/* Middle circle */}
                <div className="rounded-full bg-[#ffffff7a] w-[80%] h-[80%] flex justify-center items-center">
                  {/* Inner circle */}
                  <div className="rounded-full bg-white w-full h-full flex justify-center items-center">
                    <Image
                      onClick={profileHandler}
                      src={session?.user?.image}
                      alt="profile pic"
                      height={50}
                      width={50}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            pathname !== "/login" && (
              <h2
                onClick={() => router.push("/login")}
                className="font-semibold"
              >
                Login
              </h2>
            )
          )}
        </div>
        {profileActive && (
          <div
            className={`top-[100%] right-[1%] min-w-[500px] bg-gray-900 flex flex-col items-center justify-center absolute space-y-4 text-gray-200 py-2 transition-all duration-150 ease-in-out}`}
          >
            <div className="flex items-center justify-end w-full py-4 pr-2">
              <h2 className="font-semibold text-sm text-center w-full">
                {session?.user?.email}
              </h2>
              <CloseOutlined
                onClick={() => setProfileActive(false)}
                className="h-5 w-5"
              />
            </div>
            {/* Inner circle */}
            <div className="rounded-full w-[80px] h-[80px] flex justify-center items-center">
              <Image
                onClick={profileHandler}
                src={session?.user?.image}
                alt="profile pic"
                height={200}
                width={200}
                className="object-cover rounded-full"
              />
            </div>
            <h2 className="text-2xl font-normal">Hi, {session?.user?.name}</h2>
            <div className="space-y-2">
              <div className="flex items-center  bg-[#2f302eaa] px-4 py-2 cursor-pointer space-x-2 rounded-md">
                <SaveOutlined className="text-lg" />
                <h2 className="text-lg font-normal">Saved Chats</h2>
              </div>
              <div className="flex items-center bg-[#2f302eaa] px-4 py-2 cursor-pointer space-x-2 rounded-md">
                <FileTextOutlined className="text-lg " />
                <h2 className="text-lg font-normal ">General Templates</h2>
              </div>
            </div>
            <h2
              onClick={() => signOut()}
              className="px-4 py-2 rounded-md cursor-pointer text-xl font-normal"
            >
              Signout
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
