import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Happy Kids Toys - Best Toys for Kids | Fast Delivery Across India",
  description: "Shop the best educational, musical, remote control, baby & outdoor toys for kids at Happy Kids Toys. Fast delivery across India. Order on WhatsApp!",
  keywords: "kids toys, educational toys, baby toys, remote control toys, musical toys, outdoor toys, India",
  openGraph: {
    title: "Happy Kids Toys",
    description: "Best Toys for Kids - Fast Delivery Across India",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <main style={{ paddingBottom: '72px' }}>
          {children}
        </main>
        <MobileBottomNav />
        <FloatingWhatsApp />
        <ScrollToTop />
      </body>
    </html>
  );
}
