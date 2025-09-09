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
document.getElementById('expDescription').textContent = exp.description || '';

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
addBubble('Ask me anything about this experiment. I will help you!');
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


