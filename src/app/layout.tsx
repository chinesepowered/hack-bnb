import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "@/context/Web3Context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "HackBnB - Decentralized Accommodation on BNB Chain",
  description:
    "The first decentralized Airbnb on BNB Chain. Book stays with crypto, earn onchain reviews, and experience trustless travel powered by AI.",
  keywords: ["BNB Chain", "decentralized", "accommodation", "blockchain", "AI", "travel"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Web3Provider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AIAssistant />
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                borderRadius: "12px",
                background: "#1f2937",
                color: "#fff",
                fontSize: "14px",
              },
            }}
          />
        </Web3Provider>
      </body>
    </html>
  );
}
