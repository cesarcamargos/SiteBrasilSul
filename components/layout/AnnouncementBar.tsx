import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-preto text-center font-mono text-mono-label normal-case">
      <Link
        href="/inteligencia-artificial"
        className="block px-md py-[10px] text-branco/80 hover:text-branco transition-colors"
      >
        ✧ <strong className="text-branco">Novidade:</strong> IA corporativa no Azure com nota fiscal
        brasileira
        <span className="ml-[10px] text-sinal font-semibold group-hover:underline">Saiba mais →</span>
      </Link>
    </div>
  );
}
