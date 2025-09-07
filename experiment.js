// Theme toggle
const themeToggle3 = document.getElementById('themeToggle');
const storedTheme3 = localStorage.getItem('theme');
if (storedTheme3 === 'light') document.body.classList.add('theme-light');
themeToggle3.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle3.textContent = isLight ? '☀️' : '🌙';
});
themeToggle3.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const params = new URLSearchParams(location.search);
const expId = params.get('id');
const { devopsExperiments } = window.VTU_DATA;
const exp = devopsExperiments.find(e => e.id === expId) || devopsExperiments[0];

document.title = `${exp.title} — VTU Lab Mentor`;
function pickIcon(title){
  const t = title.toLowerCase();
  if (t.includes('maven')) return 'https://maven.apache.org/images/maven-logo-black-on-white.png';
  if (t.includes('gradle')) return 'https://gradle.com/wp-content/uploads/2020/06/gradle-elephant-icon.svg';
  if (t.includes('jenkins')) return 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Jenkins_logo.svg';
  if (t.includes('docker')) return 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png';
  if (t.includes('kubernetes')) return 'https://kubernetes.io/images/favicon.png';
  return '';
}
const titleIcon = pickIcon(exp.title);
document.getElementById('expTitle').innerHTML = titleIcon ? `<img src="${titleIcon}" alt="icon" style="height:20px;vertical-align:-4px;margin-right:6px;"> ${exp.title}` : exp.title;
document.getElementById('expSubtitle').textContent = exp.subtitle || 'Watch, learn, and practice';
const knHelp = 'ಕನ್ನಡ: ಹಂತ ಹಂತವಾಗಿ ಮಾಡಿ, ದೋಷ ಬಂದರೆ ಮರುಪ್ರಯತ್ನಿಸಿ.';
document.getElementById('expDescription').innerHTML = `${exp.description || ''} <span class="kn">— ${knHelp}</span>`;

const player = document.getElementById('player');
if (typeof exp.video === 'string' && exp.video.endsWith('.mp4')) {
  player.innerHTML = `<video src="${exp.video}" controls playsinline style="width:100%;height:100%;"></video>`;
} else {
  player.innerHTML = `<iframe src="https://www.youtube.com/embed/${exp.video}?autoplay=0" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}

const toolsList = document.getElementById('toolsList');
exp.tools.forEach(t => {
  const li = document.createElement('li');
  li.textContent = t;
  toolsList.appendChild(li);
});

document.getElementById('manualText').textContent = exp.manual;

// Software downloads
const softwareGrid = document.getElementById('softwareGrid');
if (softwareGrid && Array.isArray(exp.software)) {
  softwareGrid.innerHTML = exp.software.map(s => `
    <article class="card">
      <div class="tool">
        <img src="https://www.svgrepo.com/show/530365/download-minimalistic.svg" alt="download" />
        <div class="tool-info">
          <div class="tool-title">${s.name}</div>
          <div class="tool-desc">${s.description || 'Required for this experiment'}</div>
        </div>
        <a class="btn" href="${s.url}" target="_blank" rel="noopener">Download</a>
      </div>
    </article>
  `).join('');
}

// GSAP intro
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.from('.card', { opacity: 0, y: 18, duration: .6, stagger: .08, ease: 'power2.out' });
  }
});

// Chat widget
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
addBubble('ಈ ಪ್ರಯೋಗದ ಕುರಿತು ಪ್ರಶ್ನಿಸಿ. ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ!');
chatForm.addEventListener('submit', (e)=>{ e.preventDefault(); const msg=chatText.value.trim(); if(!msg) return; addBubble(msg,'user'); chatText.value=''; setTimeout(()=> addBubble('ಇದು ಡೆಮೋ ಪ್ರತಿಕ್ರಿಯೆ. ಶೀಘ್ರದಲ್ಲೇ API ಸಂಪರ್ಕಿಸಲಾಗುತ್ತದೆ.'), 400); });


