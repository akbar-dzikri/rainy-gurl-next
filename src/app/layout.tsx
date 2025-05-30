import type { Metadata } from "next";
import { Poppins, Cookie, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
    subsets: ["latin"],
})

const cookie = Cookie({
    weight: ["400"],
    variable: "--font-cookie",
    subsets: ["latin"],
})

const cormorant = Cormorant_Garamond({
    weight: ["400", "500", "600", "700"],
    variable: "--font-cormorant",
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Rainy Gurl",
  description: "Handmade products with love by Rainy Gurl",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${cookie.variable} ${cormorant.variable} antialiased`}>
        <Navbar />
        <main className="flex-grow font-poppins">{children}</main>
        <Footer />
      </body>
    </html>
  );
}