'use client';
import Image from "next/image";
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define the color keys you actually use
type BrandColor = 'blue' | 'pink' | 'gold' | 'yellow';

// Define the structure of your config
type ColorConfig = Record<BrandColor, { color: string; background: string; foreground: string }>;

function pickBrand(): { name: string; color: BrandColor, description: string } {
  const productList: { name: string; color: BrandColor, description:string }[] = [
    
    { name: "sunsilk-one", color: "yellow", description:"Sunsilk Green" },
    { name: "sunsilk-two", color: "yellow", description:"Sunsilk Pink" },
    { name: "creamsilk-one", color: "yellow", description:" Creamsilk Vitamin Boost" },
     { name: "creamsilk-two", color: "yellow", description:" Creamsilk Color Protect Series" },
   
  ];

  try {
    const randomProduct = productList[Math.floor(Math.random() * productList.length)];
    return randomProduct;
  } catch (e) {
    console.error("Error picking brand:", e);
    // fallback in case of error (use a valid key to satisfy the type)
    return { name: "default", color: "pink", description:"No Available Promos" };
  }
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; color: BrandColor } | null>(null);
  const router = useRouter();

  const config: ColorConfig[] = [
    {
      blue: { color: "ffffff", background: "blue", foreground: "" },
      pink: { color: "ffffff", background: "pink", foreground: "" },
      gold: { color: "ffffff", background: "gold", foreground: "" },
        yellow: { color: "ffffff", background: "yellow", foreground: "" },
    },
  ];

  useEffect(() => {
    const brand = pickBrand();
    setSelectedProduct(brand);
    const tempVar = config[0];
    const color = brand.color;
    const setConfig = tempVar[color]; 
   
    sessionStorage.setItem("selected", JSON.stringify(brand));
    sessionStorage.setItem("config", JSON.stringify(setConfig));
  }, []);

useEffect(() => {
  if (selectedProduct) {
    const slug = selectedProduct.name.toLowerCase();

    // Random pick: 0 or 1
    const random = Math.random() < 0.5 ? "video" : "video";

    router.push(`/brand/content/${random}/${slug}`);
  }
}, [selectedProduct, router]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <main className="flex h-screen w-full max-w-3xl flex-col items-center justify-between md:py-32 py-4 md:px-16 px-4 bg-red-100 dark:bg-black sm:items-start">
        {selectedProduct && (
          <div className="text-center">
            <p>Brand: {selectedProduct.name}</p>
            <p>Color: {selectedProduct.color}</p>
          </div>
        )}
      </main> */}
    </div>
  );
}
