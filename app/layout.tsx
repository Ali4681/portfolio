import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alialbayati.dev"),
  title: "Ali Al-Bayati | Full-Stack & Mobile Developer",
  description:
    "Portfolio of Ali Mohammed Al-Bayati, a full-stack and mobile developer specializing in Next.js, NestJS, React Native, real-time systems, and applied AI.",
  openGraph: {
    title: "Ali Al-Bayati | Full-Stack & Mobile Developer",
    description:
      "Production web, backend, mobile, and AI systems presented through an interactive 3D experience.",
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
      </body>
    </html>
  );
}
