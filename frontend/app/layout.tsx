// External libraries
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Internal imports
import { AppProvider } from "@/providers/app-provider";

// Styles
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
  applicationName: "Group ERP",
  title: {
    default: "Group ERP",
    template: "%s | Group ERP",
  },
  description:
    "Enterprise Resource Planning platform for Architecture, Engineering, BIM, and Design Consultancy firms.",
  authors: [{ name: "Group ERP" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
