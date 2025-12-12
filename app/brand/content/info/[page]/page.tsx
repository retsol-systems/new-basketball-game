'use client';
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const params = useParams();
  const brand = params?.page;
  const infoGraphicImage = `/assets/${brand}.jpg`;

  const [played, setPlayed] = useState(0);
  const [isMuted, setisMuted] = useState(false);
  const [playing, setPlaying] = useState(false); // start paused
  const playerRef = useRef(null);
  const router = useRouter();
  const rawSelected = sessionStorage.getItem("selected");
  const [imageExists, setImageExists] = useState(true);
  let selected: any = null;
  try {
    selected = rawSelected ? JSON.parse(rawSelected) : null;
  } catch (err) {
    console.error("Failed to parse sessionStorage.selected:", err);
    selected = null;
  }


  console.log(selected)
  // Pause when tab not visible
  useEffect(() => {

    if(!imageExists){
          sessionStorage.clear();
    router.push("/brand");
    }
    const handleVisibilityChange = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  const startTimer = () => {
     const bar = document.getElementById("timer-bar");
    if(!bar) {
      console.log("no bar")
      return;
    }
    console.log(bar)
bar.style.transform = "scaleX(0)";
  void bar.offsetWidth;

  requestAnimationFrame(() => {
    bar.style.transform = "scaleX(1)";
  });

  setTimeout(() => {
 router.push(`/brand/content/reward/${brand}`)
  }, 5000);
}
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex h-screen w-full max-w-3xl flex-col items-center justify-center md:py-32 py-4 md:px-16 px-4 sm:items-start">
        <div className="bg-gray-200 shadow-xl rounded-xl sm:h-4/5 h-fit py-4  w-full flex flex-col sm:justify-center justify-between items-center gap-6 text-center sm:items-start sm:text-left">

          <div className="w-full h-1/5 flex flex-col py-3 justify-center items-center">
            <span className="text-2xl font-semibold">View and Win</span>
            <span className="text-md italic">{selected.description}</span>
          </div>

          <div className="w-full h-4/7 px-4 flex flex-col justify-center items-center">
          
            <img src={infoGraphicImage} alt={`${brand} image`} className="max-w-48 w-full" 
                 
              //@ts-expect-error
              // typescript error
            onError={(e)=>{e.target.onError = null; router.push('/')}}/>
           
          </div>

          <div className="w-full h-1/5 flex justify-center items-center">
            <button
              className="bg-orange-600 p-4  rounded-lg text-white font-semibold  px-2 py-3 rounded-xl w-1/3"
              onClick={startTimer}// ✅ user-initiated play
            >
              Start
            </button>
          </div>
       <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
  <div
    id="timer-bar"
    className="h-full bg-orange-600 origin-left z-10"
    style={{
      transform: "scaleX(0)",
      transition: "transform 5s linear",
    }}
  ></div>
</div>
        </div>
      </main>
    </div>
  );
}
