"use client";
import React, { useEffect, useState } from "react";
import eyeIcon from "../Assets/icons/eye-43.png";
import fb from "../Assets/icons/fb.png";
import google from "../Assets/icons/google.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../Component/Header";
import Logo from "../Assets/icons/Logo_dark.svg";
import { getProviders, signIn, useSession } from "next-auth/react";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../Assets/aniamtion/googleLoad.json";

function Page() {
  const defaultOptions = {
    loop: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get the session and authentication status
  const { data: session, status } = useSession();
  const router = useRouter();

  const provider = getProviders();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const registerUserWithGoogle = async () => {
    setLoading(true);
    if (status === "authenticated" && session?.user) {
      const { email, name } = session.user; // Get email and name from session

      try {
        await axios
          .post("https://backend101-two.vercel.app/api/user/registerUser", {
            email,
            fullName: name,
            isGoogleUser: true,
          })
          .then((data) => {
            localStorage.setItem("userToken", data?.data?.token);
          });
        // Redirect to home after successful registration
        router.push("/");
      } catch (err) {
        console.error(
          "Error during Google sign-up:",
          err.response?.data || err.message
        );
      }
    }
  };

  const signInUserWithGoogle = async () => {
    setLoading(true);
    try {
      await axios
        .post(`https://backend101-two.vercel.app/api/user/loggedInUser`, {
          email: session?.user?.email,
          isGoogleUser: true,
        })
        .then((data) => {
          localStorage.setItem("token", data?.data?.token);
          localStorage.setItem("user", JSON.stringify(data?.data?.user));
        });
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Call the function to register user if authenticated
    if (status === "authenticated") {
      if (signUp) {
        registerUserWithGoogle();
      } else {
        signInUserWithGoogle();
      }
    }
  }, [status, session, router]);

  const signUpWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/login" });
  };

  const signUpWithCred = async (email, password, name) => {
    try {
      // Check if passwords match

      // Create an object with user data
      const data = {
        email: email,
        password,
        fullName: name,
      };

      // Send POST request to the backend
      await axios
        .post("https://backend101-two.vercel.app/api/user/registerUser", data, {
          headers: {
            "Content-Type": "application/json", // Ensure content-type is set to JSON
          },
        })
        .then((data) => {
          console.log(data.data);
          localStorage.setItem(
            "user",
            JSON.stringify({
              token: data.data.token,
              email: data.data.user.email,
              name: data.data.user.fullName,
            })
          );
          router.push("/");
        });

      // Navigate to home page after successful registration
      // router.push("/");
    } catch (err) {
      // Log detailed error info
      console.error("Error during sign-up:", err.response?.data || err.message);
    }
  };

  const signInWithCred = async (email, password) => {
    try {
      const data = {
        email: email,
        password,
      };

      await axios
        .post("https://backend101-two.vercel.app/api/user/loggedInUser", data, {
          headers: {
            "Content-Type": "application/json", // Ensure content-type is set to JSON
          },
        })
        .then((data) => {
          console.log(data.data);
          localStorage.setItem(
            "user",
            JSON.stringify({
              token: data.data.token,
              email: data.data.user.email,
              id: data.data.user.id,
            })
          );
          router.push("/");
        });
    } catch (err) {
      // Log detailed error info
      console.error("Error during sign-up:", err.response?.data || err.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
      ) : (
        <div>
          <Header />
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-[30%] flex flex-col items-center justify-center space-y-[30px]">
              <div className="space-y-[15px]">
                <div className=" flex space-x-2 ">
                  <h1 className="text-5xl text-[#1f3e57]">
                    {" "}
                    {signUp ? "Sign Up" : "Login"} to{" "}
                  </h1>{" "}
                  <Logo className=" e-x-10 w-[300px] h-[60px]" />
                </div>
                <p className="text-gray-400 text-[20px] text-center">
                  Welcome Back! Please enter your details
                </p>
              </div>
              <div className="w-full space-y-[20px]">
                {signUp && (
                  <div className="space-y-[15px]">
                    <p className="text-[20px] text-[#4f4f4f] font-semibold">
                      Full Name
                    </p>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                      type="text"
                      placeholder="Enter your username or email"
                      required
                    />
                  </div>
                )}
                <div className="space-y-[15px]">
                  <p className="text-[20px] text-[#4f4f4f] font-semibold">
                    Username or Email
                  </p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                    type="email"
                    placeholder="Enter your username or email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[20px] text-[#4f4f4f] font-semibold">
                    Password
                  </p>
                  <div className="flex items-center justify-between rounded-lg border border-gray-500 pr-[20px]">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-[20px] py-3 flex-1 outline-none rounded-lg border-none text-[16px]"
                      type="password"
                      placeholder="Enter your Password"
                      required
                    />
                  </div>
                </div>
                {signUp && (
                  <div className="space-y-2">
                    <p className="text-[20px] text-[#4f4f4f] font-semibold">
                      Confirm Password
                    </p>
                    <div className="flex items-center justify-between rounded-lg border border-gray-500 pr-[20px]">
                      <input
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        className="w-full pl-[20px] py-3 flex-1 outline-none rounded-lg border-none text-[16px]"
                        type="password"
                        placeholder="Enter your Password"
                        required
                      />
                      <Image
                        src={eyeIcon}
                        alt=""
                        className="h-6 w-6 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" name="" id="" />
                    <p className="text-[16px] text-[#4f4f4f]">Remember me</p>
                  </div>
                  <p className="text-blue-700 text-[16px] font-semibold ml-2 cursor-pointer">
                    Forget Password?
                  </p>
                </div>
              </div>
              {signUp ? (
                <button
                  onClick={() =>
                    signUpWithCred(email, password, name, confirmPassword)
                  }
                  className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold active:scale-90 transition duration-200 ease-in-out"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  onClick={() => signInWithCred(email, password)}
                  className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold active:scale-90 transition duration-200 ease-in-out"
                >
                  Sign In
                </button>
              )}
              {signUp ? (
                <p className="text-[16px] text-[#4f4f4f]">
                  Already have an account?
                  <span
                    onClick={() => setSignUp(false)}
                    className="text-blue-700 font-semibold ml-2 cursor-pointer"
                  >
                    login
                  </span>
                </p>
              ) : (
                <p className="text-[16px] text-[#4f4f4f]">
                  Don&apos;t have an account?
                  <span
                    onClick={() => setSignUp(true)}
                    className="text-blue-700 font-semibold ml-2 cursor-pointer"
                  >
                    Signup
                  </span>
                </p>
              )}
              <div className="space-y-[20px]">
                <p className="text-center text-[18px] text-[#4f4f4f]">
                  Or Login With
                </p>
                <div
                  key={provider.name}
                  className="flex items-center space-x-8"
                >
                  <Image
                    src={fb}
                    onClick={() =>
                      signIn("facebook").then((data) => {
                        console.log(data);
                      })
                    }
                    alt=""
                    className="h-[40px] w-[40px] rounded-lg bg-[#f1f1f1] p-2 cursor-pointer active:scale-90 transition duration-200 ease-in-out"
                  />
                  <Image
                    onClick={signUpWithGoogle}
                    src={google}
                    alt=""
                    className="h-[40px] w-[40px] rounded-lg bg-[#f1f1f1] p-2 cursor-pointer active:scale-90 transition duration-200 ease-in-out"
                  />
                  {/* <Image
                src={apple}
                alt=""
                className="h-[40px] w-[40px] rounded-lg bg-[#f1f1f1] p-2 cursor-pointer active:scale-90 transition duration-200 ease-in-out"
              /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
