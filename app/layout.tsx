import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const chivo = Chivo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayocekdifteri.com"),
  title: {
    default: "DifteriAI - Deteksi Penyakit Difteri dengan AI",
    template: "%s | DifteriAI",
  },
  description:
    "DifteriAI adalah website berbasis kecerdasan buatan untuk memprediksi dan mendeteksi penyakit difteri secara cepat, akurat, dan mudah.",
  keywords: [
    "difteri",
    "AI kesehatan",
    "prediksi penyakit",
    "kecerdasan buatan",
    "diagnosis difteri",
    "DifteriAI",
  ],
  authors: [{ name: "DifteriAI Team" }],
  creator: "DifteriAI",
  publisher: "DifteriAI",
  alternates: {
    canonical: "https://ayocekdifteri.com",
  },
  openGraph: {
    type: "website",
    url: "https://ayocekdifteri.com",
    title: "DifteriAI - Deteksi Penyakit Difteri dengan AI",
    description:
      "Prediksi penyakit difteri secara cepat dan akurat menggunakan kecerdasan buatan.",
    siteName: "DifteriAI",
    images: [
      {
        url: "https://ayocekdifteri.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "DifteriAI Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DifteriAI - Deteksi Penyakit Difteri dengan AI",
    description:
      "Prediksi penyakit difteri secara cepat dan akurat menggunakan kecerdasan buatan.",
    images: ["https://ayocekdifteri.com/og-image.png"],
    creator: "@ayocekdifteri",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${chivo.className} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
