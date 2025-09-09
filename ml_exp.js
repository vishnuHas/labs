// Theme toggle
const themeToggleML2 = document.getElementById('themeToggle');
const storedThemeML2 = localStorage.getItem('theme');
if (storedThemeML2 === 'light') document.body.classList.add('theme-light');
themeToggleML2.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleML2.textContent = isLight ? '☀️' : '🌙';
});
themeToggleML2.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const paramsML = new URLSearchParams(location.search);
const mlId = paramsML.get('id');
const { mlExperiments } = window.ML_DATA;
const ml = mlExperiments.find(m => m.id === mlId) || mlExperiments[0];

document.title = `${ml.title} — VTU Lab Mentor`;
document.getElementById('mlTitle').textContent = ml.title;

// Typewriter animation for code, then highlight
const codeBlock = document.getElementById('codeBlock');
function applyHL(){
  if (!codeBlock.querySelector('code')){
    const c=document.createElement('code'); c.className='hljs'; c.textContent=codeBlock.textContent; codeBlock.innerHTML=''; codeBlock.appendChild(c);
  }
  if (window.hljs) window.hljs.highlightElement(codeBlock.querySelector('code'));
}
let code = ml.code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let idx = 0;
function typeNext() {
  if (idx <= code.length) {
    codeBlock.innerHTML = code.slice(0, idx);
    idx += Math.max(1, Math.floor(Math.random() * 3));
    setTimeout(typeNext, 8);
  } else { applyHL(); }
}
typeNext();

// Copy button
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(ml.code);
    copyBtn.textContent = 'Copied!';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1200);
  } catch (e) {
    copyBtn.textContent = 'Copy failed';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1200);
  }
});

// Software list
const mlSoftware = document.getElementById('mlSoftware');
mlSoftware.innerHTML = (ml.software || []).map(s => `
  <article class="card">
    <div class="tool">
      <img src="https://www.svgrepo.com/show/530365/download-minimalistic.svg" alt="download" />
      <div class="tool-info">
        <div class="tool-title">${s.name}</div>
        <div class="tool-desc">${s.description || 'Required to run code'}</div>
      </div>
      <a class="btn" href="${s.url}" target="_blank" rel="noopener">Download</a>
    </div>
  </article>
`).join('');


