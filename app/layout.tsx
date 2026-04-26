import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://anyaiyouwant.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Any AI You Want — Fractional CTO & ML Engineer",
    template: "%s · Any AI You Want",
  },
  description:
    "Fractional CTO and machine learning engineer. Algorithms, automation, and apps — for enterprises and startups. From a 2-hour script to a 2,000-hour platform.",
  icons: {
    icon: "/media/browser-icon.png",
    apple: "/media/browser-icon.png",
  },
  openGraph: {
    title: "Any AI You Want — Fractional CTO & ML Engineer",
    description:
      "Algorithms, automation, and apps. Shipped by D. Saul Jameson — 9 years of ML, long before ChatGPT.",
    url: SITE_URL,
    siteName: "Any AI You Want",
    images: ["/media/logo-white.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Any AI You Want — Fractional CTO & ML Engineer",
    description: "Algorithms, automation, and apps that ship.",
  },
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
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
