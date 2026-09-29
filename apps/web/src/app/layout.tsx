import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "QRaksha — UPI QR Physical Sticker Verification",
  description:
    "Merchant self-audit tool detecting swapped, cloned, or relocated UPI QR stickers with AI verification & public blockchain anchoring.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B4D8C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text flex flex-col items-center">
        <div className="w-full max-w-[480px] min-h-screen flex flex-col bg-surface shadow-sm relative pb-16">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
