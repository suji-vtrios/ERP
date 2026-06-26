// External libraries
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

// Internal imports
import { AppProvider } from "@/providers/app-provider";

// Styles
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
