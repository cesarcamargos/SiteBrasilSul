"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inteligencia-artificial", label: "Inteligência Artificial" },
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-sticky bg-concreto/92 backdrop-blur-md border-b border-linha">
      <div className="mx-auto max-w-[1180px] px-lg h-[84px] flex items-center justify-between gap-lg">
        <Link href="/" aria-label="BrasilSul Tecnologia — página inicial" className="flex items-center shrink-0">
          <Image src="/img/img_logo_preto.png" alt="BrasilSul Tecnologia" width={150} height={28} priority />
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-sm text-grafite"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <nav
          aria-label="Navegação principal"
          className={`${
            open ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-[34px] absolute md:static top-[84px] left-0 right-0 md:top-auto bg-concreto md:bg-transparent border-b md:border-b-0 border-linha px-lg md:px-0 pb-lg md:pb-0`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`font-mono text-mono-label normal-case py-[15px] md:py-0 border-b md:border-b-2 border-linha md:border-transparent transition-colors ${
                  isActive ? "text-grafite md:border-sinal" : "text-grafite-suave hover:text-grafite"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/contato" className="mt-md md:mt-0 justify-center md:justify-start" showArrow={false}>
            Pedir cotação
          </Button>
        </nav>
      </div>
    </header>
  );
}
