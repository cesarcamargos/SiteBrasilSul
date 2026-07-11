import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export interface Stat {
  value: string;
  label: string;
}

interface StatRowProps {
  stats: Stat[];
}

/**
 * Stat numbers as static typographic facts in the mono face — a deliberate
 * departure from the count-up-on-scroll hero-metric template. The precision
 * of the instrument face carries the weight; no animation is needed to make
 * a number feel true.
 */
export function StatRow({ stats }: StatRowProps) {
  return (
    <RevealGroup className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-linha">
      {stats.map((stat, i) => (
        <RevealItem
          key={stat.label}
          className={`py-xl px-lg ${i % 2 === 1 ? "border-l border-linha" : ""} ${
            i >= 2 ? "border-t md:border-t-0 border-linha" : ""
          } ${i === 2 ? "md:border-l" : ""}`}
        >
          <strong className="block font-mono text-stat text-grafite mb-xs">{stat.value}</strong>
          <span className="font-mono text-mono-label normal-case text-grafite-leve leading-snug">
            {stat.label}
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
