import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import "./theme.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | IA, Licenciamento e Soluções Microsoft`,
  },
  description:
    "Inteligência Artificial via Microsoft Azure com NF brasileira, Microsoft 365, Adobe, Veeam e mais. Revenda corporativa desde 2001. Peça sua cotação.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-full flex-col antialiased">
        <OrganizationJsonLd />
        <a
          href="#conteudo"
          className="fixed left-[-9999px] top-0 z-toast bg-grafite px-lg py-sm text-branco focus:left-0"
        >
          Pular para o conteúdo
        </a>
        <AnnouncementBar />
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <CookieConsent />
      </body>
    </html>
  );
}
