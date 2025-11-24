import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import env from "@/config/env";
import Providers from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: env.SITE_NAME,
  description: `${env.SITE_NAME} — Next.js app`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Mount client providers */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <Providers>
          {children}
          {env.USE_MOCK_DATA && (
            <div className="fixed bottom-4 right-4 rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-white">
              Mock Data Active
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
