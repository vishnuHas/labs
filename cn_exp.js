// Theme toggle
const themeToggleCN2 = document.getElementById('themeToggle');
const storedThemeCN2 = localStorage.getItem('theme');
if (storedThemeCN2 === 'light') document.body.classList.add('theme-light');
themeToggleCN2.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleCN2.textContent = isLight ? '☀️' : '🌙';
});
themeToggleCN2.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const paramsCN = new URLSearchParams(location.search);
const cnId = paramsCN.get('id');
const { cnPrograms } = window.CN_DATA;
const prog = cnPrograms.find(p => p.id === cnId) || cnPrograms[0];

document.title = `${prog.title} — VTU Lab Mentor`;
document.getElementById('cnTitle').textContent = prog.title;

const fileTabs = document.getElementById('fileTabs');
const codeBlock = document.getElementById('codeBlock');
let typingToken = 0;
const copyBtn = document.getElementById('copyBtn');

const files = Object.keys(prog.files);

function fileLabel(name){
  const n = name.toLowerCase();
  if (n.includes('server')) return 'Server';
  if (n.includes('client')) return 'Client';
  return name;
}
let currentFile = files[0];

function highlightC(src){
  let s = src.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  s = s.replace(/\/(\/|\*)([\s\S]*?)(\*\/)?$/gm, (m)=>`<span class="cm">${m}</span>`);
  s = s.replace(/\b(int|long|char|float|double|void|return|if|else|for|while|do|switch|case|break|continue|struct|typedef|define|include|printf|scanf)\b/g,'<span class="kw">$1</span>');
  s = s.replace(/"([\s\S]*?)"/g,'<span class="str">"$1"</span>');
  s = s.replace(/\b(\d+)\b/g,'<span class="num">$1</span>');
  return s;
}

function typeCode(html){
  const myToken = ++typingToken;
  codeBlock.innerHTML = '';
  let i = 0;
  function step(){
    if (myToken !== typingToken) return; // cancelled by a newer render
    if (i <= html.length) {
      codeBlock.innerHTML = html.slice(0, i);
      i += Math.max(1, Math.floor(Math.random() * 3));
      setTimeout(step, 6);
    }
  }
  step();
}

function loadFile(name){
  currentFile = name;
  const raw = prog.files[name];
  const html = highlightC(raw);
  typeCode(html);
}

fileTabs.innerHTML = files.map(f=>`<button class="chip" data-file="${f}" aria-selected="false">${fileLabel(f)}</button>`).join('');

function setActiveTab(name){
  [...fileTabs.querySelectorAll('[data-file]')].forEach(btn=>{
    const isActive = btn.getAttribute('data-file') === name;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

fileTabs.addEventListener('click', (e)=>{ const b=e.target.closest('[data-file]'); if(!b) return; const name=b.getAttribute('data-file'); setActiveTab(name); loadFile(name); });
loadFile(currentFile);
setActiveTab(currentFile);

copyBtn.addEventListener('click', async ()=>{ try{ await navigator.clipboard.writeText(prog.files[currentFile]); copyBtn.textContent='Copied!'; setTimeout(()=>copyBtn.textContent='Copy',1200);}catch(e){ copyBtn.textContent='Copy failed'; setTimeout(()=>copyBtn.textContent='Copy',1200);} });


