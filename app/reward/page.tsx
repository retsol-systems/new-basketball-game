"use client";

import Image from "next/image"; // Assuming you might use this elsewhere, otherwise can be removed.
import { useRouter } from "next/navigation";
import Confetti from "react-confetti"; // Import the confetti component
import { useState, useEffect } from "react"; // Import hooks for confetti control

export default function Home() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti visibility
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  }); // State for window dimensions

  // Function to get window dimensions for confetti
  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Set confetti to show when the component mounts
    setShowConfetti(true);

    // Detect window size initially and on resize
    detectSize();
    window.addEventListener("resize", detectSize);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []); // Empty dependency array means this runs once on mount

  const playAgain = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-300 to-gray-200 p-4 relative overflow-hidden">
      {/* Confetti Component */}
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false} // Confetti falls once and then stops
          numberOfPieces={300} // Adjust for more/less confetti
          gravity={0.15} // Adjust for slower/faster fall
          confettiSource={{
            // Adjust where the confetti originates from
            x: windowDimension.width / 2,
            y: windowDimension.height / 2,
            w: 0,
            h: 0,
          }}
          colors={["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"]} // Custom colors (Tailwind color palette examples)
        />
      )}

      <main className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center w-full max-w-6xl z-10">
        {" "}
        {/* Added z-10 to ensure content is above confetti */}
        <div className="flex flex-col w-full md:w-3/5 lg:w-2/5 from-blue-300 to-gray-200 rounded-2xl  p-8 transition-all duration-300 transform hover:scale-105">
          {/* Image Section */}
          <div className="flex justify-center items-center w-full my-6">
            <img
              alt="basketball-hoop"
              src="/assets/images/basketball-hoop.png"
              className="max-w-full max-h-64 object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center items-center w-full text-center p-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-8">
              Thank you for participating!
            </h1>

            <button
              onClick={playAgain}
              className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg
                         transition-all duration-300 hover:bg-blue-700 hover:shadow-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Done
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
