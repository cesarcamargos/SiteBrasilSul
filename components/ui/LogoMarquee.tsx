import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const LOGOS: Logo[] = [
  { src: "/img/microsoft.svg", alt: "Microsoft", width: 92, height: 20 },
  { src: "/img/adobe.svg", alt: "Adobe", width: 78, height: 20 },
  { src: "/img/openai.svg", alt: "OpenAI", width: 88, height: 20 },
  { src: "/img/anthropic.svg", alt: "Anthropic", width: 96, height: 18 },
  { src: "/img/vmware.svg", alt: "VMware", width: 84, height: 20 },
  { src: "/img/veeam.svg", alt: "Veeam", width: 78, height: 20 },
  { src: "/img/kaspersky.svg", alt: "Kaspersky", width: 92, height: 20 },
  { src: "/img/bitdefender.svg", alt: "Bitdefender", width: 96, height: 18 },
  { src: "/img/autodesk.svg", alt: "Autodesk", width: 88, height: 18 },
  { src: "/img/teamviewer.svg", alt: "TeamViewer", width: 100, height: 18 },
];

function LogoList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex items-center gap-[52px] shrink-0 pr-[52px]"
    >
      {LOGOS.map((logo) => (
        <li key={logo.alt} className="shrink-0 grayscale opacity-70 hover:opacity-100 transition-opacity">
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee-track flex w-max">
        <LogoList />
        <LogoList ariaHidden />
      </div>
    </div>
  );
}
