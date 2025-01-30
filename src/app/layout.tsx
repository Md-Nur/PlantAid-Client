import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Nav/Navbar";

export const metadata: Metadata = {
  title: "Plant Aid",
  description: "Plant Aid - Green Spark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`ador antialiased flex h-full flex-col justify-between min-h-screen p-0`}
      >
        <Navbar>
          <main className="flex-grow">
            {children}
            </main>
        </Navbar>
        <Footer />
      </body>
    </html>
  );
}
