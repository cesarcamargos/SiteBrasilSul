import type { Metadata } from "next";

const SITE_URL = "https://www.brasilsul.net.br";
const SITE_NAME = "BrasilSul Tecnologia";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: "pt_BR",
      siteName: SITE_NAME,
    },
  };
}

export { SITE_URL, SITE_NAME };
