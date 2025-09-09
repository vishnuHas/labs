// Theme toggle
const themeToggleWT = document.getElementById('themeToggle');
const storedThemeWT = localStorage.getItem('theme');
if (storedThemeWT === 'light') document.body.classList.add('theme-light');
themeToggleWT.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleWT.textContent = isLight ? '☀️' : '🌙';
});
themeToggleWT.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const { wtPrograms } = window.WT_DATA;
const wtGrid = document.getElementById('wtGrid');
wtGrid.innerHTML = wtPrograms.map(w => `
  <article class="card exp-card dsa-card">
    <div class="card-body">
      <div class="media-title dsa-title">${w.title}</div>
      <div class="media-desc">HTML/CSS/JS • Code only</div>
      <a class="btn" href="wt_exp.html?id=${encodeURIComponent(w.id)}">Open</a>
    </div>
  </article>
`).join('');

window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) gsap.from('.exp-card', { opacity: 0, y: 24, duration: .6, stagger: .07, ease: 'power2.out' });
});


