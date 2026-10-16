import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "BalBee Admin",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: "#fff6dc", width: "device-width", initialScale: 1 };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
