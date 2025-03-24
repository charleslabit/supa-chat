import { Layout } from "@/containers/layout/AppLayout";
import { QueryProvider } from "@/providers/QueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supa Chat",
  description: "This is not messenger.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <QueryProvider>
            <Layout>{children}</Layout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
