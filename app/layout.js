import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Blackjack Trainer — Free Basic Strategy & Card Counting Practice",
  description: "Practice blackjack basic strategy and Hi-Lo card counting for free. Interactive trainer with real-time feedback, strategy charts, and mistake tracking. No money, no risk.",
  keywords: "blackjack trainer, blackjack basic strategy, card counting practice, hi-lo card counting, blackjack strategy chart, free blackjack trainer",
  openGraph: {
    title: "Blackjack Trainer — Free Basic Strategy & Card Counting Practice",
    description: "Practice blackjack basic strategy and Hi-Lo card counting for free. Interactive trainer with real-time feedback.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="flex-none flex items-center justify-center gap-6 py-2 text-xs text-gray-700 bg-gray-950">
          <a href="/about" className="hover:text-gray-500 transition-colors">About</a>
          <a href="/privacy-policy" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
        </footer>
      </body>
    </html>
  );
}
