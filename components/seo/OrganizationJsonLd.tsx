import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/metadata";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "BrasilSul Tecnologia",
        url: SITE_URL,
        logo: `${SITE_URL}/img/img_logo_preto.png`,
        foundingDate: "2001",
        description:
          "Revenda corporativa e implementadora de soluções de TI: Microsoft 365, Adobe, VMware, Veeam, Kaspersky, Bitdefender, Autodesk, TeamViewer e Inteligência Artificial via Microsoft Azure.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Florianópolis",
          addressRegion: "SC",
          addressCountry: "BR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55-48-3282-5678",
          contactType: "customer service",
          email: "atendimento@brasilsul.net.br",
          availableLanguage: "Portuguese",
        },
        sameAs: [],
      }}
    />
  );
}
