// Theme toggle
const themeToggleDSA2 = document.getElementById('themeToggle');
const storedThemeDSA2 = localStorage.getItem('theme');
if (storedThemeDSA2 === 'light') document.body.classList.add('theme-light');
themeToggleDSA2.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleDSA2.textContent = isLight ? '☀️' : '🌙';
});
themeToggleDSA2.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const paramsDSA = new URLSearchParams(location.search);
const dsaId = paramsDSA.get('id');
const { dsaPrograms } = window.DSA_DATA;
const prog = dsaPrograms.find(p => p.id === dsaId) || dsaPrograms[0];

document.title = `${prog.title} — VTU Lab Mentor`;
document.getElementById('dsaTitle').textContent = prog.title;
document.getElementById('dsaSubtitle').textContent = prog.description;
document.getElementById('programDescription').textContent = prog.description;

const codeBlock = document.getElementById('codeBlock');
function applyHLDSA(){
  if (!codeBlock.querySelector('code')){ const c=document.createElement('code'); c.className='hljs'; c.textContent=codeBlock.textContent; codeBlock.innerHTML=''; codeBlock.appendChild(c); }
  if (window.hljs) window.hljs.highlightElement(codeBlock.querySelector('code'));
}
let typingToken = 0;
const copyBtn = document.getElementById('copyBtn');
// Removed runBtn reference

function highlightC(src) {
  // Just escape HTML characters, no colors or highlighting
  return src.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function typeCode(html) {
  const myToken = ++typingToken;
  codeBlock.innerHTML = '';
  let i = 0;
  
  function step() {
    if (myToken !== typingToken) return; // cancelled by a newer render
    if (i <= html.length) {
      codeBlock.innerHTML = html.slice(0, i);
      i += Math.max(1, Math.floor(Math.random() * 4));
      setTimeout(step, 8);
    } else { applyHLDSA(); }
  }
  step();
}

function loadCode() {
  const raw = prog.code;
  const html = highlightC(raw);
  typeCode(html);
}

// Load the code
loadCode();

// Copy functionality
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(prog.code);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy Code', 1200);
  } catch (e) {
    copyBtn.textContent = 'Copy failed';
    setTimeout(() => copyBtn.textContent = 'Copy Code', 1200);
  }
});

// Removed run button functionality

// GSAP animations
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.from('.card', { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      stagger: 0.1, 
      ease: 'power2.out' 
    });
  }
});
