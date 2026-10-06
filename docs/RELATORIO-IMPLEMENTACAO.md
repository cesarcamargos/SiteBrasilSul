# Relatório de implementação — branch `melhorias-estudo-2026-10`

Base: tag `antes-melhorias-2026-10` (commit ac0d294). Reversão: `git checkout main` (nada foi enviado) ou `git revert` por commit. **Nenhum push foi feito.**

## O que foi feito
- **Navegação/rodapé** (27 páginas): menu Home, Microsoft 365, Adobe, IA no Azure, Serviços, Blog, Sobre + "Pedir cotação"; rodapé com as ofertas e links legais; anúncio aponta para Copilot.
- **Formulário** (`contato.html`, `js/leads.js`): `?solucao=<chave>` com lista fechada (valor inválido → neutro), `_gotcha`, mensagem opcional (obrigatória em "Outro"), estados enviando/erro/sucesso (sucesso só após resposta OK do Formspree), foco/aria, link de privacidade. Fallback sem JS preservado (POST + `_next`).
- **obrigado.html**: `noindex,follow`, texto neutro. **404.html** + `responseOverrides` no Azure.
- **Novas páginas**: `copilot-microsoft-365.html`, `adobe-acrobat.html`.
- **Reescritas**: inteligencia-artificial (Foundry, sem alegações absolutas), index (três entradas, sem números sem fonte), servicos, microsoft-365, adobe-creative-cloud, migração, backup, segurança, consultoria, sobre, privacidade, termos, compliance, cartorios (matriz e fontes), 10 artigos e blog.html.
- **azure-ia.html** removida; `301 /azure-ia.html → /inteligencia-artificial.html`; `/r/*` preservado.
- **SEO**: títulos/descrições, JSON-LD (Organization com `@id`, Service, Article; FAQPage e ITService removidos), sitemap sem priority/changefreq e com páginas novas, canonical da home com barra final.
- **Medição**: `js/analytics.js` inerte (contrato de eventos; sem ID).
- `PRODUCT.md` atualizado; `docs/PENDENCIAS-COMERCIAIS.md` criado.

## Verificações executadas
- Script local: 30 HTML, 1 H1 por página, canonical/description, links e fragmentos internos, JSON-LD parseável, sitemap × arquivos, frases proibidas (remoto/presencial/suporte local/única nuvem/Ingram/etc.) — sem problemas.
- Navegador local: home renderiza com a mesma identidade; `?solucao=adobe-acrobat` pré-seleciona; valor inválido fica neutro; falha de rede preserva os campos e mostra o erro; sucesso simulado limpa o formulário.

## Não validado
- Envio real ao Formspree/FormSubmit; redirect 301 e 404 no Azure; Lighthouse/Core Web Vitals; mobile e teclado em todas as páginas; faixas/prazos do Provimento 243 contra o texto oficial; validador de schema do Google.
