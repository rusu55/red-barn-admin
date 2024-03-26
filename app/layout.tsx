import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ToasterProvider } from "@/providers/ToastProvider";
import { EdgeStoreProvider } from "@/providers/EdgeStoreProvider";

import { BlogModal } from "@/components/modals/BlogModal";
import { PortfolioModal } from "@/components/modals/PortfolioModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <BlogModal />
          <PortfolioModal />
          <ToasterProvider />
          {children}
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
