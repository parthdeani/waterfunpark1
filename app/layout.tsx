import type { Metadata } from "next";
import { Outfit, Lora, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Chhab Chhaba Chhab Water Fun Park — Immersive Experience",
  description:
    "Dive into Gujarat's most spectacular water park, Chhab Chhaba Chhab Water Fun Park. Control the cinematic experience with your scroll.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${lora.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
