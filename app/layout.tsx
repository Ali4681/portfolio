import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alialbayati.dev"),
  title: "Ali Al-Bayati | Full-Stack & Mobile Developer",
  description:
    "Portfolio of Ali Mohammed Al-Bayati, a full-stack and mobile developer building enterprise platforms, web and mobile products, real-time systems, and applied AI.",
  openGraph: {
    title: "Ali Al-Bayati | Full-Stack & Mobile Developer",
    description:
      "Enterprise web platforms, backend systems, mobile apps, and applied AI projects presented through an interactive portfolio.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Al-Bayati | Full-Stack & Mobile Developer",
    description:
      "Interactive 3D portfolio spanning web, backend, mobile, and AI.",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
