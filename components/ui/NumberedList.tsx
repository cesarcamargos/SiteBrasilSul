import Link from "next/link";
import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export interface NumberedListEntry {
  number: string;
  title: string;
  description: ReactNode;
  href?: string;
  linkLabel?: string;
}

interface NumberedListProps {
  items: NumberedListEntry[];
}

/**
 * The site's signature structural device — a numbered list in the mono
 * face, replacing the icon+title+text card grid pattern. Numbers earn
 * their place here: each list genuinely enumerates a set of offerings.
 */
export function NumberedList({ items }: NumberedListProps) {
  return (
    <RevealGroup className="border-t border-linha">
      {items.map((item) => (
        <RevealItem key={item.number} className="border-b border-linha">
          <div className="grid grid-cols-[56px_1fr] md:grid-cols-[70px_1fr_1fr] gap-lg py-[38px] items-start hover:bg-sinal/[0.03] transition-colors">
            <span className="font-mono text-title text-linha-forte">{item.number}</span>
            <div className="md:col-span-1">
              <h3 className="font-display text-title font-semibold">{item.title}</h3>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-grafite-suave text-body-sm max-w-[34rem]">{item.description}</p>
              {item.href && (
                <Link
                  href={item.href}
                  className="inline-block mt-sm font-mono text-mono-label normal-case border-b border-grafite hover:border-sinal hover:text-sinal transition-colors"
                >
                  {item.linkLabel ?? "Saiba mais"}
                </Link>
              )}
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
