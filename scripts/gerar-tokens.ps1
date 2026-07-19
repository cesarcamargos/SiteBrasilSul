# Gera tokens individuais e os arquivos da campanha:
#   - mala-direta.xlsx           -> fonte de dados da mala direta do Word (requer Excel instalado)
#   - clientes-para-planilha.csv -> para colar na aba "clientes" da planilha Google
# Entrada: clientes.csv (colunas Nome,Empresa,Email) - use clientes.exemplo.csv como modelo.
# Uso: powershell -ExecutionPolicy Bypass -File .\gerar-tokens.ps1 [-Campanha cartorios]

param(
  [string]$Entrada = (Join-Path $PSScriptRoot 'clientes.csv'),
  [string]$Campanha = 'cartorios',
  [string]$BaseUrl = 'https://brasilsul.net.br/r/'
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $Entrada)) {
  Write-Error "Arquivo de entrada nao encontrado: $Entrada. Copie clientes.exemplo.csv para clientes.csv e preencha."
}

$clientes = @(Import-Csv -Path $Entrada -Encoding UTF8)
if ($clientes.Count -eq 0) { Write-Error 'clientes.csv esta vazio.' }

# Token aleatorio e imprevisivel (criptografico), sem caracteres ambiguos (0/O, 1/l/I)
$alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'.ToCharArray()
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$usados = New-Object 'System.Collections.Generic.HashSet[string]'

function Novo-Token {
  do {
    $bytes = New-Object byte[] 10
    $rng.GetBytes($bytes)
    $token = -join ($bytes | ForEach-Object { $alfabeto[$_ % $alfabeto.Count] })
  } until ($usados.Add($token))
  return $token
}

$linhas = foreach ($c in $clientes) {
  $token = Novo-Token
  [PSCustomObject]@{
    Nome     = $c.Nome
    Empresa  = $c.Empresa
    Email    = $c.Email
    Campanha = $Campanha
    Token    = $token
    Link     = $BaseUrl + $token
  }
}

$csvSaida = Join-Path $PSScriptRoot 'clientes-para-planilha.csv'
$linhas | Export-Csv -Path $csvSaida -NoTypeInformation -Encoding UTF8
Write-Host "Gerado: $csvSaida (colar na aba 'clientes' da planilha Google)"

$xlsxSaida = Join-Path $PSScriptRoot 'mala-direta.xlsx'
try {
  $excel = New-Object -ComObject Excel.Application
  $excel.Visible = $false
  $excel.DisplayAlerts = $false
  $wb = $excel.Workbooks.Add()
  $ws = $wb.Worksheets.Item(1)
  $ws.Name = 'clientes'
  $colunas = @('Nome', 'Empresa', 'Email', 'Campanha', 'Token', 'Link')
  for ($j = 0; $j -lt $colunas.Count; $j++) { $ws.Cells.Item(1, $j + 1) = $colunas[$j] }
  for ($i = 0; $i -lt $linhas.Count; $i++) {
    for ($j = 0; $j -lt $colunas.Count; $j++) {
      $ws.Cells.Item($i + 2, $j + 1) = [string]$linhas[$i].($colunas[$j])
    }
  }
  $wb.SaveAs($xlsxSaida, 51)  # 51 = xlOpenXMLWorkbook (.xlsx)
  $wb.Close($false)
  $excel.Quit()
  [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel)
  Write-Host "Gerado: $xlsxSaida (fonte de dados da mala direta do Word)"
} catch {
  Write-Warning "Nao foi possivel gerar o .xlsx via Excel ($($_.Exception.Message)). Use o CSV $csvSaida como fonte da mala direta."
}
