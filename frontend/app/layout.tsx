import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import MaintenanceHeader from '@/components/MaintenanceHeader';

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
  title: "Wind Tunnel | UMN",
  description: "Digital Twin for the Wind Tunnel located in the University of Minnesota AEM Department",
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
          <body className="min-h-screen flex flex-col">
            <MaintenanceHeader/> {/* Display Maintenance Notification */}
            <main className="flex-1">
                {children}
            </main>
            <Footer/> {/* Navigation Bar */}
          </body>
    </html>
  );
}
