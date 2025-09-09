// Populate OS programs grid with cards
const { osPrograms } = window.OS_DATA;
const osGrid = document.getElementById('osGrid');
osGrid.innerHTML = osPrograms.map(p => `
  <article class="card exp-card dsa-card">
    <div class="card-body">
      <div class="media-title dsa-title">${p.title}</div>
      <div class="media-desc">${p.description}</div>
      <div class="media-desc">C • GCC Compiler</div>
      <a class="btn" href="os_exp.html?id=${encodeURIComponent(p.id)}">Open</a>
    </div>
  </article>
`).join('');

if (window.gsap) {
  gsap.from('#osGrid .card', { opacity: 0, y: 16, duration: .5, stagger: .05, ease: 'power2.out' });
}


