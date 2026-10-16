import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "BalBee Admin",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = { themeColor: "#fff6dc", width: "device-width", initialScale: 1 };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
