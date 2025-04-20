import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Pranav Nanaware",
    template: "%s | Pranav Nanaware",
  },
  description: "Pranav Nanaware – Full Stack Software Engineer in the San Francisco Bay Area, California, USA.",
  keywords: [
    "Pranav Nanaware",
    "Full Stack Software Engineer",
    "San Francisco Bay Area",
    "California",
    "Software Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Pranav Nanaware" }],
  openGraph: {
    title: "Pranav Nanaware",
    description: "Pranav Nanaware – Full Stack Software Engineer in the San Francisco Bay Area, California, USA.",
    url: "https://pranav.wtf",
    siteName: "Pranav Nanaware",
    images: [
      {
        url: "https://pranav.wtf/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Pranav Nanaware",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head></head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
