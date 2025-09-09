// Theme toggle
const themeToggleWT2 = document.getElementById('themeToggle');
const storedThemeWT2 = localStorage.getItem('theme');
if (storedThemeWT2 === 'light') document.body.classList.add('theme-light');
themeToggleWT2.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleWT2.textContent = isLight ? '☀️' : '🌙';
});
themeToggleWT2.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const paramsWT = new URLSearchParams(location.search);
const wtId = paramsWT.get('id');
const { wtPrograms } = window.WT_DATA;
const wt = wtPrograms.find(p => p.id === wtId) || wtPrograms[0];

document.title = `${wt.title} — VTU Lab Mentor`;
document.getElementById('wtTitle').textContent = wt.title;

// Code typing then highlight
const codeBlockWT = document.getElementById('codeBlock');
function applyHLWT(){
  if (!codeBlockWT.querySelector('code')){ const c=document.createElement('code'); c.className='hljs'; c.textContent=codeBlockWT.textContent; codeBlockWT.innerHTML=''; codeBlockWT.appendChild(c); }
  if (window.hljs) window.hljs.highlightElement(codeBlockWT.querySelector('code'));
}
let codeWT = wt.code.replace(/(&)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let iWT = 0;
function typeWT(){
  if (iWT <= codeWT.length) {
    codeBlockWT.innerHTML = codeWT.slice(0, iWT);
    iWT += Math.max(1, Math.floor(Math.random()*3));
    setTimeout(typeWT, 7);
  } else { applyHLWT(); }
}
typeWT();

// Copy button
const copyBtnWT = document.getElementById('copyBtn');
copyBtnWT.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(wt.code); copyBtnWT.textContent='Copied!'; setTimeout(()=>copyBtnWT.textContent='Copy', 1200);} catch(e){ copyBtnWT.textContent='Copy failed'; setTimeout(()=>copyBtnWT.textContent='Copy', 1200);} 
});


