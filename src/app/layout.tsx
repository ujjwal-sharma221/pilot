import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s - Pilot", absolute: "Pilot" },
  description: "AI Resume Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className} antialiased`}>
          {children}
          <Toaster closeButton position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
