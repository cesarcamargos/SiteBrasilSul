---
name: BrasilSul Tecnologia
description: Site institucional editorial para revenda corporativa de TI e IA, com paleta terrosa neutra e tipografia serifada
colors:
  papel: "#F7F4EF"
  papel-alt: "#EFEAE1"
  tinta: "#1A1917"
  tinta-suave: "#5C5A52"
  tinta-leve: "#8A8778"
  linha: "#DDD7C9"
  linha-forte: "#C9C1AC"
  bronze: "#8B6F4E"
  bronze-escuro: "#6E5A3F"
  branco: "#FFFFFF"
  preto: "#14130F"
  whatsapp: "#25D366"
  whatsapp-escuro: "#1DA851"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.6rem, 6vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.9rem, 3.6vw, 2.7rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.28rem"
    fontWeight: 500
    lineHeight: 1.08
  body:
    fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.09em"
rounded:
  none: "0px"
  icon: "4px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "32px"
  xl: "56px"
  xxl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.tinta}"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "15px 26px"
  button-primary-hover:
    backgroundColor: "{colors.bronze}"
    textColor: "#FFFFFF"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "15px 26px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "#FFFFFF"
    rounded: "50%"
    size: "54px"
---

# Design System: BrasilSul Tecnologia

## 1. Overview

**Creative North Star: "O Estúdio de Arquitetura"**

O sistema visual da BrasilSul se comporta como o site de um escritório de arquitetura premium — Foster+Partners, David Chipperfield, Herzog & de Meuron — não como uma landing page de tecnologia. Tipografia serifada (Fraunces) para títulos, sans-serif técnica (Inter) para o corpo, paleta terrosa neutra em torno de um único acento bronze/latão, e uma malha de linhas finas de 1px organizando tudo como plantas de um projeto. O bronze aparece com moderação — eyebrows, hovers, números de destaque — nunca como cor dominante.

O sistema rejeita explicitamente o vocabulário visual de SaaS genérico: nada de gradientes decorativos, cards ícone+título+texto empilhados, hero-metric templates, glassmorphism ou emblemas "AI-powered" piscando. Onde a maioria dos sites de tecnologia usa cor e sombra para chamar atenção, este usa espaço, alinhamento e hairlines.

**Key Characteristics:**
- Cantos retos em todo o sistema — nenhum `border-radius` em botões, cards, campos ou painéis (exceto o botão circular de WhatsApp e ícones de 4px).
- Divisórias finas (`1px solid var(--linha)`) substituem sombra como principal ferramenta de hierarquia.
- Listas numeradas (`01`, `02`, `03`) em Fraunces fazem o papel que ícones fariam em um site de SaaS.
- Um único acento de cor (bronze) usado com extrema disciplina.

## 2. Colors

Paleta terrosa e neutra — linho, tinta quase-preta e um único acento bronze/latão — sem cores secundárias ou terciárias.

### Primary
- **Bronze** (#8B6F4E): único acento do sistema. Usado em eyebrows, hover de botões e links, números de destaque (`.num`), ícones informativos, bordas de foco. Nunca em áreas grandes de superfície.
- **Bronze Escuro** (#6E5A3F): variante de bronze para estados ou fundos escuros; pouco usado diretamente, mais como referência de contraste.

### Neutral
- **Papel** (#F7F4EF): fundo principal do site — linho claro, não branco puro.
- **Papel Alternado** (#EFEAE1): fundo de seções alternadas (cabeçalhos de tabela, painéis destacados), mais quente que o papel.
- **Tinta** (#1A1917): texto principal e títulos — preto quente, nunca `#000`.
- **Tinta Suave** (#5C5A52): texto secundário, parágrafos de apoio.
- **Tinta Leve** (#8A8778): texto terciário, legendas, labels em maiúsculas.
- **Linha** (#DDD7C9): hairline padrão — divisórias de seção, bordas de tabela, grade.
- **Linha Forte** (#C9C1AC): hairline de maior contraste — números decorativos, marcadores "✕" em comparações.
- **Branco** (#FFFFFF) / **Preto** (#14130F): extremos usados em seções invertidas (painel de IA, rodapé, faixas CTA) e formulários.

### Functional
- **WhatsApp** (#25D366) / **WhatsApp Escuro** (#1DA851): exclusivo do botão flutuante e CTA de WhatsApp — a única cor de marca externa permitida no sistema, porque é reconhecimento de produto, não decoração.

### Named Rules
**The One Accent Rule.** O bronze é o único acento cromático do sistema. Nunca introduza uma segunda cor de destaque (azul, verde institucional, etc.) fora do verde funcional do WhatsApp.

## 3. Typography

**Display Font:** Fraunces (com fallback Georgia, serif)
**Body Font:** Inter (com fallback Segoe UI, system-ui, sans-serif)

**Character:** Um par de contraste clássico — serifada editorial de peso variável para títulos, grotesca técnica para corpo e UI. Fraunces carrega a autoridade e o calor humano; Inter carrega precisão e legibilidade funcional.

### Hierarchy
- **Display** (500, `clamp(2.6rem, 6vw, 4.6rem)`, 1.08): H1 de hero, `letter-spacing: -0.01em`. Usa itálico bronze (`.t-bronze`) para destacar uma palavra-chave dentro do título.
- **Headline** (500, `clamp(1.9rem, 3.6vw, 2.7rem)`, 1.08): H2 de seção.
- **Title** (500, `1.1–1.4rem`, 1.08): H3 de item numerado, card, FAQ.
- **Body** (400, `0.9–1.18rem`, 1.65–1.75): parágrafos; corpo de blog até `.post-corpo` com 1.05rem e line-height 1.75. Máximo ~42rem de largura de coluna.
- **Label** (600, `0.72–0.84rem`, letter-spacing `0.05–0.14em`, uppercase): eyebrows, labels de formulário, cabeçalhos de tabela, badges de categoria — sempre em Inter maiúsculo com tracking largo.

### Named Rules
**The Serif-Authority Rule.** Fraunces é reservado para h1–h3 e números de destaque (`.numero strong`, `.num`). Nunca usar Fraunces em botões, labels ou navegação — esses são sempre Inter maiúsculo.

## 4. Elevation

O sistema é estritamente flat: nenhum `box-shadow` é usado para hierarquia de superfície em nenhum componente (exceto o botão flutuante de WhatsApp, que precisa se destacar sobre o conteúdo). A profundidade e a separação vêm inteiramente de hairlines (`1px solid var(--linha)`), blocos de cor sólida (preto/papel-alt) e espaçamento generoso — nunca de sombra.

### Shadow Vocabulary
- **Flutuante** (`box-shadow: 0 8px 20px rgba(0,0,0,.22)`): exclusivo do botão de WhatsApp fixo, a única exceção à regra flat porque precisa parecer um elemento sobreposto à página.

### Named Rules
**The Flat-By-Default Rule.** Nenhuma sombra em botões, cards, painéis ou campos de formulário. Hierarquia vem de hairlines e blocos de cor sólida, não de elevação simulada.

## 5. Components

Sóbrios e precisos: cantos sempre retos, transições curtas (0.2s), bordas finas de 1px como principal forma de definição.

### Buttons
- **Shape:** cantos retos (`border-radius: 0`) em todos os botões, sem exceção.
- **Primary:** fundo `var(--tinta)`, texto branco, padding `15px 26px`, Inter 700 uppercase com `letter-spacing: 0.06em`, seta `→` que desliza 4px no hover.
- **Hover / Focus:** fundo muda para `var(--bronze)` no hover; foco visível é contorno de 2px em bronze com 3px de offset (`:focus-visible`).
- **Outline (Contorno):** fundo transparente, borda e texto em `var(--tinta)`; no hover assume o mesmo preenchimento bronze do primary.
- **Invertido / Claro:** variantes para fundos escuros (`.botao-invertido`, `.botao-claro`) usando papel/branco como base.
- **WhatsApp:** único botão circular do sistema (`border-radius: 50%`), verde de marca, com sombra flutuante — exceção deliberada às regras de flat e cantos retos.

### Cards / Containers
- **Corner Style:** sempre reto (`border-radius: 0`).
- **Background:** `var(--papel-alt)` para painéis destacados (`.painel-borda`, `.legal-indice`), `var(--preto)` para painéis invertidos (destaque IA, CTA em faixa).
- **Shadow Strategy:** nenhuma; ver seção Elevation.
- **Border:** `1px solid var(--linha)` em painéis claros; sem borda em painéis pretos (contraste de cor já basta).
- **Internal Padding:** 36–40px em painéis grandes; 30–34px em itens de lista/benefício.

### Inputs / Fields
- **Style:** sem borda lateral — apenas `border-bottom: 1px solid var(--linha-forte)`, fundo transparente, sem radius.
- **Focus:** a borda inferior muda para `var(--bronze)`, sem outline adicional.
- **Label:** Inter 600 uppercase 0.78rem acima do campo, cor `var(--tinta-suave)`.

### Navigation
- Inter 600 uppercase, `letter-spacing: 0.09em`, cor `var(--tinta-suave)` em repouso, `var(--tinta)` no hover. Item ativo ganha sublinhado bronze (`border-bottom-color: var(--bronze)`). Header sticky com blur de fundo (`backdrop-filter: blur(10px)`) sobre papel semitransparente. Em mobile (<640px), colapsa em menu vertical com hairlines entre itens.

### Listas numeradas (componente assinatura)
Substitui o padrão de "card com ícone" tão comum em SaaS. Número em Fraunces (`.num`, cor `var(--linha-forte)` ou `var(--bronze)` conforme contexto) alinhado à esquerda de um grid de 2–3 colunas, com hairline `1px solid var(--linha)` separando cada item. Usado em serviços, passos, exigências, comparações e listas de benefícios — é o principal mecanismo de estrutura visual do site.

## 6. Do's and Don'ts

### Do:
- **Do** manter todos os cantos retos (`border-radius: 0`) — botões, cards, campos, painéis. Only exception: o botão circular de WhatsApp.
- **Do** usar hairlines (`1px solid var(--linha)`) para separar e estruturar conteúdo em vez de sombra ou cor de fundo.
- **Do** reservar o bronze (`#8B6F4E`) para acento único — eyebrows, hover, números, foco — nunca como cor de superfície dominante.
- **Do** usar listas numeradas em Fraunces como substituto de ícones para estruturar seções de "o que fazemos", passos ou comparações.
- **Do** manter parágrafos de corpo entre 65–75ch e usar Inter para toda UI/label, Fraunces exclusivamente para títulos e números de destaque.

### Don't:
- **Don't** usar gradientes decorativos em nenhum elemento — texto, fundo ou botão.
- **Don't** empilhar cards idênticos com ícone + título + texto; use a lista numerada em vez disso.
- **Don't** usar glassmorphism decorativo (blur + transparência sem propósito funcional) — o único `backdrop-filter` do sistema é o header sticky, que tem função real de legibilidade sobre conteúdo em scroll.
- **Don't** adicionar `box-shadow` a botões, cards ou painéis — o sistema é flat por definição; a única exceção documentada é o botão de WhatsApp.
- **Don't** introduzir uma segunda cor de acento cromático — o sistema tem uma única cor de marca (bronze) mais o verde funcional do WhatsApp, nada além disso.
- **Don't** usar tom de vendedor genérico de tecnologia ("badges AI-powered", hero-metric templates) — a voz é de especialista técnico e editorial, não de startup de SaaS.
