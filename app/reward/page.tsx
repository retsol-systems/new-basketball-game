"use client";
import Image from "next/image";
import React, { useEffect, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const playAgain = () => {
    sessionStorage.clear();
    router.push("/");
  };
  return (
    <div className="font-sans flex flex-col items-center justify-center w-full min-h-screen bg-[#ffb932] p-4 overflow-hidden">
      <main className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center w-full max-w-6xl">
        {/* Left section */}
        <div className="flex flex-col w-full md:w-3/5 lg:w-2/5 bg-white/60 rounded-md shadow-md overflow-hidden">
          {/* Image */}
          <div className="flex justify-center items-center w-full p-2">
            <img
              alt="basketball-hoop"
              src="/assets/images/basketball-hoop.png"
              className="max-w-full max-h-64 pt-2 object-contain"
            />
          </div>

          <div className="flex flex-col justify-center items-center w-full p-10 h-3/5 text-center ">
            <span className="font-bold my-10  text-2xl ">
              Thank you for participating!
            </span>
            <button
              onClick={playAgain}
              className="bg-orange-600 p-4 w-full rounded-lg text-white font-semibold "
            >
              Done
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
