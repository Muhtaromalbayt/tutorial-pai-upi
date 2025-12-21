import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ai/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tutorial PAI–SPAI UPI | Semester Genap 2025/2026",
  description: "Tutorial PAI–SPAI UPI — Kabinet AL-FATH. Menumbuhkan Adab, Menggerakkan Peradaban.",
  keywords: ["Tutorial PAI", "SPAI UPI", "Kabinet AL-FATH", "UPI", "Pendidikan Agama Islam"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/logo/tutorial-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${sourceSans.variable}`}>
      <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
      <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.png?v=2" />
      <link rel="shortcut icon" href="/favicon.ico?v=2" />
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
