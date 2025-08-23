import type { Metadata } from "next";
import { Chivo } from "next/font/google";
import "./globals.css";

const chivo = Chivo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DifteriAI",
  description: "Website untuk memprediksi penyakit difteri menggunakan kecerdasan buatan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chivo.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
