// Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light') document.body.classList.add('theme-light');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
});
themeToggle.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Load accurate Karnataka SVG and inject
fetch('karnataka.svg').then(r=>r.text()).then(svg=>{
  const holder = document.getElementById('heroMap');
  if (holder) holder.innerHTML = svg;
}).catch(()=>{});

// Data
const videos = [
  { id: 'vid1', title: 'Intro to Lab Safety', desc: 'Rules and best practices', thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', youtubeId: 'dQw4w9WgXcQ' },
  { id: 'vid2', title: 'Basic Git Workflow', desc: 'Clone, commit, push', thumb: 'https://img.youtube.com/vi/USjZcfj8yxE/hqdefault.jpg', youtubeId: 'USjZcfj8yxE' },
  { id: 'vid3', title: 'Docker 101', desc: 'Images and containers', thumb: 'https://img.youtube.com/vi/Gjnup-PuquQ/hqdefault.jpg', youtubeId: 'Gjnup-PuquQ' },
  { id: 'vid4', title: 'Kubernetes Basics', desc: 'Pods, services, deployments', thumb: 'https://img.youtube.com/vi/X48VuDVv0do/hqdefault.jpg', youtubeId: 'X48VuDVv0do' },
  { id: 'vid5', title: 'CI/CD Overview', desc: 'Automated pipelines', thumb: 'https://img.youtube.com/vi/SCZuk2K3Qx0/hqdefault.jpg', youtubeId: 'SCZuk2K3Qx0' },
  { id: 'vid6', title: 'Linux Essentials', desc: 'Commands and navigation', thumb: 'https://img.youtube.com/vi/ROjZy1WbCIA/hqdefault.jpg', youtubeId: 'ROjZy1WbCIA' },
];

const manuals = [
  { id: 'm1', title: 'Experiment 1: Git Basics', text: 'Objectives: Initialize, commit, push. Procedure: ...', pdf: '#' },
  { id: 'm2', title: 'Experiment 2: Branching and Merging', text: 'Objectives: Branching strategies. Procedure: ...', pdf: '#' },
  { id: 'm3', title: 'Experiment 3: Docker Image Build', text: 'Objectives: Build and run. Procedure: ...', pdf: '#' },
  { id: 'm4', title: 'Experiment 4: Docker Compose', text: 'Objectives: Multi-service apps. Procedure: ...', pdf: '#' },
  { id: 'm5', title: 'Experiment 5: CI with GitHub Actions', text: 'Objectives: Setup workflow. Procedure: ...', pdf: '#' },
  { id: 'm6', title: 'Experiment 6: Kubernetes Deployment', text: 'Objectives: Deploy app. Procedure: ...', pdf: '#' },
];

const tools = [
  { id: 't1', title: 'Git', desc: 'Version control system', link: 'https://git-scm.com/', icon: 'https://avatars.githubusercontent.com/u/18133?s=200&v=4' },
  { id: 't2', title: 'VS Code', desc: 'Code editor by Microsoft', link: 'https://code.visualstudio.com/', icon: 'https://code.visualstudio.com/assets/apple-touch-icon.png' },
  { id: 't3', title: 'Docker Desktop', desc: 'Container runtime & tools', link: 'https://www.docker.com/products/docker-desktop/', icon: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png' },
  { id: 't4', title: 'Node.js', desc: 'Runtime for tooling/scripts', link: 'https://nodejs.org/', icon: 'https://nodejs.org/static/images/favicons/favicon-32x32.png' },
  { id: 't5', title: 'Kubectl', desc: 'Kubernetes CLI', link: 'https://kubernetes.io/docs/tasks/tools/', icon: 'https://kubernetes.io/images/favicon.png' },
  { id: 't6', title: 'Postman', desc: 'API client', link: 'https://www.postman.com/downloads/', icon: 'https://assets.getpostman.com/common-share/postman-logo-horizontal-white.svg' },
];

const devopsExperiments = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  return {
    id: `dx${n}`,
    title: `Experiment ${n}: DevOps Program ${n}`,
    video: videos[i % videos.length].youtubeId,
    tools: ['Git', 'Docker', 'VS Code'].slice(0, (i % 3) + 1),
    manual: `Procedure for Experiment ${n}:\n1. Step one...\n2. Step two...\n3. Step three...`,
  };
});

// Render Videos
const videoGrid = document.getElementById('videoGrid');
videoGrid.innerHTML = videos.map(v => `
  <article class="card">
    <a class="thumb" data-video="${v.youtubeId}" aria-label="Play ${v.title}">
      <img src="${v.thumb}" alt="${v.title}">
      <div class="play">▶</div>
    </a>
    <div class="card-body">
      <div class="media-title">${v.title}</div>
      <div class="media-desc">${v.desc}</div>
    </div>
  </article>
`).join('');

// Video modal logic
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
document.addEventListener('click', (e) => {
  const openEl = e.target.closest('[data-video]');
  const closeEl = e.target.closest('[data-close-modal]');
  if (openEl) {
    const id = openEl.getAttribute('data-video');
    openVideo(id);
  }
  if (closeEl) {
    closeVideo();
  }
});
function openVideo(youtubeId) {
  videoPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
}
function closeVideo() {
  videoPlayer.innerHTML = '';
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
}

// Manuals section removed from home

// Tools section removed from home

// DevOps experiments render
// DevOps list moved to dedicated pages. Home shows CTA only.

// Open chat from hero or devops
document.addEventListener('click', (e) => {
  const openChat = e.target.closest('[data-open-chat]');
  if (openChat) openChatPanel();
});

// Chat widget
const chatWidget = document.getElementById('chatWidget');
const chatFab = document.getElementById('chatFab');
const chatClose = document.getElementById('chatClose');
const chatPanel = chatWidget.querySelector('.chat-panel');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatText = document.getElementById('chatText');

function openChatPanel() {
  chatPanel.classList.add('open');
  chatPanel.setAttribute('aria-hidden', 'false');
  setTimeout(() => chatText.focus(), 50);
}
function closeChatPanel() {
  chatPanel.classList.remove('open');
  chatPanel.setAttribute('aria-hidden', 'true');
}
chatFab.addEventListener('click', openChatPanel);
chatClose.addEventListener('click', closeChatPanel);

function addBubble(text, who = 'bot') {
  const div = document.createElement('div');
  div.className = `bubble ${who}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

addBubble('ನಮಸ್ಕಾರ! I\'m your AI Assistant. Before we start, how was your experience today?');
// Add quick feedback buttons
const quick = document.createElement('div');
quick.className = 'chat-quick';
['👍 Great','👌 Good','😐 Average','👎 Needs improvement'].forEach(txt=>{
  const b=document.createElement('button'); b.type='button'; b.className='qbtn'; b.textContent=txt; b.onclick=()=>{ addBubble(txt,'user'); quick.remove(); addBubble('Thanks for the feedback! What do you want help with next?'); };
  quick.appendChild(b);
});
chatBody.appendChild(quick);
chatBody.scrollTop = chatBody.scrollHeight;

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = chatText.value.trim();
  if (!msg) return;
  addBubble(msg, 'user');
  chatText.value = '';
  // Dummy AI response
  setTimeout(() => {
    const reply = `Here\'s a tip: break the task into steps and verify each.\n(When connected to an API, I\'ll provide detailed answers for: "${msg}")`;
    addBubble(reply, 'bot');
  }, 500);
});

// GSAP hero and cards
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.from('.hero-title', { opacity: 0, y: 18, duration: .6, ease: 'power2.out' });
    gsap.from('.hero-tagline', { opacity: 0, y: 16, duration: .6, delay: .05 });
    gsap.from('.chip', { opacity: 0, y: 10, duration: .5, stagger: .05, delay: .1 });
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.features .card', { opacity: 0, y: 20, duration: .6, stagger: .08, ease: 'power2.out', scrollTrigger: { trigger: '.features', start: 'top 85%' } });
      gsap.from('.gallery img', { opacity: 0, y: 16, duration: .5, stagger: .06, ease: 'power2.out', scrollTrigger: { trigger: '.gallery', start: 'top 90%' } });
      gsap.from('.stat .num', { textContent: 0, duration: 1.2, snap: { textContent: 1 }, ease: 'power1.out', scrollTrigger: { trigger: '.stats-band', start: 'top 85%', once: true } });
    }
    // Hero float
    gsap.to('.orb-blue', { y: -10, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });
    gsap.to('.orb-green', { y: 10, repeat: -1, yoyo: true, duration: 3.5, ease: 'sine.inOut' });
  }
});


