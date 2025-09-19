import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./customAnimation.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LoginProvider } from "@/components/providers/LoginProvider";
import { Navbar } from "@/components/layout/navbar";
import { CustomToaster } from "@/components/ui/custom-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AssignOwl - AI Assignment Writer",
  description: "Create high-quality assignments with AI assistance. Professional, fast, and reliable academic writing service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="light" storageKey="assignowl-theme">
          <LoginProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <CustomToaster />
          </LoginProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
