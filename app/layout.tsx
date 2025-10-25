import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: "Cubiclabs - Futuristic Technology Solutions",
  description: "Building the future with cutting-edge technology and innovative solutions.",
  keywords: ["technology", "innovation", "software", "development", "3D", "web"],
  authors: [{ name: "Cubiclabs" }],
  openGraph: {
    title: "Cubiclabs - Futuristic Technology Solutions",
    description: "Building the future with cutting-edge technology and innovative solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body className="font-inter">
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                backdropFilter: 'blur(10px)',
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
