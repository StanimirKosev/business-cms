import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/app/context/LanguageContext";

// Font
const manrope = Manrope({
  subsets: ["latin", "latin-ext"], // latin-ext for Bulgarian characters
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Construction Company - Professional Building Services in Bulgaria",
  description:
    "Professional construction services in Bulgaria. View our portfolio of completed projects and contact us for your construction needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Language for SEO
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: 'white',
                border: '1px solid #e0e0e0',
              },
              classNames: {
                success: 'toast-success',
                error: 'toast-error',
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
