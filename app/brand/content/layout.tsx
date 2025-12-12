'use client'

// These imports are fine, though Geist/Geist_Mono aren't used in this file

import ".././globals.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [config, setConfig] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const configString = sessionStorage.getItem("config");
    console.log(configString)
    
    if (configString) {
      try {
        const parsed = JSON.parse(configString);
        setConfig(parsed);
      } catch (error) {
        console.error("Failed to parse config from sessionStorage:", error);
        // You might want to redirect even if parsing fails
        // router.push("/");
      }
    } else {
      router.push("/brand");
    }
  // Add router to the dependency array
  }, [router]);

  // Safely get the background key
  // 1. `config?.background` uses optional chaining. If `config` is null, it returns undefined.
  // 2. `?? "default"` is nullish coalescing. If the left side is null or undefined,
  //    it uses "default" as the fallback.
  const backgroundKey = config?.background ?? "default";

  console.log(config);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      // Use the style prop to set the background image dynamically
      style={{ backgroundImage: `url('/assets/${backgroundKey}.jpg')` }}
    >
      {/* The <img> tag is removed.
        The children are now rendered inside the div that has the background.
        No z-index is needed, as children are naturally "on top" of their parent's background.
      */}
      {children}
    </div>
  );
}