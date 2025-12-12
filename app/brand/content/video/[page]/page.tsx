'use client';
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface PromoProps {
  name: string;
  color: string;
  description: string;
}
export default function Home() {
  const params = useParams();
  const brand = params?.page;
  const tvcSrc = `/assets/${brand}.mp4`;

  const [played, setPlayed] = useState(0);
  const [isMuted, setisMuted] = useState(false);
  const [playing, setPlaying] = useState(false); // start paused
  const playerRef = useRef(null);
  const [selected, setSelected] = useState<PromoProps | null>(null);
  const router = useRouter();
  const rawSelected = sessionStorage.getItem("selected");
 


  // Pause when tab not visible
  useEffect(() => {
      try {
   setSelected(rawSelected ? JSON.parse(rawSelected) : null);
  } catch (err) {
    console.error("Failed to parse sessionStorage.selected:", err);
   setSelected(null)
  }
  
    const handleVisibilityChange = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex h-screen w-full max-w-3xl flex-col items-center justify-center md:py-32 py-4 md:px-16 px-4 sm:items-start">
        <div className="bg-gray-200 shadow-xl rounded-xl sm:h-4/5 h-fit py-4  w-full flex flex-col sm:justify-center justify-between items-center gap-6 text-center sm:items-start sm:text-left">
          
          <div className="w-full h-1/5 flex flex-col py-3 justify-center items-center">
            <span className="text-2xl font-semibold">Watch and Win</span>
            <span className="text-md italic">{selected?.description}</span>
          </div>

          <div className="w-full h-4/7 px-4 flex flex-col justify-center items-center">
            <ReactPlayer
              ref={playerRef}
              src={tvcSrc}             // ✅ correct prop name
              playing={playing}
              muted={isMuted}                   // ✅ ensures autoplay allowed
              width="100%"
              height="100%"
            // @ts-expect-error: This library doesn't have types for foo
              onProgress={({ played }) => setPlayed(played)}
              onEnded={() => router.push(`/brand/content/reward/${brand}`)}
            />
          </div>

          <div className="w-full h-1/5 flex justify-center items-center">
            <button
              className="bg-orange-600 p-4  rounded-lg text-white font-semibold  px-2 py-3 rounded-xl w-1/3"
              onClick={() =>{ setPlaying(true)
                setisMuted(false);

              }} // ✅ user-initiated play
            >
              Play
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
