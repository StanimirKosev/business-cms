import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { HtmlWrapper } from "@/app/components/HtmlWrapper";

// Font - optimized weights for performance
const manrope = Manrope({
  subsets: ["latin", "latin-ext"], // latin-ext for Bulgarian characters
  weight: ["400", "600", "700"], // Regular, Semi-bold, Bold
  variable: "--font-manrope",
  display: "swap", // Show fallback font while loading
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default:
      "Строителна фирма Техно Строй България ООД - строителство, реконструкция, рехабилитация и модернизация",
    template: "%s | Техно Строй България",
  },
  description:
    "Строителна фирма в София с над 15 години опит. Предлагаме строителни услуги - жилищно, промишлено и инфраструктурно строителство, реконструкция, рехабилитация и модернизация в България.",
  keywords: [
    "строителна фирма София",
    "строителство България",
    "реконструкция",
    "рехабилитация",
    "модернизация",
    "строителни услуги",
    "жилищно строителство",
    "промишлено строителство",
    "инфраструктурни проекти",
    "Техно Строй",
  ],
  authors: [{ name: "Техно Строй България ООД" }],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    alternateLocale: "en_US",
    url: "https://technostroy.bg",
    siteName: "Техно Строй България",
    title:
      "Строителна фирма Техно Строй България ООД - строителство, реконструкция, рехабилитация и модернизация",
    description:
      "Строителна фирма в София с над 15 години опит. Жилищно, промишлено и инфраструктурно строителство.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <HtmlWrapper>
        <body className={`${manrope.variable} antialiased`}>
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
          <Toaster position="top-center" richColors />
        </body>
      </HtmlWrapper>
    </LanguageProvider>
  );
}
