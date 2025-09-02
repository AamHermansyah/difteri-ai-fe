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
    default: "AyoCekDifteri - Deteksi Penyakit Difteri dengan AI",
    template: "%s | AyoCekDifteri",
  },
  description:
    "AyoCekDifteri adalah website berbasis kecerdasan buatan untuk memprediksi dan mendeteksi penyakit difteri secara cepat, akurat, dan mudah.",
  keywords: [
    "difteri",
    "AI kesehatan",
    "prediksi penyakit",
    "kecerdasan buatan",
    "diagnosis difteri",
    "AyoCekDifteri",
  ],
  authors: [{ name: "AyoCekDifteri Team" }],
  creator: "AyoCekDifteri",
  publisher: "AyoCekDifteri",
  alternates: {
    canonical: "https://ayocekdifteri.com",
  },
  openGraph: {
    type: "website",
    url: "https://ayocekdifteri.com",
    title: "AyoCekDifteri - Deteksi Penyakit Difteri dengan AI",
    description:
      "Prediksi penyakit difteri secara cepat dan akurat menggunakan kecerdasan buatan.",
    siteName: "AyoCekDifteri",
    images: [
      {
        url: "https://ayocekdifteri.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AyoCekDifteri Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AyoCekDifteri - Deteksi Penyakit Difteri dengan AI",
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
