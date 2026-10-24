// Gera os banners da Imobiliária Cruz Alta (728x90, 320x100 e 300x250) com o Chrome headless.
// Edite DADOS e rode:  node anuncios/fazer-banners.mjs
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const DADOS = {
  nome: 'Imobiliária Cruz Alta',
  slogan: 'Garantia de um bom negócio!',
  frase: 'Compra - venda - aluga e administra<br>imóveis urbanos e rurais',
  fraseCurta: 'Compra · venda · aluga · administra',
  whatsapp: '(55) 98428-4701',
  site: 'imobiliariacruzalta.com.br',
  creci: 'CRECI/RS 25548J',
  logo: 'C:/Projetos/eleicoesonline/anuncios/simbolo-transp.png',
};
const DIR = 'C:/Projetos/eleicoesonline/anuncios';
const logo = DADOS.logo && fs.existsSync(DADOS.logo) ? `data:image/png;base64,${fs.readFileSync(DADOS.logo).toString('base64')}` : '';
const base = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@500;700;800&display=swap');
*{box-sizing:border-box;margin:0}body{font-family:Inter,"Segoe UI",sans-serif;background:#4a4a4b;color:#fff;overflow:hidden}
.b{position:relative;width:100%;height:100vh;display:flex;align-items:center;gap:14px;padding:0 16px;background:radial-gradient(120% 140% at 0% 0%,#575758 0%,#454546 60%,#3e3e3f 100%);overflow:hidden}
.b>*{position:relative}.marca{position:absolute!important;right:-6px;bottom:-14px;font:italic 800 64px/1 Inter,sans-serif;color:#fff;opacity:.05;letter-spacing:-.02em;pointer-events:none}
.logo{flex:none;object-fit:contain}.n{font-family:Oswald,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.01em;line-height:1}
.s{font-family:Oswald,sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.03em;display:flex;justify-content:space-between;align-items:baseline;gap:8px;border-top:1.5px solid rgba(255,255,255,.85);padding-top:3px;margin-top:4px}
.f{font-weight:800;text-transform:uppercase;letter-spacing:.02em;line-height:1.3}
.c{flex:none;background:linear-gradient(#2bd96b,#1db954);border:2px solid #0f8a3a;color:#fff;font-weight:800;border-radius:999px;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 2px 6px rgba(0,0,0,.3)}
.c svg{fill:#fff}.cr{font-family:Inter,sans-serif;font-weight:500;letter-spacing:0;opacity:.6}`;
const zap = `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>`;
const casa = h => logo ? `<img class="logo" src="${logo}" style="height:${h}px">` : '';
const peca = {
  '728x90': `<div class="b" style="gap:12px;padding:0 18px">${casa(66)}<div><div class="n" style="font-size:30px;white-space:nowrap">${DADOS.nome}</div><div class="s" style="font-size:13px"><span class="cr" style="font-size:9px">${DADOS.creci}</span><span>${DADOS.slogan}</span></div></div><div style="margin-left:auto;display:flex;flex-direction:column;align-items:center;gap:5px"><div class="c" style="font-size:18px;padding:4px 22px;width:300px">${zap.replace('<svg', '<svg style="width:22px;height:22px"')}${DADOS.whatsapp}</div><div class="f" style="font-size:10.5px;text-align:center">${DADOS.frase}</div></div><div class="marca">imóveis</div></div>`,
  '320x100': `<div class="b" style="gap:10px;padding:0 10px">${casa(62)}<div style="flex:1"><div class="n" style="font-size:20px;white-space:nowrap">${DADOS.nome}</div><div class="s" style="font-size:9.5px;margin-bottom:6px"><span class="cr" style="font-size:7px">${DADOS.creci}</span><span>${DADOS.slogan}</span></div><div class="c" style="font-size:13px;padding:3px 10px">${zap.replace('<svg', '<svg style="width:15px;height:15px"')}${DADOS.whatsapp}</div><div class="f" style="font-size:7.5px;text-align:center;margin-top:3px">${DADOS.fraseCurta}</div></div><div class="marca" style="font-size:48px">imóveis</div></div>`,
  '300x250': `<div class="b" style="flex-direction:column;justify-content:center;gap:0;padding:14px 14px 10px"><div style="display:flex;align-items:center;gap:9px;width:100%">${casa(56)}<div style="flex:1"><div class="n" style="font-size:21px;white-space:nowrap">${DADOS.nome}</div><div class="s" style="font-size:10.5px;justify-content:flex-end">${DADOS.slogan}</div></div></div><div class="f" style="font-size:12px;text-align:center;margin:16px 0 12px">${DADOS.frase}</div><div class="c" style="font-size:21px;padding:6px 0;width:100%">${zap.replace('<svg', '<svg style="width:26px;height:26px"')}${DADOS.whatsapp}</div><div style="font-size:15px;font-weight:800;margin-top:10px">www.${DADOS.site}</div><div style="font-size:9px;opacity:.6;margin-top:3px">${DADOS.creci}</div><div class="marca">imóveis</div></div>`,
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
