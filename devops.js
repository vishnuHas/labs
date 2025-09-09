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
  const showLock = (i + 1) !== 2 && (i + 1) !== 3 && (i + 1) !== 4; // add lock except 2,3,4
  const lockIcon = showLock ? '🔒 ' : '';
  return `
  <article class="card exp-card" data-idx="${i}">
    <a class="thumb" ${coming ? '' : `href="experiment.html?id=${encodeURIComponent(d.id)}"`} aria-label="Open ${d.title}">
      <img src="${thumb}" alt="${d.title}">
      <div class="play">▶</div>
    </a>
    <div class="card-body">
      <div class="media-title"><img class="exp-icon" src="${icon}" alt="icon"> ${subtitle}</div>
      <div class="media-desc">${d.description}</div>
      <div class="exp-meta">
        <span class="badge">${d.tools.length} tools</span>
      </div>
      ${coming
        ? `<button class="btn lock-btn" data-locked="true" aria-disabled="true">${lockIcon}Coming Soon</button>`
        : showLock
          ? `<a class="btn lock-btn" data-locked="true" aria-disabled="true" href="experiment.html?id=${encodeURIComponent(d.id)}">${lockIcon}Open</a>`
          : `<a class="btn" href="experiment.html?id=${encodeURIComponent(d.id)}">Open</a>`}
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

  // Setup lock handlers and toast
  const lockedButtons = document.querySelectorAll('.lock-btn[data-locked="true"]');
  let toastEl = document.getElementById('lockToast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'lockToast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    toastEl.style.position = 'fixed';
    toastEl.style.right = '20px';
    toastEl.style.bottom = '20px';
    toastEl.style.background = 'rgba(22,27,34,0.95)';
    toastEl.style.color = '#E6E9F2';
    toastEl.style.border = '1px solid rgba(255,255,255,.12)';
    toastEl.style.borderRadius = '12px';
    toastEl.style.padding = '12px 14px';
    toastEl.style.boxShadow = '0 10px 30px rgba(0,0,0,.35)';
    toastEl.style.display = 'none';
    toastEl.style.zIndex = '10000';
    toastEl.innerHTML = '<strong>🔒 Locked</strong><div style="font-size:13px;color:#8B96B2;margin-top:4px;">Contact Vishnu — 636296367</div>';
    document.body.appendChild(toastEl);
  }

  function showLockToast(){
    if (!window.gsap) return;
    gsap.killTweensOf(toastEl);
    toastEl.style.display = 'block';
    gsap.fromTo(toastEl, {y:30, opacity:0}, {y:0, opacity:1, duration:.35, ease:'power3.out'});
    gsap.to(toastEl, {delay:2.2, duration:.35, opacity:0, y:10, ease:'power2.in', onComplete:()=>{ toastEl.style.display='none'; }});
  }

  lockedButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showLockToast();
    }, true);
  });
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
// locked
chatClose.addEventListener('click', closeChatPanel);
// Format chat message with code blocks and paragraphs
function formatChatMessage(text) {
  // Split text into paragraphs
  let formatted = text
    // Convert code blocks (```code```) to proper HTML
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block"><code class="language-$1">$2</code></pre>')
    // Convert inline code (`code`) to proper HTML
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // Convert line breaks to HTML
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  // Wrap in paragraph tags
  formatted = '<p>' + formatted + '</p>';
  
  return formatted;
}

function addBubble(text, who='bot'){ 
  const d=document.createElement('div'); 
  d.className=`bubble ${who}`; 
  
  // Format text with proper code blocks and paragraphs
  const formattedText = formatChatMessage(text);
  d.innerHTML = formattedText;
  
  chatBody.appendChild(d); 
  chatBody.scrollTop=chatBody.scrollHeight; 
}
addBubble('Hello! I am your AI Lab Assistant. Please select an experiment.');
// Gemini API configuration
const AI_API_KEY = 'AIzaSyBVnxv2G12vNqd9gTetGZvQ02LMJ9U-Fws';
const AI_MODEL = 'gemini-2.5-flash';

// Send message to Gemini API
async function sendToGemini(message) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${AI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are an AI Lab Assistant for VTU students. You MUST respond ONLY in English. Never use Kannada, Hindi, or any other language. All responses must be in English.

Help with lab experiment questions about:
- DevOps: Docker, Kubernetes, CI/CD, Jenkins, Maven, Gradle
- Machine Learning: Python, pandas, numpy, scikit-learn, data visualization
- Web Technology: HTML, CSS, JavaScript, jQuery, PHP, AJAX
- Computer Networks: TCP, UDP, HTTP, DNS, socket programming, routing
- Data Structures & Algorithms: C programming, arrays, linked lists, trees, graphs

Be helpful, concise, and provide practical examples. If the question is not related to these topics, politely redirect to lab-related questions.

User question: ${message}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    })
  });
  
  const data = await response.json();
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error('No response from AI');
  }
}

chatForm.addEventListener('submit', async (e)=>{ 
  e.preventDefault(); 
  const msg=chatText.value.trim(); 
  if(!msg) return; 
  addBubble(msg,'user'); 
  chatText.value=''; 
  
  // Show typing indicator
  const typingBubble = document.createElement('div');
  typingBubble.className = 'bubble bot typing';
  typingBubble.textContent = 'AI is typing...';
  chatBody.appendChild(typingBubble);
  chatBody.scrollTop = chatBody.scrollHeight;
  
  try {
    const response = await sendToGemini(msg);
    typingBubble.remove();
    addBubble(response, 'bot');
  } catch (error) {
    typingBubble.remove();
    addBubble('Sorry, I encountered an error. Please try again.', 'bot');
  }
});


