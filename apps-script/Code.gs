/**
 * BrasilSul - Rastreamento de campanha por e-mail.
 * Cópia de referência: este código deve ser colado no editor do Apps Script
 * da planilha Google (Extensões > Apps Script). Veja docs/RASTREAMENTO.md.
 *
 * Recebe POSTs da Azure Function "rastrear" e grava na aba "eventos", e
 * também POSTs diretos do painel do projeto de cartórios (acao "clientes_bulk")
 * para preencher a aba "clientes" automaticamente. O segredo compartilhado
 * fica em Propriedades do Script (chave SEGREDO), nunca no código.
 *
 * Eventos possíveis: "clique" (redirect do e-mail, pode ser scanner),
 * "visita" (JS executado, humano), "engajamento" (10s ou rolagem),
 * "token_invalido", "cta" (clique em botão com data-cta — coluna G guarda
 * o id do botão), "tempo_pagina" (coluna G guarda os segundos na página) e
 * "rolagem" (coluna G guarda o marco atingido: 25, 50, 75 ou 100).
 * A aba "eventos" precisa de uma coluna G "Detalhe" no cabeçalho.
 *
 * "clientes_bulk": dados.linhas é uma lista de listas, cada uma com 9 valores
 * na ordem Nome, Empresa, Email, Campanha, Token, Link, Telefone, UF,
 * QtdFuncionarios (mesma ordem da aba "clientes", colunas A-I). Acrescenta
 * essas linhas abaixo da última linha já usada, sem apagar nada. Limite de
 * 500 linhas por chamada (proteção simples contra chamada malformada).
 */
function doPost(e) {
  var resposta = ContentService.createTextOutput('ok');
  try {
    var dados = JSON.parse(e.postData.contents);
    var segredo = PropertiesService.getScriptProperties().getProperty('SEGREDO');
    if (!segredo || dados.segredo !== segredo) return resposta; // resposta genérica, sem gravar

    if (dados.acao === 'clientes_bulk') {
      var linhas = dados.linhas;
      if (!Array.isArray(linhas) || linhas.length === 0 || linhas.length > 500) return resposta;
      var lockClientes = LockService.getScriptLock();
      lockClientes.waitLock(5000);
      try {
        var abaClientes = SpreadsheetApp.getActive().getSheetByName('clientes');
        var limpas = linhas.map(function (linha) {
          var origem = Array.isArray(linha) ? linha : [];
          var saida = [];
          for (var i = 0; i < 9; i++) saida.push(String(origem[i] || '').slice(0, 300));
          return saida;
        });
        abaClientes.getRange(abaClientes.getLastRow() + 1, 1, limpas.length, 9).setValues(limpas);
      } finally {
        lockClientes.releaseLock();
      }
      return ContentService.createTextOutput('ok:' + linhas.length);
    }

    var token = String(dados.token || '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 40);
    var evento = String(dados.evento || '').slice(0, 20);
    var permitidos = ['clique', 'visita', 'engajamento', 'token_invalido', 'cta', 'tempo_pagina', 'rolagem'];
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
