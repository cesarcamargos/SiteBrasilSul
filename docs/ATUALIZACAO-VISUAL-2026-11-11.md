# Atualização visual — 11/11/2026

A home foi redesenhada (versão 3.0), mantendo tipografia, cores e fotografia do modelo de 24/10/2026. Uma nova camada de efeitos passou a valer para as 30 páginas.

## O que mudou

- Home: sem o painel de abas Microsoft/Adobe/Azure. Capa com título à esquerda e cartão "Proposta comercial" (modelo ilustrativo, sem preços) sobre a faixa de `img/horizonte.webp`; fabricantes em texto; três frentes em linhas numeradas (`.frente`); bloco "A BrasilSul" com linha 2001–ano atual e três compromissos; etapas (`.etapas`); leituras; fecho com CTA.
- Arquivos: `css/motion.css` e `js/motion.js` foram substituídos por `css/tema.css` (efeitos e refinamentos compartilhados, carrega por último), `css/inicio.css` (somente a home) e `js/efeitos.js` (entrada ao rolar, relógio de Florianópolis, navegação de serviço que acompanha a leitura, controle de efeitos no rodapé, voltar ao início). `js/anim.js`, sem referências, foi removido. O código das abas em `js/site.js` ficou inerte.
- Movimento: depende da classe `fx` em `<html>`, definida por script inline no `<head>` quando não há pedido de redução de movimento nem pausa (localStorage `brasilsul-motion`). Sem `fx` ou sem JavaScript o conteúdo aparece completo. Sem animações infinitas, desfoque, barra de progresso ou botões magnéticos.
- Ajustes menores: `404.html` com uma única meta `robots` (`noindex,follow`); hierarquia de títulos corrigida em `servicos.html` e `sobre.html` (h3 sem h2 anterior virou h2 com a classe `.tit-h3` em `css/pages.css`, que mantém o estilo anterior).

## Validação

- `python scripts/verificar-site.py`: OK, 30 páginas.
- `node .qa/check.cjs` (Playwright com Chrome, 30 páginas em 320, 390, 768 e 1440px): nenhum achado e nenhum erro (transbordamento, h1, imagens, títulos cortados, texto oculto, JS).
- Playwright com movimento ativo, em `index.html` e `microsoft-365.html` a 1440 e 390px: após rolar até o fim, nenhum `.rv` sem `is-in` e nenhum `main p, h2, h3` com opacidade 0; botão `.efeitos-toggle` remove `fx`, troca o texto e a preferência persiste após recarregar.
- Navegação de serviço em `microsoft-365.html` recebe `aria-current` ao rolar; menu a 1000px abre e fecha com Escape; `[data-hora-floripa]` com HH:MM e `data-periodo` definido na home; linhas de comparação de `inteligencia-artificial.html` a 390px com o primeiro filho visível.
- Títulos alterados: estilos computados e capturas da região a 1440px idênticos antes e depois.

Não foi testada a entrega real de e-mails pelo provedor nem o comportamento em outros navegadores além do Chrome.

## Pendências

- `og:image` ainda não existe.
- `css/style.css` e `css/pages.css` ainda contêm regras da home antiga, sem uso; podem ser removidas numa limpeza.
- `css/layout.css` tem cerca de 35–40% de regras legadas sem uso.
