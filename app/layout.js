import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://blackjackgto.com'),
  title: {
    default: "Blackjack GTO — Free Basic Strategy & Card Counting Trainer",
    template: "%s | Blackjack GTO",
  },
  description: "Master blackjack with Blackjack GTO — the free interactive trainer for basic strategy and Hi-Lo card counting. Get real-time feedback, track mistakes, and study the strategy chart. No money, no risk.",
  keywords: [
    "blackjack trainer", "blackjack basic strategy", "card counting practice",
    "hi-lo card counting", "blackjack strategy chart", "free blackjack trainer",
    "blackjack GTO", "learn card counting", "blackjack simulator",
    "blackjack practice", "true count", "running count",
  ],
  authors: [{ name: "Blackjack GTO" }],
  creator: "Blackjack GTO",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Blackjack GTO — Free Basic Strategy & Card Counting Trainer",
    description: "Master blackjack basic strategy and card counting with real-time feedback. Free, no risk, no sign-up.",
    url: "https://blackjackgto.com",
    siteName: "Blackjack GTO",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Blackjack GTO — Free Basic Strategy & Card Counting Trainer",
    description: "Master blackjack basic strategy and card counting with real-time feedback. Free, no risk.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5346097812091472"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <footer className="flex-none flex items-center justify-center gap-6 py-2 text-xs text-gray-700 bg-gray-950">
          <a href="/about" className="hover:text-gray-500 transition-colors">About</a>
          <a href="/privacy-policy" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
        </footer>
      </body>
    </html>
  );
}
