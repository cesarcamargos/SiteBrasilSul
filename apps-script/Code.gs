/**
 * BrasilSul - Rastreamento de campanha por e-mail.
 * Cópia de referência: este código deve ser colado no editor do Apps Script
 * da planilha Google (Extensões > Apps Script). Veja docs/RASTREAMENTO.md.
 *
 * Recebe POSTs da Netlify Function "rastrear" e grava na aba "eventos".
 * O segredo compartilhado fica em Propriedades do Script (chave SEGREDO),
 * nunca no código.
 *
 * Eventos possíveis: "clique" (redirect do e-mail, pode ser scanner),
 * "visita" (JS executado, humano), "engajamento" (10s ou rolagem),
 * "token_invalido", "cta" (clique em botão com data-cta — coluna G guarda
 * o id do botão) e "tempo_pagina" (coluna G guarda os segundos na página).
 * A aba "eventos" precisa de uma coluna G "Detalhe" no cabeçalho.
 */
function doPost(e) {
  var resposta = ContentService.createTextOutput('ok');
  try {
    var dados = JSON.parse(e.postData.contents);
    var segredo = PropertiesService.getScriptProperties().getProperty('SEGREDO');
    if (!segredo || dados.segredo !== segredo) return resposta; // resposta genérica, sem gravar

    var token = String(dados.token || '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 40);
    var evento = String(dados.evento || '').slice(0, 20);
    var permitidos = ['clique', 'visita', 'engajamento', 'token_invalido', 'cta', 'tempo_pagina'];
    if (permitidos.indexOf(evento) === -1) return resposta;

    var lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      var aba = SpreadsheetApp.getActive().getSheetByName('eventos');
      aba.appendRow([
        new Date(),
        token,
        evento,
        String(dados.campanha || '').slice(0, 50),
        String(dados.userAgent || '').slice(0, 300),
        String(dados.referer || '').slice(0, 300),
        String(dados.detalhe || '').slice(0, 200)
      ]);
    } finally {
      lock.releaseLock();
    }
  } catch (erro) {
    // nunca expor erro ao chamador
  }
  return resposta;
}
