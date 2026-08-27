import type { Metadata } from "next";
import { Archivo, Dancing_Script, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/resume";
import { CustomCursor } from "@/components/effects/custom-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Bold display face — hero headline, "Hello!", section dividers.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

// Script accent — the signature name, "About me" annotation, TOC accent words.
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  title,
  description: profile.summary,
  openGraph: {
    title,
    description: profile.summary,
    type: "website",
    images: [{ url: profile.photo, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.summary,
    images: [profile.photo],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
