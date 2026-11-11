# BrasilSul — Design System

Sistema aplicado às 30 páginas do site a partir do modelo `BrasilSul-site/dist`, fornecido em 24/10/2026. A referência substitui a composição azul anterior por horizonte fotográfico, verdes suaves, botões escuros e superfícies claras. A personalidade continua confiável, técnica e próxima. Em 11/11/2026 a home foi redesenhada (versão 3.0), mantendo tipografia, cores e fotografia.

## Tipografia

- Família: `"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, "Helvetica Neue", Arial, sans-serif`.
- Não carregar fontes externas. Texto corrente de 16–18px; rótulos e metadados podem ser menores.
- Títulos com peso 600, escala fluida e espaçamento mínimo de `-.04em`. Usar `text-wrap: balance` e permitir quebra em telas pequenas.

## Cores

```css
--paper: #fafbf8;  /* fundo */
--ink: #20251f;    /* texto e botões principais */
--muted: #56624f;  /* texto secundário */
--line: #dfe3da;   /* separadores */
--lime: #c9fa69;   /* detalhes e indicadores na home */
--accent: #365b43; /* links e estados ativos */
```

As páginas internas usam `#e8efdd` nos cabeçalhos e `#f0f3eb` nas faixas alternadas. Textos sobre fundos claros devem manter contraste de pelo menos 4,5:1.

## Componentes

- **Cabeçalho**: `.header`, logo original centralizado no desktop, navegação à esquerda, contato e cotação à direita. Menu recolhido até 1050px, com estado acessível, fechamento por Escape e links disponíveis sem JavaScript.
- **Home**: não há mais painel com abas Microsoft/Adobe/Azure. Capa com título à esquerda e cartão "Proposta comercial" (modelo ilustrativo, sem preços) sobreposto à faixa da fotografia `img/horizonte.webp`; lista de fabricantes em texto; três frentes em linhas numeradas (`.frente`); bloco "A BrasilSul" com linha 2001–ano atual e três compromissos; etapas (`.etapas`); leituras; fecho com CTA.
- **Páginas internas**: `.hero-pagina`, `.service-hero` e `.cart-hero` usam a mesma fotografia sob uma camada verde clara. Mockups têm superfícies claras e bordas suaves, como o painel da home.
- **Botões**: `.btn` e `.botao`, fundo escuro, texto branco e formato pill. A ação principal leva a `contato.html#formulario`, preservando `?solucao=` quando houver contexto de produto.
- **Conteúdo**: manter comparativos, tabelas e listas técnicas. Artigos e documentos legais têm coluna de leitura de até 72ch.
- **Cotação**: preservar o formulário de contato, a integração existente, a seleção por URL, a validação, os estados de envio e o POST nativo sem JavaScript.
- **Rodapé**: `.footer` claro e compartilhado, com todas as soluções, navegação institucional e contatos.
- **Raios**: 18–24px em painéis e blocos principais; 10–17px em campos e componentes menores; 50px nos botões.

## Arquivos

- `css/style.css`: base visual adaptada do modelo.
- `css/pages.css`: tokens oficiais, acessibilidade, páginas internas e responsividade.
- `css/layout.css`: geometrias dos conteúdos existentes, isoladas em `@layer layout`, com precedência inferior ao tema.
- `css/tema.css`: efeitos e refinamentos compartilhados; carrega por último.
- `css/inicio.css`: somente a home.
- `js/efeitos.js`: entrada ao rolar, relógio de Florianópolis, navegação de serviço que acompanha a leitura, controle de efeitos no rodapé e voltar ao início.
- `js/site.js`: menu compartilhado (as abas da home não existem mais; o código correspondente ficou inerte).
- `js/leads.js` e `js/analytics.js`: integrações existentes.

## Movimento e acessibilidade

Todo movimento depende da classe `fx` em `<html>`, definida por um script inline no `<head>` quando o visitante não pediu redução de movimento nem pausou os efeitos (localStorage `brasilsul-motion`). Sem `fx` ou sem JavaScript o conteúdo aparece completo. Sem animações infinitas, sem desfoque, sem barra de progresso, sem botões magnéticos. Efeitos permitidos: entrada curta ao rolar, linhas que se desenham, marcações da proposta, transição entre páginas (View Transitions) e tom do céu da capa conforme a hora de Florianópolis. Preservar foco visível; não adicionar dependências de execução nem tornar a leitura dependente de JavaScript.

## Conteúdo e contatos

Português do Brasil. Não inventar clientes, preços, certificações ou garantias. Confiança antes de conversão, explicações técnicas claras e caminho único até a cotação.

Florianópolis–SC · (48) 3282-5678 · WhatsApp (48) 99852-7340 · atendimento@brasilsul.net.br · desde 2001.

Referência canônica: `index.html`. Validar os links e a estrutura com `python scripts/verificar-site.py`.
