import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "split" | "stacked";
  tone?: "default" | "dark";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "split",
  tone = "default",
}: SectionHeaderProps) {
  const eyebrowColor = tone === "dark" ? "text-sinal" : "text-sinal";
  const descColor = tone === "dark" ? "text-branco/70" : "text-grafite-suave";

  if (align === "stacked") {
    return (
      <div className="max-w-[44rem] mb-xl">
        {eyebrow && (
          <p className={`font-mono text-mono-label uppercase mb-sm ${eyebrowColor}`}>{eyebrow}</p>
        )}
        <h2 className="font-display text-headline font-semibold text-balance">{title}</h2>
        {description && <p className={`text-body-lg mt-sm ${descColor}`}>{description}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-lg mb-xl max-w-[46rem]">
      <div>
        {eyebrow && (
          <p className={`font-mono text-mono-label uppercase mb-sm ${eyebrowColor}`}>{eyebrow}</p>
        )}
        <h2 className="font-display text-headline font-semibold text-balance">{title}</h2>
      </div>
      {description && <p className={`max-w-[20rem] ${descColor}`}>{description}</p>}
    </div>
  );
}
