// src/app/layout.js
import { Fredoka, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const fredokaSans = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = { title: "Pet Adoption Hub 🐾", description: "Find your perfect companion" };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fredokaSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className={`${fredokaSans.className} min-h-full flex flex-col bg-canvas text-main`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="top-center" reverseOrder={false} /> 
        </ThemeProvider>
      </body>
    </html>
  );
}