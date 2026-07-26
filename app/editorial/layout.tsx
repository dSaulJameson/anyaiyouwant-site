import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editorial desk", robots: { index: false, follow: false } };

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
