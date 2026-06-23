import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import { ViewTransitions } from "next-view-transitions";
import { SITE_URL } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rodrigo Peralta | Senior React & React Native Engineer",
    template: "%s | Rodrigo Peralta",
  },
  description:
    "Senior React & React Native Engineer with 8+ years building production mobile and web apps. Expert in fintech, banking, and AI-powered systems. React Native, Next.js, TypeScript, Python.",
  keywords: [
    "React Native developer",
    "Next.js developer",
    "Senior frontend developer",
    "Mobile developer",
    "React developer",
    "TypeScript",
    "fintech developer",
    "AI engineer",
    "RAG",
    "Rodrigo Peralta",
    "portfolio",
  ],
  authors: [{ name: "Rodrigo Peralta", url: SITE_URL }],
  creator: "Rodrigo Peralta",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rodrigo Peralta",
    title: "Rodrigo Peralta | Senior React & React Native Engineer",
    description:
      "Senior React & React Native Engineer with 8+ years building production mobile and web apps. React Native, Next.js, TypeScript, Python, AI.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodrigo Peralta | Senior React & React Native Engineer",
    description:
      "Senior React & React Native Engineer with 8+ years building production mobile and web apps. React Native, Next.js, TypeScript, Python, AI.",
    creator: "@rodrigoperaltadev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0EC" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ViewTransitions>
          <AppProvider>{children}</AppProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
