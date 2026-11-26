import type { Metadata } from "next";
import {
  Albert_Sans,
  Fragment_Mono,
  JetBrains_Mono,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

/* Hero + existing sections (unchanged) */
const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

/* About section (bluish redesign) — headings / body / mono labels */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-jmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anurag Kumar — Builder",
  description:
    "Builder — crafting interfaces and systems that push what's next.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${fragmentMono.variable} ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
