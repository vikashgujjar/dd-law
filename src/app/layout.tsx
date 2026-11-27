import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  // Only the weights the design actually uses (300 light, 400 regular).
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ddlaw.ca"),
  title: "DD LAW | Dhanu Dhaliwal Law Group — Real Life Legal Solutions",
  description:
    "Dhanu Dhaliwal Law Group practices family, criminal, immigration, and civil law in Abbotsford and Surrey. Understanding You is Our Advantage.",
  openGraph: {
    title: "DD LAW | Dhanu Dhaliwal Law Group",
    description: "Real Life Legal Solutions. Understanding You is Our Advantage.",
    images: ["/images/hero-group.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101C2C",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal,.reveal-child,.split-word,.mask-reveal,.mask-reveal-inner{opacity:1!important;transform:none!important;clip-path:none!important}.draw path,.draw line,.draw circle,.draw rect,.draw polyline,.draw ellipse{stroke-dashoffset:0!important}ul[data-inview]>li{opacity:1!important;transform:none!important;clip-path:none!important}.lit-word{opacity:1!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
