// Steam Brabo - recebe e entrega avaliações do site
// Todas as avaliações aparecem no site na hora.
// Pra esconder uma, escreva "não" na coluna E (Aprovado).
const CABECALHO = ['Data', 'Nome', 'Estrelas', 'Comentário', 'Aprovado', 'Foto'];

function aba_() {
  const sh = SpreadsheetApp.getActive().getSheets()[0];
  if (sh.getRange(1, 6).getValue() !== 'Foto') {
    sh.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function resposta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Evita que um texto começando com = + - @ vire fórmula na planilha
function limpo_(t, max) {
  t = String(t || '').replace(/\s+/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(t) ? "'" + t : t;
}

// GET: devolve todas as avaliações, menos as marcadas com "não" (mais novas primeiro)
function doGet() {
  const linhas = aba_().getDataRange().getValues().slice(1);
  const aprovadas = linhas
    .filter(function (r) { const marca = String(r[4]).trim().toLowerCase(); return r[1] && r[3] && marca !== 'não' && marca !== 'nao'; })
    .map(function (r) { return { nome: String(r[1]).replace(/^'/, ''), estrelas: Number(r[2]), texto: String(r[3]).replace(/^'/, ''), foto: String(r[5] || '') }; })
    .reverse();
  return resposta_(aprovadas);
}

// POST: salva uma avaliação nova (já aparece no site)
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.site) return resposta_({ ok: true }); // campo escondido: se veio preenchido, é robô
  const nome = limpo_(p.nome, 40);
  const texto = limpo_(p.texto, 500);
  const estrelas = parseInt(p.estrelas, 10);
  // Foto opcional: só aceita imagem JPEG pequena que o próprio site gera
  const foto = /^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(p.foto || '') && p.foto.length < 45000 ? p.foto : '';
  if (!nome || !texto || !(estrelas >= 1 && estrelas <= 5)) return resposta_({ ok: false });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { aba_().appendRow([new Date(), nome, estrelas, texto, '', foto]); } finally { lock.releaseLock(); }
  return resposta_({ ok: true });
}
