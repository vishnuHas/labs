// Theme toggle
const themeToggleCN = document.getElementById('themeToggle');
const storedThemeCN = localStorage.getItem('theme');
if (storedThemeCN === 'light') document.body.classList.add('theme-light');
themeToggleCN.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleCN.textContent = isLight ? '☀️' : '🌙';
});
themeToggleCN.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const { cnPrograms } = window.CN_DATA;
const cnGrid = document.getElementById('cnGrid');
cnGrid.innerHTML = cnPrograms.map(p => `
  <article class="card exp-card">
    <div class="card-body">
      <div class="media-title">${p.title}</div>
      <div class="media-desc">C • Multiple files</div>
      <a class="btn" href="cn_exp.html?id=${encodeURIComponent(p.id)}">Open</a>
    </div>
  </article>
`).join('');

window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) gsap.from('.exp-card', { opacity: 0, y: 24, duration: .6, stagger: .07, ease: 'power2.out' });
});


