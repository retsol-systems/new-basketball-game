import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from './styles.module.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unilever Brand",
  // description: "Platform Services by Catman Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body >
      
        <main >
       
          {children}
        </main>
      
      </body>
    </html>
  );
}
