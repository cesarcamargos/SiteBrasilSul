import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FoundryPanel } from "@/components/ui/FoundryPanel";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { NumberedList, type NumberedListEntry } from "@/components/ui/NumberedList";
import { Section } from "@/components/ui/Section";
import { StatRow } from "@/components/ui/StatRow";

const SERVICES: NumberedListEntry[] = [
  {
    number: "01",
    title: "Microsoft 365",
    description:
      "E-mail corporativo, Teams, SharePoint e Office completo — trabalhe de qualquer lugar com segurança.",
    href: "/servicos",
  },
  {
    number: "02",
    title: "Licenciamento e consultoria",
    description:
      "Licencie corretamente Microsoft, Adobe, VMware e antivírus, com apoio em auditorias e gestão do parque.",
    href: "/servicos",
  },
  {
    number: "03",
    title: "Segurança e backup",
    description: "Proteção de dados com Veeam, Kaspersky e Bitdefender — backup confiável e antivírus gerenciado.",
    href: "/servicos",
  },
];

const STATS = [
  { value: "2001", label: "Ano de fundação" },
  { value: "216", label: "Clientes ativos" },
  { value: "1.870", label: "Licenças ativas" },
  { value: "25", label: "Certificações" },
];

export default function Home() {
  return (
    <>
      {/* Hero — the one deliberate eyebrow on this page; every other
          section below states its heading directly. */}
      <section className="border-b border-linha pt-[64px] pb-[56px] md:pt-[96px] md:pb-[88px]">
        <div className="mx-auto max-w-[1180px] px-lg">
          <div className="flex flex-wrap justify-between items-end gap-xl mb-xl pb-lg border-b border-linha">
            <p className="font-mono text-mono-label normal-case text-sinal">
              Soluções de TI e licenciamento de software — desde 2001
            </p>
            <p className="font-mono text-mono-label normal-case text-grafite-leve">
              Florianópolis, Santa Catarina
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-[64px] items-end">
            <Reveal>
              <h1 className="font-display text-display font-semibold text-balance max-w-[46rem]">
                Contrate os melhores modelos de <span className="text-sinal">Inteligência Artificial</span>{" "}
                para a sua empresa.
              </h1>
              <p className="text-body-lg text-grafite-suave max-w-[30rem] mt-lg leading-relaxed">
                Além de IA via Microsoft Azure, ajudamos sua empresa a licenciar e implantar software
                corporativo — de Microsoft e Adobe à segurança e backup — com suporte local e nota fiscal
                brasileira.
              </p>
              <div className="flex flex-wrap gap-sm mt-xl">
                <Button href="/inteligencia-artificial">Conhecer a solução de IA</Button>
                <Button href="/contato" variant="outline">
                  Pedir cotação
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <FoundryPanel />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="py-[30px] border-b border-linha">
        <div className="mx-auto max-w-[1180px] px-lg">
          <p className="text-center font-mono text-mono-label normal-case text-grafite-leve mb-lg">
            Parceira oficial dos principais fabricantes
          </p>
          <LogoMarquee />
        </div>
      </div>

      <Section>
        <div className="flex flex-wrap justify-between items-baseline gap-lg mb-xl max-w-[46rem]">
          <h2 className="font-display text-headline font-semibold">O que fazemos</h2>
          <p className="max-w-[20rem] text-grafite-suave">
            Da escolha da solução certa até a implantação e o suporte contínuo.
          </p>
        </div>
        <NumberedList items={SERVICES} />
      </Section>

      <Section paddingTop={false}>
        <div className="bg-preto text-branco p-xl md:p-[56px] grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[50px] items-center">
          <Reveal>
            <h2 className="font-display text-headline font-semibold text-branco">
              GPT e Claude na mesma plataforma, com NF brasileira
            </h2>
            <p className="text-branco/70 mt-md mb-xl">
              O Azure é hoje a única nuvem que reúne os modelos de fronteira da OpenAI e da Anthropic. Sua
              empresa escolhe o melhor modelo para cada tarefa — e a BrasilSul cuida de toda a contratação e
              suporte.
            </p>
            <a
              href="/inteligencia-artificial"
              className="inline-block font-mono text-mono-label normal-case text-branco border-b border-branco hover:border-sinal hover:text-sinal transition-colors"
            >
              Ver como funciona
            </a>
          </Reveal>
          <ul className="flex flex-col">
            {[
              "Pagamento em reais",
              "Nota fiscal brasileira",
              "Pague só o que usar",
              "Dados protegidos — LGPD",
              "Suporte em português",
            ].map((chip) => (
              <li key={chip} className="text-body-sm text-branco/85 py-sm border-b border-branco/14 last:border-b-0">
                <span className="text-sinal">— </span>
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section paddingTop={false}>
        <StatRow stats={STATS} />
      </Section>

      <Section paddingTop={false}>
        <div className="bg-preto text-branco p-xl md:p-[56px] flex flex-wrap items-center justify-between gap-lg">
          <div>
            <h2 className="font-display text-subheadline font-semibold text-branco">
              Precisa renovar ou contratar licenças?
            </h2>
            <p className="text-branco/62 mt-xs">
              Envie seu pedido e receba uma cotação personalizada em até 1 dia útil.
            </p>
          </div>
          <Button href="/contato" variant="light">
            Pedir cotação agora
          </Button>
        </div>
      </Section>
    </>
  );
}
