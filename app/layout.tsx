import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "M.Zanaen Ullah - Full Stack Developer",
  description: "Passionate full stack developer specializing in modern web technologies, creating exceptional digital experiences with clean code and innovative solutions.",
  keywords: "full stack developer, web development, React, Next.js, TypeScript, JavaScript, portfolio",
  authors: [{ name: "M.Zanaen Ullah" }],
  creator: "M.Zanane Ullah",
  openGraph: {
    title: "M.Zanane Ullah - Full Stack Developer",
    description: "Passionate full stack developer specializing in modern web technologies",
    url: "https://zanaen.pk",
    siteName: "M.Zanane Ullah Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "M.Zanane Ullah - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M.Zanane Ullah - Full Stack Developer",
    description: "Passionate full stack developer specializing in modern web technologies",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
