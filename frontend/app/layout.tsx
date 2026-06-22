import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

// Layout applies to all pages
// Useful for consistency

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set metadata for webpage for SEO
export const metadata: Metadata = {
  title: "Windtunnel",
  description: "Digital Twin for the Windtunnel located in the University of Minnesota AEM Department",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children} {/* Subsituted for any element rendered to the page */}
        <Footer /> {/* Navigation Bar */}
      </body>
    </html>
  );
}
