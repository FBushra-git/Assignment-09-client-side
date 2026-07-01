// src/app/layout.js
import { Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/app/Providers";

const fredokaSans = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = { title: "Pet Adoption Hub 🐾", description: "Find your perfect companion" };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fredokaSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${fredokaSans.className} min-h-full flex flex-col bg-canvas text-main`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}