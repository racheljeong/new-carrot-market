import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title : {
    template : "%s | Carrot",
    default : "New Carrot Market"
  },
  description: "Brand new with Next14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-amber-50 text-orange-400 max-w-screen-md max-h-full mx-auto`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
