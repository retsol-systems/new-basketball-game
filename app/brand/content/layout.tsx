'use client'

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
       
      }
    } else {
      router.push("/brand");
    }
 
  }, [router]);

  
  const backgroundKey = config?.background ?? "default";

  console.log(config);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
   
      style={{ backgroundImage: `url('/assets/${backgroundKey}.jpg')` }}
    >
    
      {children}
    </div>
  );
}