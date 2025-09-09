// Theme toggle
const themeToggleDSA = document.getElementById('themeToggle');
const storedThemeDSA = localStorage.getItem('theme');
if (storedThemeDSA === 'light') document.body.classList.add('theme-light');
themeToggleDSA.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleDSA.textContent = isLight ? '☀️' : '🌙';
});
themeToggleDSA.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const { dsaPrograms } = window.DSA_DATA;
const dsaGrid = document.getElementById('dsaGrid');
dsaGrid.innerHTML = dsaPrograms.map(p => `
  <article class="card exp-card dsa-card">
    <div class="card-body">
      <div class="media-title dsa-title">${p.title}</div>
      <div class="media-desc">${p.description}</div>
      <div class="media-desc">C • GCC Compiler</div>
      <a class="btn" href="dsa_exp.html?id=${encodeURIComponent(p.id)}">Open</a>
    </div>
  </article>
`).join('');

window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) gsap.from('.exp-card', { opacity: 0, y: 24, duration: .6, stagger: .07, ease: 'power2.out' });
});
