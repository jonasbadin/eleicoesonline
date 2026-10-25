// Gera os banners da Imobiliária Cruz Alta (728x90, 320x100 e 300x250) com o Chrome headless.
// Edite DADOS e rode:  node anuncios/fazer-banners.mjs
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const DADOS = {
  nome: 'Imobiliária Cruz Alta',
  slogan: 'Garantia de um bom negócio!',
  frase: 'Casas, apartamentos e terrenos para comprar ou alugar',
  whatsapp: '(55) 98428-4701',
  site: 'imobiliariacruzalta.com.br',
  creci: 'CRECI/RS 25548J',
  logo: 'C:/Projetos/eleicoesonline/anuncios/simbolo.png',
};
const DIR = 'C:/Projetos/eleicoesonline/anuncios';
const logo = DADOS.logo && fs.existsSync(DADOS.logo) ? `data:image/png;base64,${fs.readFileSync(DADOS.logo).toString('base64')}` : '';
const base = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@500;700&display=swap');
*{box-sizing:border-box;margin:0}body{font-family:Inter,"Segoe UI",sans-serif;background:#454545;color:#fff;overflow:hidden}
.b{position:relative;width:100%;height:100vh;display:flex;align-items:center;gap:14px;padding:0 16px;background:#474748}
.logo{flex:none;object-fit:contain}.n{font-family:Oswald,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.01em;line-height:1}
.s{font-family:Oswald,sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.03em;opacity:.9}.f{opacity:.85;font-weight:500}
.c{margin-left:auto;flex:none;background:#25D366;color:#fff;font-weight:700;border-radius:999px;padding:9px 16px;white-space:nowrap;display:flex;align-items:center;gap:7px}
.c svg{width:18px;height:18px;fill:#fff}.cr{position:absolute;right:9px;bottom:3px;font-size:9px;opacity:.7}`;
const zap = `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>`;
const casa = h => logo ? `<img class="logo" src="${logo}" style="height:${h}px">` : '';
const peca = {
  '728x90': `<div class="b">${casa(66)}<div><div class="n" style="font-size:25px;white-space:nowrap">${DADOS.nome}</div><div class="s" style="font-size:13.5px;margin-top:3px">${DADOS.slogan}</div></div><div class="f" style="font-size:12.5px;max-width:170px;margin-left:6px">${DADOS.frase}</div><div class="c" style="font-size:15px">${zap}${DADOS.whatsapp}</div><div class="cr">${DADOS.creci}</div></div>`,
  '320x100': `<div class="b" style="gap:10px;padding:0 10px">${casa(64)}<div><div class="n" style="font-size:21px">${DADOS.nome}</div><div class="s" style="font-size:10.5px;margin:2px 0 6px">${DADOS.slogan}</div><div class="c" style="margin:0;font-size:12.5px;padding:5px 10px;display:inline-flex">${zap.replace('<svg', '<svg style="width:14px;height:14px"')}${DADOS.whatsapp}</div></div><div class="cr">${DADOS.creci}</div></div>`,
  '300x250': `<div class="b" style="flex-direction:column;justify-content:center;text-align:center;gap:5px;padding:12px 14px">${casa(56)}<div class="n" style="font-size:25px;margin-top:2px">${DADOS.nome}</div><div class="s" style="font-size:13px">${DADOS.slogan}</div><div class="f" style="font-size:12px">${DADOS.frase}</div><div class="c" style="margin:6px auto 0;font-size:15px">${zap}${DADOS.whatsapp}</div><div style="font-size:11px;opacity:.75">${DADOS.site} · ${DADOS.creci}</div></div>`,
};
const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=9338', '--remote-allow-origins=*', '--user-data-dir=C:/eleicao-pdf/video/perfil-ban', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const w = ms => new Promise(r => setTimeout(r, ms)); let a;
for (let i = 0; i < 60 && !a; i++) { try { a = await (await fetch('http://127.0.0.1:9338/json/new?about:blank', { method: 'PUT' })).json(); } catch { await w(250); } }
const ws = new WebSocket(a.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const p = new Map(); ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && p.has(m.id)) { p.get(m.id)(m); p.delete(m.id); } };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; p.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
for (const [tam, html] of Object.entries(peca)) {
  const [W, H] = tam.split('x').map(Number);
  await cmd('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: false });
  await cmd('Page.navigate', { url: 'data:text/html;charset=utf-8,' + encodeURIComponent(`<!doctype html><meta charset=utf-8><style>${base}</style>${html}`) });
  await w(1800);
  const r = await cmd('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(`${DIR}/imobiliaria-${tam}.png`, Buffer.from(r.result.data, 'base64'));
  console.log('ok', tam);
}
ws.close(); ch.kill(); process.exit(0);
