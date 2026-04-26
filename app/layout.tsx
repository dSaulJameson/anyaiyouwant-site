import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { PersonJsonLd, ProfessionalServiceJsonLd, WebSiteJsonLd } from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://anyaiyouwant.com";

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Any AI You Want — Fractional CTO & ML Engineer",
    template: "%s · Any AI You Want",
  },
  description:
    "Fractional CTO and machine learning engineer. Algorithms, automation, and apps — for enterprises and startups. From a 2-hour script to a 2,000-hour platform. Built by D. Saul Jameson, 9 years of ML / AI.",
  applicationName: "Any AI You Want",
  authors: [{ name: "D. Saul Jameson", url: SITE_URL }],
  creator: "D. Saul Jameson",
  publisher: "Any AI You Want",
  keywords: [
    "Fractional CTO",
    "Machine Learning Engineer",
    "AI Consultant",
    "ML Consulting",
    "Automation",
    "AI Integration",
    "Business Intelligence",
    "Power BI",
    "Tableau",
    "Looker",
    "Bayesian Forecasting",
    "Recommendation Systems",
    "Web Application Development",
    "Stripe Integration",
    "GCP",
    "AWS",
    "Azure",
    "Hetzner",
    "D. Saul Jameson",
    "anyaiyouwant",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
    icon: "/media/browser-icon.png",
    apple: "/media/browser-icon.png",
    shortcut: "/media/browser-icon.png",
  },
  openGraph: {
    title: "Any AI You Want — Fractional CTO & ML Engineer",
    description:
      "Algorithms, automation, and apps. Shipped by D. Saul Jameson — 9 years of ML / AI, $1B+ in revenue processed by my models.",
    url: SITE_URL,
    siteName: "Any AI You Want",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Any AI You Want — Fractional CTO & ML Engineer",
    description:
      "Algorithms, automation, and apps that ship. $1B+ in revenue processed by my models.",
    creator: "@dSaulJameson",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <PersonJsonLd />
        <ProfessionalServiceJsonLd />
        <WebSiteJsonLd />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
