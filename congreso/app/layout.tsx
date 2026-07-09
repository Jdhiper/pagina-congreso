import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StructuredData from "./structured-data";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://www.jornadasiberoamericanasdederechoprocesalpenal.com"
  ),

  title: {
    default:
      "III Jornadas Iberoamericanas de Derecho Procesal Penal 2026",
    template: "%s | III Jornadas Iberoamericanas",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  description:
    "Sitio oficial de las III Jornadas Iberoamericanas de Derecho Procesal Penal 2026 con énfasis en Inteligencia Artificial. Congreso internacional con conferencistas de Iberoamérica, modalidad presencial y virtual.",

  keywords: [
    "Derecho Procesal Penal",
    "Congreso de Derecho",
    "Inteligencia Artificial",
    "Congreso Jurídico",
    "Jornadas Iberoamericanas",
    "Derecho Penal",
    "Abogados",
    "Magistrados",
    "Jueces",
    "Universidad CESMAG",
    "Universidad de Nariño",
    "Universidad Mariana",
    "Universidad Cooperativa",
    "Pasto",
    "Envigado",
    "Guadalajara",
    "México",
    "Colombia",
    "Congreso Derecho 2026",
  ],

  authors: [
    {
      name: "Comité Organizador - III Jornadas Iberoamericanas",
    },
  ],

  creator: "III Jornadas Iberoamericanas de Derecho Procesal Penal",

  publisher: "III Jornadas Iberoamericanas de Derecho Procesal Penal",

  alternates: {
    canonical:
      "https://www.jornadasiberoamericanasdederechoprocesalpenal.com",
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

  openGraph: {
    title:
      "III Jornadas Iberoamericanas de Derecho Procesal Penal 2026",

    description:
      "Congreso internacional de Derecho Procesal Penal con énfasis en Inteligencia Artificial. Más de 90 conferencistas nacionales e internacionales.",

    url: "https://www.jornadasiberoamericanasdederechoprocesalpenal.com",

    siteName:
      "III Jornadas Iberoamericanas de Derecho Procesal Penal",

    locale: "es_CO",

    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "III Jornadas Iberoamericanas de Derecho Procesal Penal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "III Jornadas Iberoamericanas de Derecho Procesal Penal",

    description:
      "Congreso internacional con énfasis en Inteligencia Artificial.",

    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">

        <StructuredData />

        <Navbar />

        {children}

        <Footer />

        <Analytics />

        <SpeedInsights />

      </body>
    </html>
  );
}