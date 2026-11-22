import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_NAME,
  SITE_URL,
  OG_DEFAULT,
  organizationLd,
  personLd,
} from "@/lib/content";
import CafeteraChatWidget from "@/components/CafeteraChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { JsonLd } from "@/components/Breadcrumbs";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Cafetera Espresso Compacta 2026: Comparativas Amazon US, Molinos y Guía Barista",
    template: "%s",
  },
  description:
    "Guía técnica en español para comprar tu primera cafetera espresso compacta en Amazon Estados Unidos: reseñas y comparativas de CASABREWS CM5418, Breville Bambino y De’Longhi Dedica Arte, molinos, espumadores, básculas y accesorios compatibles.",
  applicationName: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Cafetera Espresso Compacta en Amazon EE. UU. – Comparativas y Guías Barista",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
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
  verification: {
    google: ["google07464c8c60a81e7a", "172C7_Myoxhj0Y7awkbiE22513T05NSfBYUdmPFvxgY"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#C87D32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[#E5A93C] selection:text-[#1E1510]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: SITE_NAME,
                inLanguage: "es",
                publisher: { "@id": `${SITE_URL}/#org` },
              },
              organizationLd,
              personLd,
            ],
          }}
        />
        {children}
        <CafeteraChatWidget />
        <SmoothScroll />
      </body>
    </html>
  );
}
