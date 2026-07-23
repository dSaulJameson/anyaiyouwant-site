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

const SITE_URL = "https://www.anyaiyouwant.com";

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Any AI You Want — U.S.-Based Product Engineering",
    template: "%s | Any AI You Want",
  },
  description:
    "Senior U.S.-based engineers who architect, code, deploy, and operate full-stack software, data systems, machine learning, and secure AI.",
  applicationName: "Any AI You Want",
  authors: [{ name: "D. Saul Jameson", url: SITE_URL }],
  creator: "D. Saul Jameson",
  publisher: "Any AI You Want",
  keywords: [
    "Product Engineering Company",
    "US Based Software Development",
    "Full Stack Software Development",
    "Custom Software Development",
    "Web Design and Development",
    "Fractional CTO",
    "Fractional CTO Services",
    "AI Product Development",
    "Secure AI",
    "Private AI",
    "US Based Software Engineers",
    "Marketing Mix Modeling",
    "Monte Carlo Simulation",
    "Demand Forecasting",
    "ARIMA Forecasting",
    "Prophet Forecasting",
    "Machine Learning Engineer",
    "ML Consulting",
    "AI Integration",
    "Automation",
    "Bayesian Forecasting",
    "Recommendation Systems",
    "Predictive Analytics",
    "Business Intelligence",
    "Web Application Development",
    "Application Modernization",
    "Marketing Automation Software",
    "Social Media Automation",
    "Paid Campaign Automation",
    "Technical SEO",
    "Generative Engine Optimization",
    "D. Saul Jameson",
    "anyaiyouwant",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Any AI You Want — U.S.-Based Product Engineering",
    description:
      "Senior U.S.-based engineers who shape, architect, code, deploy, and operate full-stack software, data systems, machine learning, and secure AI.",
    url: SITE_URL,
    siteName: "Any AI You Want",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1732, height: 917, alt: "Any AI You Want — Software, analytics, and secure AI that ships" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Any AI You Want — U.S.-Based Product Engineering",
    description:
      "Senior U.S.-based engineers for full-stack software, data systems, machine learning, and secure AI.",
    creator: "@dSaulJameson",
    images: ["/og.png"],
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
