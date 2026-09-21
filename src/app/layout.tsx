import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "M.M. NOORBHOY & CO | Architectural Hardware, Fluted Panels & Smart Locks",
  description: "Premier hardware shop offering architectural hardware, bathroom fittings, fluted panels, furniture hardware, smart locks, and homeware since 1902.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans bg-white text-gray-900 antialiased min-h-screen flex flex-col justify-between">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
