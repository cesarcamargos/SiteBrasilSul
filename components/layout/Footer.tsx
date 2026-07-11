import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inteligencia-artificial", label: "Inteligência Artificial" },
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-preto text-branco/60 pt-xxl pb-lg">
      <div className="mx-auto max-w-[1180px] px-lg">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-xl pb-xl border-b border-branco/12">
          <div>
            <Link href="/" className="inline-flex">
              <Image
                src="/img/img_logo_branco.png"
                alt="BrasilSul Tecnologia"
                width={150}
                height={28}
                className="h-[18px] w-auto mb-lg"
              />
            </Link>
            <p className="text-body-sm max-w-[28rem]">
              Revenda corporativa e implementadora de soluções de TI desde 2001. Parceira Microsoft, Adobe,
              VMware e Veeam.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-mono-label normal-case text-branco/85 mb-lg">Navegação</h4>
            <ul className="space-y-[11px]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm hover:text-branco transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-mono-label normal-case text-branco/85 mb-lg">Contato</h4>
            <ul className="space-y-[11px] text-body-sm">
              <li>Florianópolis — Santa Catarina</li>
              <li>
                <a href="mailto:atendimento@brasilsul.net.br" className="hover:text-branco transition-colors">
                  atendimento@brasilsul.net.br
                </a>
              </li>
              <li>
                <a href="tel:+554832825678" className="hover:text-branco transition-colors">
                  (48) 3282-5678
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5548998527340?text=Ol%C3%A1!%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o."
                  target="_blank"
                  rel="noopener"
                  className="hover:text-branco transition-colors"
                >
                  WhatsApp: (48) 99852-7340
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-sm pt-lg">
          <p className="text-body-sm text-branco/35">
            © 2026 BrasilSul Tecnologia. Todos os direitos reservados. Os logos exibidos pertencem aos seus
            respectivos detentores.
          </p>
          <p className="flex gap-lg text-body-sm text-branco/35">
            <Link href="/privacidade" className="hover:text-branco transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-branco transition-colors">
              Termos de Uso
            </Link>
            <Link href="/compliance" className="hover:text-branco transition-colors">
              Compliance
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
