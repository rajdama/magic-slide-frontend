"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  let { data } = useSession();

  useEffect(() => {
    if (data) {
      router.push("/home");
    }
  }, [data]);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  const handleSignIn = () => {
    if (!inputValue) {
      setError("Please enter Api Key before signing in.");
    } else {
      setError("");
      localStorage.setItem("apikey", inputValue);
      console.log(localStorage.getItem("apikey"));
      signIn();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <button
          type="button"
          onClick={handleSignIn}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Login with google
        </button>
        <input
          type="text"
          placeholder="Enter Api Key"
          value={inputValue}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg mt-5"
        />
      </div>
    </div>
  );
};

export default Login;
