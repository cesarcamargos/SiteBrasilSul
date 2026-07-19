# Rastreamento de campanha por e-mail — Manual de operação

Sistema para identificar, por cliente, quem **clicou** no link do e-mail (pode ser robô/scanner), quem **visitou de verdade** a página (executou JavaScript) e quem **engajou** (10 s de leitura ou rolagem). Sem plataforma de e-mail marketing e sem banco de dados: a planilha Google é o armazenamento e o painel.

## Como funciona

1. O e-mail leva um link individual: `https://brasilsul.net.br/r/{token}`.
2. O Netlify encaminha `/r/{token}` para a function `rastrear` (`netlify/functions/rastrear.mjs`), que registra o evento **clique** na planilha (via Apps Script) e redireciona (302, sem cache) para a página de destino com `?t={token}`.
3. Na página, um snippet JS (final de `cartorios.html`) envia **visita** ao carregar e **engajamento** após 10 s ou primeira rolagem. Scanners antispam (ex.: Safe Links do Defender) seguem o link mas não executam JavaScript — geram só "clique", nunca "visita". É assim que o sistema separa robô de humano.
4. O Apps Script (`apps-script/Code.gs`) valida o segredo compartilhado e grava tudo na aba `eventos`. A aba `resumo` cruza com a aba `clientes`.

Nenhum IP é armazenado em etapa alguma.

## Configuração inicial (uma vez)

### 1. Planilha Google

Crie uma planilha (ex.: "Rastreamento Campanhas BrasilSul") com 3 abas:

**`eventos`** — cabeçalho na linha 1: `Data/Hora | Token | Evento | Campanha | User-Agent | Referer` (colunas A–F). O Apps Script grava aqui; não edite manualmente.

**`clientes`** — cabeçalho: `Nome | Empresa | Email | Campanha | Token | Link` (A–F). Preenchida colando o conteúdo de `scripts/clientes-para-planilha.csv` (passo "Por campanha" abaixo).

**`resumo`** — cabeçalho: `Nome | Empresa | Email | Token | Clicou | Visitou de verdade | Engajou | 1ª visita | Total de visitas` (A–I). Fórmulas da linha 2 (planilha em português; arraste para baixo):

| Coluna | Fórmula |
|---|---|
| A2 | `=SE(clientes!A2="";"";clientes!A2)` |
| B2 | `=SE(clientes!B2="";"";clientes!B2)` |
| C2 | `=SE(clientes!C2="";"";clientes!C2)` |
| D2 | `=SE(clientes!E2="";"";clientes!E2)` |
| E2 | `=SE($D2="";"";SE(CONT.SES(eventos!$B:$B;$D2;eventos!$C:$C;"clique")>0;"sim";"—"))` |
| F2 | `=SE($D2="";"";SE(CONT.SES(eventos!$B:$B;$D2;eventos!$C:$C;"visita")>0;"sim";"—"))` |
| G2 | `=SE($D2="";"";SE(CONT.SES(eventos!$B:$B;$D2;eventos!$C:$C;"engajamento")>0;"sim";"—"))` |
| H2 | `=SE($D2="";"";SEERRO(TEXTO(MÍNIMOSES(eventos!$A:$A;eventos!$B:$B;$D2;eventos!$C:$C;"visita");"dd/mm/aaaa hh:mm");"—"))` |
| I2 | `=SE($D2="";"";CONT.SES(eventos!$B:$B;$D2;eventos!$C:$C;"visita"))` |

Lembrete: "Clicou = sim" sozinho pode ser um scanner. Humano de verdade é "Visitou = sim".

### 2. Apps Script

1. Na planilha: **Extensões → Apps Script**. Apague o conteúdo e cole o código de `apps-script/Code.gs`.
2. Gere um segredo forte (ex.: no PowerShell: `-join ((65..90)+(97..122)+(48..57) | Get-Random -Count 32 | % {[char]$_})`).
3. No editor do Apps Script: **Configurações do projeto (engrenagem) → Propriedades do script → Adicionar**: chave `SEGREDO`, valor = o segredo gerado.
4. **Implantar → Nova implantação → Tipo: App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize quando solicitado e copie a **URL do app da Web** (termina em `/exec`).

Se editar o código depois, faça **Implantar → Gerenciar implantações → editar → Nova versão** (só salvar não atualiza a URL publicada).

### 3. Netlify (variáveis de ambiente)

No painel do Netlify: **Site configuration → Environment variables**, escopo Functions (ou todos):

| Variável | Valor |
|---|---|
| `APPS_SCRIPT_URL` | URL `/exec` copiada no passo anterior |
| `RASTREIO_SEGREDO` | o mesmo segredo da propriedade `SEGREDO` |
| `URL_DESTINO` | `https://brasilsul.net.br/cartorios.html` (o domínio primário é o apex, sem www) |
| `URL_HOME` | `https://brasilsul.net.br/` |
| `CAMPANHA` | `cartorios` (opcional; padrão já é cartorios) |

Depois de salvar as variáveis, faça um novo deploy (push no Git) para que a function as receba.

### 4. Teste ponta a ponta

1. `https://brasilsul.net.br/r/TESTE12345` no navegador → deve abrir a página de cartórios; na aba `eventos` aparecem `clique`, `visita` e (após 10 s ou rolagem) `engajamento` com o token `TESTE12345`.
2. `https://brasilsul.net.br/r/x` → deve abrir a home; na aba `eventos` aparece `token_invalido`. O visitante nunca vê erro.

## Por campanha (a cada disparo)

### 1. Gerar tokens e arquivos

1. Copie `scripts/clientes.exemplo.csv` para `scripts/clientes.csv` e preencha Nome, Empresa, Email (até ~50 linhas).
2. Rode: `powershell -ExecutionPolicy Bypass -File scripts\gerar-tokens.ps1 -Campanha cartorios`
3. Saídas: `scripts/mala-direta.xlsx` (mala direta) e `scripts/clientes-para-planilha.csv` → abra e cole o conteúdo (com cabeçalho na primeira vez, sem cabeçalho nas seguintes) na aba `clientes` da planilha Google.

Esses três arquivos contêm dados pessoais e estão no `.gitignore` — não vão para o repositório.

### 2. Mala direta (Word + Outlook clássico desktop)

1. No Word: **Correspondências → Iniciar Mala Direta → Mensagens de E-mail**.
2. **Selecionar Destinatários → Usar uma Lista Existente** → escolha `scripts/mala-direta.xlsx` (planilha `clientes`).
3. Escreva o e-mail usando **Inserir Campo de Mesclagem** (ex.: `«Nome»`, `«Empresa»`).
4. Link rastreado clicável com texto amigável:
   - Pressione **Ctrl+F9** (cria chaves de campo `{ }` — não digite as chaves) e monte:
     `{ HYPERLINK "{ MERGEFIELD Link }" }` (o `MERGEFIELD` interno também via Ctrl+F9 ou Inserir Campo de Mesclagem).
   - Selecione o campo e pressione **F9** para atualizar; **Alt+F9** alterna a exibição dos códigos.
   - Alternativa simples: insira o campo `«Link»` puro no corpo — o Outlook converte a URL em link clicável no envio.
5. Rodapé obrigatório (LGPD): inclua a linha de descadastro, ex.:
   > Você recebeu este e-mail por ser cliente/contato comercial da BrasilSul Tecnologia. Para não receber mais mensagens como esta, responda com "Descadastrar" ou escreva para atendimento@brasilsul.net.br. Os links deste e-mail contêm um identificador para medirmos o acesso; detalhes em https://www.brasilsul.net.br/privacidade.html.
6. **Concluir e Mesclar → Enviar Mensagens de E-mail**: campo "Para" = `Email`, assunto da campanha, formato **HTML** → OK. O Outlook clássico precisa estar aberto e ser o cliente de e-mail padrão; os envios saem pela Caixa de Saída.
7. Dica: teste antes com uma linha só (você mesmo como destinatário) usando "Editar Lista de Destinatários" para filtrar.

### 3. Acompanhar

Abra a aba `resumo` da planilha. Leitura:

- **Clicou = sim, Visitou = —**: provavelmente scanner antispam (Safe Links), ou pessoa que abriu e fechou antes do JS rodar.
- **Visitou = sim**: pessoa real abriu a página.
- **Engajou = sim**: permaneceu 10 s ou rolou a página.

## Campanhas futuras

Sem retrabalho de código:

1. Novo `clientes.csv` → `gerar-tokens.ps1 -Campanha nome-da-nova-campanha`.
2. Cole o novo CSV na aba `clientes` (abaixo dos existentes; o campo Campanha distingue os disparos).
3. Se a página de destino mudar, atualize `URL_DESTINO` e `CAMPANHA` no Netlify (e adicione o snippet JS do fim de `cartorios.html` à nova página) e redeploy.

## Segurança e LGPD — resumo

- Token aleatório criptográfico, sem dado pessoal ou sequência na URL.
- Segredo compartilhado só em variável de ambiente (Netlify) e Propriedade do Script (Google); nada no código.
- Function valida formato do token; token inválido vira `token_invalido` e o visitante é redirecionado à home sem ver erro; falha de registro nunca bloqueia o redirect.
- IP não é armazenado; user-agent e referer são truncados.
- Política de Privacidade (`privacidade.html`) já menciona os links medidos em e-mails; o rodapé do e-mail oferece descadastro.
- Erros só aparecem no log da function (painel Netlify → Logs → Functions).
