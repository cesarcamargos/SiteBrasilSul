# Pendências comerciais e de validação

Itens que o estudo (`docs/BRASILSUL-ESTUDO-E-PLANO-VSCODE.md`) pede para confirmar antes de publicar a alegação. Até a confirmação, a alegação ficou fora do site.

## Removido do site até comprovação
| Item | Onde estava | Ação necessária |
|---|---|---|
| 216 clientes ativos, 1.870 licenças ativas, 25 certificações | index.html, sobre.html | Informar fonte interna, data e definição; só então reexibir |
| "Parceira oficial", "Adobe Gold Partner", "Veeam ProPartner", lista de parcerias | index, sobre, compliance, artigos | Enviar comprovantes vigentes (diretórios dos fabricantes) |
| Logos OpenAI/Anthropic na faixa de fabricantes | index.html | Só reexibir sob "modelos disponíveis na plataforma", sem sugerir parceria direta |
| "Ingram Micro emite a nota fiscal" | IA, artigos, privacidade | Confirmar por produto/oferta; hoje o site diz apenas "nota fiscal brasileira" |
| Controles internos (MFA interno, backup) | compliance.html | Reduzido a "práticas compatíveis com o porte"; confirmar o que existe |

## A confirmar com a equipe
- Prazo "retorno em até 1 dia útil": mantido no site; confirmar se é cumprível.
- Escopo de serviços por oferta (implantação, adoção de Copilot, integração de IA, monitoramento de backup/segurança): as páginas descrevem como "conforme a proposta".
- Razão social, CNPJ e endereço publicável (schema usa só o nome comercial).
- Titularidade e destinatário do formulário Formspree (`mgogowov`) e do FormSubmit; teste real de entrega ainda não feito.
- Analytics/Search Console: `js/analytics.js` está inerte (sem `window.BRASILSUL_ANALYTICS`). Definir ferramenta, consentimento e política.
- Imagem de compartilhamento (`og:image`): ainda não existe; criar arte e acrescentar.

## Revisão jurídica recomendada
- privacidade.html (inclui Formspree, remoção de absolutos sobre IP/token), termos.html, compliance.html e artigo `lgpd-e-ia-protecao-de-dados`.
- Cartórios: faixas de classe e prazos do Provimento 243 **não foram reconferidos** contra o texto oficial (o site do CNJ retornou 403 ao acesso automatizado). Conferir em https://atos.cnj.jus.br/atos/detalhar/6936 e 6734.

## Outras observações
- `DesignSystemsBrasilSul.md` ainda cita `azure-ia.html` (removida e redirecionada); não alterado por instrução do usuário.
- Google Fonts (Fraunces/Inter) continuam carregadas em várias páginas e usadas pelo CSS; removê-las muda a tipografia, então ficou fora desta etapa.
