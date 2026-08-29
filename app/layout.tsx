import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallBar } from "@/components/layout/CallBar";
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup";
import { CookieBanner } from "@/components/layout/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Display font for headings — tight, high-contrast grotesque per the AXICALL design system. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.monestimationauto.fr"),
  title: {
    default: "MonEstimationAuto — Estimation et rachat de véhicule",
    template: "%s",
  },
  description:
    "Estimation gratuite, rachat et mise en relation pour vendre votre véhicule d'occasion rapidement.",
  keywords: [
    "estimation voiture",
    "estimation véhicule",
    "rachat voiture",
    "vendre voiture rapidement",
    "reprise automobile",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <CallBar />
        <ExitIntentPopup />
        <CookieBanner />
      </body>
    </html>
  );
}
