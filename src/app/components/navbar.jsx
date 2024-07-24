"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
  const { data } = useSession();
  // console.log("data---------- ", data);

  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          {data && (
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white flex">
              <div className="m-3">
                <img
                  class="w-10 h-10 rounded-full"
                  src={data.user.image}
                  alt=""
                />
              </div>
              <span className="my-5 text-white">{data.user.name}</span>
            </span>
          )}
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <div className="flex">
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  signOut();
                }}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
