// Theme toggle shared
const themeToggle2 = document.getElementById('themeToggle');
const storedTheme2 = localStorage.getItem('theme');
if (storedTheme2 === 'light') document.body.classList.add('theme-light');
themeToggle2.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle2.textContent = isLight ? '☀️' : '🌙';
});
themeToggle2.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const { devopsExperiments } = window.VTU_DATA;

function pickThumb(title){
  const t = title.toLowerCase();
  if (t.includes('maven')) return 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop';
  if (t.includes('gradle')) return 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop';
  if (t.includes('docker')) return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop';
  if (t.includes('kubernetes')) return 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop';
  return 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop';
}

function pickIcon(title){
  const t = title.toLowerCase();
  if (t.includes('maven')) return 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Maven_logo.svg';
  if (t.includes('gradle')) return 'https://gradle.com/wp-content/uploads/2020/06/gradle-elephant-icon.svg';
  if (t.includes('jenkins')) return 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Jenkins_logo.svg';
  if (t.includes('docker')) return 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png';
  if (t.includes('kubernetes')) return 'https://kubernetes.io/images/favicon.png';
  return 'https://upload.wikimedia.org/wikipedia/commons/0/05/Devops-toolchain.svg';
}

// Render experiments grid
const expGrid = document.getElementById('expGrid');
expGrid.innerHTML = devopsExperiments.map((d, i) => {
  const coming = i > 3 && (!d.manual || !d.video);
  const thumb = d.thumbnail || pickThumb(d.title);
  const icon = pickIcon(d.title);
  const subtitle = coming ? `${d.title} — Coming Soon` : d.title;
  const kn = coming ? ' (ಶೀಘ್ರದಲ್ಲೇ)' : '';
  return `
  <article class="card exp-card" data-idx="${i}">
    <a class="thumb" ${coming ? '' : `href="experiment.html?id=${encodeURIComponent(d.id)}"`} aria-label="Open ${d.title}">
      <img src="${thumb}" alt="${d.title}">
      <div class="play">▶</div>
    </a>
    <div class="card-body">
      <div class="media-title"><img class="exp-icon" src="${icon}" alt="icon"> ${subtitle}<span class="kn">${kn}</span></div>
      <div class="media-desc">${d.description}</div>
      <div class="exp-meta">
        <span class="badge">${d.tools.length} tools</span>
      </div>
      ${coming ? `<button class="btn" disabled>Coming Soon</button>` : `<a class="btn" href="experiment.html?id=${encodeURIComponent(d.id)}">Open</a>`}
    </div>
  </article>
  `;
}).join('');

// GSAP animations
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    const tl = gsap.timeline({defaults:{ease:'power3.out'}});
    tl.from('.section-head h2', {y:20, opacity:0, duration:.4})
      .from('.section-head .muted', {y:10, opacity:0, duration:.3}, '-=.2')
      .from('.exp-card', {opacity:0, y:28, duration:.6, stagger:.06}, '-=.1');
  }
});

// Chat widget (dummy)
const chatFab = document.getElementById('chatFab');
const chatClose = document.getElementById('chatClose');
const chatPanel = document.querySelector('.chat-panel');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatText = document.getElementById('chatText');

function openChatPanel() { chatPanel.classList.add('open'); chatPanel.setAttribute('aria-hidden', 'false'); setTimeout(()=>chatText.focus(),50); }
function closeChatPanel() { chatPanel.classList.remove('open'); chatPanel.setAttribute('aria-hidden', 'true'); }
chatFab.addEventListener('click', openChatPanel);
chatClose.addEventListener('click', closeChatPanel);
function addBubble(text, who='bot'){ const d=document.createElement('div'); d.className=`bubble ${who}`; d.textContent=text; chatBody.appendChild(d); chatBody.scrollTop=chatBody.scrollHeight; }
addBubble('ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಸಹಾಯಕ. ಪ್ರಯೋಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.');
chatForm.addEventListener('submit', (e)=>{ e.preventDefault(); const msg=chatText.value.trim(); if(!msg) return; addBubble(msg,'user'); chatText.value=''; setTimeout(()=> addBubble('ಶೀಘ್ರದಲ್ಲೇ ನಿಖರ ಉತ್ತರಗಳನ್ನು ಒದಗಿಸುತ್ತೇನೆ. ಈಗ ಕಲಿಕೆಯನ್ನು ಮುಂದುವರಿಸಿ!'), 400); });


