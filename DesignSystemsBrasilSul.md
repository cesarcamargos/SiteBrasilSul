# BrasilSul — Design System

Sistema de design oficial da BrasilSul Tecnologia. Aplicar em todas as páginas.

## Fontes
- Títulos: **Space Grotesk** (600/700)
- Texto: **Manrope** (400/500/600/700)
- Import: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap`

## Cores (tokens)
```
--bg: #f7f8fb;        /* fundo claro */
--surface: #ffffff;   /* cartões */
--ink: #0d1220;       /* texto forte */
--ink-2: #4a5468;     /* texto secundário */
--ink-3: #7c8598;     /* texto fraco / labels */
--line: #e6e9f0;      /* bordas / hairlines */
--accent: #2f5bff;    /* azul de ação */
--accent-600: #1f45db;/* hover */
--accent-tint: #eef2ff;
--dark: #0d1220;      /* seções escuras */
```
Cor de link padrão = `--accent`; hover = `--accent-600`.

## Forma & profundidade
- Raio: cartões `18px`, pills/botões `999px`, blocos grandes `28px`.
- Sombras: `--shadow-sm: 0 1px 2px rgba(13,18,32,.04), 0 2px 8px rgba(13,18,32,.05)`; `--shadow-md: 0 8px 30px rgba(13,18,32,.08)`.
- Espaçamento de borda de página: `--edge: clamp(20px,5vw,64px)`; largura máx `1160px`.

## Componentes
- **Nav**: sticky, fundo translúcido com blur, hairline inferior, marca "BrasilSul." (ponto em `--accent`), botão primário "Pedir cotação".
- **Botões**: `.btn-primary` (azul, sombra azul, hover translateY -1px) e `.btn-ghost` (transparente, borda `--line`). Grande: `.btn-lg`.
- **Hero**: título até ~16ch com termo-chave em `em` cor `--accent`; gradiente radial sutil de fundo; badge "eyebrow" pill com ponto azul.
- **Cards**: superfície branca, borda `--line`, ícone 46px em quadrado `--accent-tint`/`--accent`, hover eleva.
- **Faixa escura** (`--dark`): números/stats, texto branco, destaques `#8aa2ff`.
- **Faixa de fabricantes**: chips pill com borda.
- **Contato**: cartão escuro raio 28px com gradiente azul, pills de contato (e-mail, telefone, WhatsApp).

## Animação (opcional no hero)
Rede neural em canvas: nós azuis `rgba(47,91,255,·)` ligados por linhas, pulsando; ficam **em volta do texto** (zona de exclusão ao redor do bloco `.wrap`, nós ricocheteiam na borda). Respeitar `prefers-reduced-motion`.

## Regras
- Estilos inline/CSS no `<style>`; sem emojis (exceto se pedido).
- Escala mínima de texto 15–16px corpo.
- Idioma: Português (Brasil).
- Contatos: Florianópolis–SC · (48) 3282-5678 · WhatsApp (48) 99852-7340 · atendimento@brasilsul.net.br · desde 2001.

Páginas de referência: `index.html` (sistema moderno canônico). A página `azure-ia.html` usa uma variante Microsoft Foundry (Segoe UI + azul Azure) apenas para o tema de IA.
