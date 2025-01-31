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
      <body className={`ador antialiased text-primary`}>
        <Navbar>
          <main className="">{children}</main>
        </Navbar>
        <Footer />
      </body>
    </html>
  );
}
