// Theme toggle
const themeToggleML = document.getElementById('themeToggle');
const storedThemeML = localStorage.getItem('theme');
if (storedThemeML === 'light') document.body.classList.add('theme-light');
themeToggleML.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggleML.textContent = isLight ? '☀️' : '🌙';
});
themeToggleML.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';

const { mlExperiments } = window.ML_DATA;
const mlGrid = document.getElementById('mlGrid');
mlGrid.innerHTML = mlExperiments.map(m => `
  <article class="card exp-card">
    <div class="card-body">
      <div class="media-title">${m.title}</div>
      <div class="media-desc">Python code only • No manual • No video</div>
      <a class="btn" href="ml_exp.html?id=${encodeURIComponent(m.id)}">Open</a>
    </div>
  </article>
`).join('');

// GSAP enter
window.addEventListener('DOMContentLoaded', () => {
  if (window.gsap) {
    gsap.from('.exp-card', { opacity: 0, y: 24, duration: .6, stagger: .07, ease: 'power2.out' });
  }
});


