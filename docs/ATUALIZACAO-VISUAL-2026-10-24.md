# Atualização visual — 24/10/2026

As 30 páginas seguem o modelo `BrasilSul-site/dist` fornecido pelo usuário. A home incorpora a fotografia, o painel de soluções, as ilustrações, a composição e os movimentos da referência. As 29 páginas internas usam a mesma navegação, rodapé, cores, superfícies e botões, preservando integralmente o conteúdo principal e os endereços existentes.

Segoe UI continua sendo a fonte institucional, sem carregamento de fontes externas. A imagem do horizonte foi convertida de PNG para WebP: de 2.747.900 para 303.346 bytes. As integrações de contato e diagnóstico foram preservadas. A ação principal de cotação continua levando ao formulário existente, com seleção por `?solucao=` nas páginas de produto.

## Validação

- `python scripts/verificar-site.py`: 30 páginas; links locais, âncoras, arquivos, metadados, JSON-LD e POST nativo do formulário.
- Playwright com Google Chrome: todas as páginas em 320, 390, 768 e 1440px, sem transbordamento horizontal, imagens quebradas ou erros de JavaScript.
- Inspeção visual de home, produto, artigo, contato, cartórios e página institucional em desktop e celular.
- Cabeçalho verificado adicionalmente entre 1051 e 1440px, sem sobreposição entre logo, navegação e ações.
- Abas da home por clique, setas, Home e End; menu móvel e Escape; preferência de animação e sua persistência; `prefers-reduced-motion`.
- Navegação e formulário acessíveis sem JavaScript.
- Formulário: validação, pré-seleção por URL, falha com preservação dos dados, nova tentativa e sucesso. Respostas do provedor simuladas; nenhum lead real enviado.
- Comparação com a versão anterior: conteúdo de `<main>` preservado nas 29 páginas internas, com alteração apenas da classe visual das telas de confirmação e erro.
- `node --check js/site.js`, `node --check js/motion.js` e `git diff --check`.

Os testes não comprovam a entrega real de e-mails pelo provedor. O contrato de envio existente foi mantido. O branch deve ser revisado antes de integrar ao `main`; publicar o branch não altera o site de produção.
