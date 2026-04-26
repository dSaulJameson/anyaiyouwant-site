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
    default: "Any AI You Want — Custom AI Solutions & Fractional CTO Services",
    template: "%s · Any AI You Want",
  },
  description:
    "Custom AI solutions when you need it shipped. Fractional CTO services when you need a partner. Project-based or retainer-based — D. Saul Jameson, 9 years of ML / AI, $1B+ in revenue processed.",
  applicationName: "Any AI You Want",
  authors: [{ name: "D. Saul Jameson", url: SITE_URL }],
  creator: "D. Saul Jameson",
  publisher: "Any AI You Want",
  keywords: [
    "Custom AI Solutions",
    "Custom AI Development",
    "AI Consulting",
    "AI Consultant",
    "Fractional CTO",
    "Fractional CTO Services",
    "AI Strategy",
    "Machine Learning Engineer",
    "ML Consulting",
    "AI Integration",
    "Automation",
    "Bayesian Forecasting",
    "Recommendation Systems",
    "Predictive Analytics",
    "Business Intelligence",
    "Power BI",
    "Tableau",
    "Looker",
    "Web Application Development",
    "Vertex AI",
    "SageMaker",
    "Azure ML",
    "Hugging Face",
    "GCP",
    "AWS",
    "Azure",
    "Hetzner",
    "D. Saul Jameson",
    "anyaiyouwant",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Any AI You Want — Custom AI Solutions & Fractional CTO Services",
    description:
      "Project-based when you need it built. Retainer-based when you need a partner. One operator, 9 years of ML / AI, $1B+ in revenue processed.",
    url: SITE_URL,
    siteName: "Any AI You Want",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Any AI You Want — Custom AI Solutions & Fractional CTO Services",
    description:
      "Custom AI when you need it shipped. Fractional CTO when you need a partner. $1B+ revenue processed by my models.",
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
