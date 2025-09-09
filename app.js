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

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchResults = document.getElementById('searchResults');
const searchContent = document.getElementById('searchContent');
const searchClose = document.getElementById('searchClose');
const main = document.querySelector('main');

// Debounce timer for search
let searchTimeout;

// Lab sections data for search
const labSections = [
  { 
    id: 'devops', 
    title: 'DevOps Lab', 
    keywords: ['devops', 'docker', 'kubernetes', 'ci/cd', 'jenkins', 'maven', 'gradle', 'deployment', 'automation'],
    element: document.querySelector('#devops .devops-card')
  },
  { 
    id: 'ml', 
    title: 'Machine Learning Lab', 
    keywords: ['machine learning', 'ml', 'python', 'ai', 'data science', 'pandas', 'numpy', 'scikit', 'visualization'],
    element: document.querySelector('#ml .devops-card')
  },
  { 
    id: 'wt', 
    title: 'Web Technology Lab', 
    keywords: ['web technology', 'html', 'css', 'javascript', 'jquery', 'php', 'ajax', 'frontend', 'backend'],
    element: document.querySelector('#wt .devops-card')
  },
  { 
    id: 'cn', 
    title: 'Computer Networks Lab', 
    keywords: ['computer networks', 'networking', 'tcp', 'udp', 'http', 'dns', 'socket', 'routing', 'protocols'],
    element: document.querySelector('#cn .devops-card')
  },
  { 
    id: 'dsa', 
    title: 'Data Structures & Algorithms Lab', 
    keywords: ['data structures', 'algorithms', 'dsa', 'c programming', 'arrays', 'linked list', 'tree', 'graph', 'sorting'],
    element: document.querySelector('#dsa .devops-card')
  },
  { 
    id: 'os', 
    title: 'Operating Systems Lab', 
    keywords: ['operating systems', 'os', 'process', 'fork', 'exec', 'wait', 'scheduling', 'fcfs', 'sjf', 'round robin', 'priority', 'semaphore', 'producer', 'consumer', 'fifo', 'banker', 'memory', 'first fit', 'best fit', 'worst fit', 'page replacement', 'fifo', 'lru', 'directory', 'scan disk'],
    element: document.querySelector('#os .devops-card')
  }
];

function highlightText(text, searchTerm) {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function showAllLabsPopup() {
  // Add blur to main content
  main.classList.add('searching');
  
  // Show overlay with animation
  searchOverlay.classList.add('active');
  gsap.to(searchOverlay, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
  
  // Show search results container
  searchResults.classList.add('active');
  gsap.to(searchResults, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: 'back.out(1.7)',
    delay: 0.1
  });
  
  // Generate all lab cards
  searchContent.innerHTML = labSections.map(section => {
    // Determine the correct page URL for each lab
    let labUrl = '';
    switch(section.id) {
      case 'devops':
        labUrl = 'devops.html';
        break;
      case 'ml':
        labUrl = 'ml.html';
        break;
      case 'wt':
        labUrl = 'wt.html';
        break;
      case 'cn':
        labUrl = 'cn.html';
        break;
      case 'dsa':
        labUrl = 'dsa.html';
        break;
      default:
        labUrl = '#';
    }
    
    return `
      <div class="search-result-card">
        <div class="card-head">
          <div class="dsa-title">${section.title}</div>
          <div class="card-subtitle">${section.keywords.slice(0, 3).join(' • ')}</div>
        </div>
        <div class="card-body">
          <p class="muted">Click to explore this lab section</p>
          <a class="btn" href="${labUrl}">Go to Lab</a>
        </div>
      </div>
    `;
  }).join('');
  
  // Animate cards in
  const cards = searchContent.querySelectorAll('.search-result-card');
  gsap.fromTo(cards, 
    { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    { 
      opacity: 1, 
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      delay: 0.2
    }
  );
}

function showSearchPopup(matchingSections, searchTerm) {
  // Add blur to main content
  main.classList.add('searching');
  
  // Show overlay with animation
  searchOverlay.classList.add('active');
  gsap.to(searchOverlay, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
  
  // Show search results container
  searchResults.classList.add('active');
  gsap.to(searchResults, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: 'back.out(1.7)',
    delay: 0.1
  });
  
  // Generate search result cards
  if (matchingSections.length === 0) {
    searchContent.innerHTML = `
      <div class="search-no-results">
        <h3>No results found</h3>
        <p>Try searching for "devops", "ml", "web", "networks", or "dsa"</p>
      </div>
    `;
  } else {
    searchContent.innerHTML = matchingSections.map(section => {
      // Determine the correct page URL for each lab
      let labUrl = '';
      switch(section.id) {
        case 'devops':
          labUrl = 'devops.html';
          break;
        case 'ml':
          labUrl = 'ml.html';
          break;
        case 'wt':
          labUrl = 'wt.html';
          break;
        case 'cn':
          labUrl = 'cn.html';
          break;
        case 'dsa':
          labUrl = 'dsa.html';
          break;
        default:
          labUrl = '#';
      }
      
      return `
        <div class="search-result-card">
          <div class="card-head">
            <div class="dsa-title">${highlightText(section.title, searchTerm)}</div>
            <div class="card-subtitle">${section.keywords.slice(0, 3).join(' • ')}</div>
          </div>
          <div class="card-body">
            <p class="muted">Click to explore this lab section</p>
            <a class="btn" href="${labUrl}">Go to Lab</a>
          </div>
        </div>
      `;
    }).join('');
    
    // Animate cards in
    const cards = searchContent.querySelectorAll('.search-result-card');
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 20,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 0.2
      }
    );
  }
}

function hideSearchPopup() {
  // Remove blur from main content
  main.classList.remove('searching');
  
  // Hide overlay and results
  gsap.to(searchOverlay, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      searchOverlay.classList.remove('active');
    }
  });
  
  gsap.to(searchResults, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      searchResults.classList.remove('active');
    }
  });
}

function filterCards(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  
  if (term === '') {
    // Clear search - hide popup and show all cards
    hideSearchPopup();
    
    labSections.forEach(section => {
      section.element.classList.remove('hidden', 'filtered');
      gsap.to(section.element, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    return;
  }
  
  // Only show popup if user has typed a complete word (at least 3 characters)
  if (term.length < 3) {
    hideSearchPopup();
    return;
  }
  
  // Find matching sections
  const matchingSections = labSections.filter(section => 
    section.keywords.some(keyword => 
      keyword.toLowerCase().includes(term) || 
      section.title.toLowerCase().includes(term)
    )
  );
  
  // Hide all cards first
  labSections.forEach(section => {
    section.element.classList.add('hidden');
    section.element.classList.remove('filtered');
    gsap.to(section.element, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in'
    });
  });
  
  // Show popup with matching results
  showSearchPopup(matchingSections, searchTerm);
}

// Search event listeners
searchInput.addEventListener('input', (e) => {
  // Don't show popup while typing, just clear any existing popup
  hideSearchPopup();
});

searchBtn.addEventListener('click', () => {
  // Clear timeout and search immediately on button click
  clearTimeout(searchTimeout);
  
  // If search input is empty, show all labs in popup
  if (searchInput.value.trim() === '') {
    showAllLabsPopup();
  } else {
    filterCards(searchInput.value);
  }
});

// Close search popup
searchClose.addEventListener('click', () => {
  searchInput.value = '';
  filterCards('');
  searchInput.focus();
});

// Close search when clicking overlay
searchOverlay.addEventListener('click', () => {
  searchInput.value = '';
  filterCards('');
  searchInput.focus();
});

// Prevent closing when clicking on search results
searchResults.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Handle Enter key and Escape key
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    // Trigger search popup on Enter
    if (searchInput.value.trim() === '') {
      showAllLabsPopup();
    } else {
      filterCards(searchInput.value);
    }
  } else if (e.key === 'Escape') {
    searchInput.value = '';
    filterCards('');
  }
});

// Focus search on Ctrl+K
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
});

// AI Chat functionality
const AI_API_KEY = 'AIzaSyBVnxv2G12vNqd9gTetGZvQ02LMJ9U-Fws';
const AI_MODEL = 'gemini-2.5-flash';

const aiChatBtn = null; // disabled
const aiChatOverlay = document.getElementById('aiChatOverlay');
const aiChatModal = document.getElementById('aiChatModal');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatMessages = document.getElementById('aiChatMessages');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatSend = document.getElementById('aiChatSend');

let isAiChatOpen = false;

// Open AI chat
function openAiChat() {
  isAiChatOpen = true;
  aiChatOverlay.classList.add('active');
  aiChatModal.classList.add('active');
  aiChatInput.focus();
  
  // Add welcome message if no messages
  if (aiChatMessages.children.length === 0) {
    addAiMessage("Hello! I'm your AI Lab Assistant. I can help you with questions about DevOps, Machine Learning, Web Technology, Computer Networks, and Data Structures & Algorithms. I will respond in English only. What would you like to know?", 'ai');
  }
}

// Close AI chat
function closeAiChat() {
  isAiChatOpen = false;
  aiChatOverlay.classList.remove('active');
  aiChatModal.classList.remove('active');
  aiChatInput.value = '';
}

// Add message to chat
function addAiMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-chat-message ${sender}`;
  
  // Format text with proper code blocks and paragraphs
  const formattedText = formatChatMessage(text);
  messageDiv.innerHTML = formattedText;
  
  aiChatMessages.appendChild(messageDiv);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

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

// Send message to AI
async function sendToAi(message) {
  try {
    aiChatSend.disabled = true;
    aiChatSend.textContent = 'Sending...';
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `System: You are an AI Lab Assistant for VTU students. You MUST respond ONLY in English. Never use Kannada, Hindi, or any other language. All responses must be in English.

User: ${message}

Assistant: I'll help you with your lab question in English.`
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
      const aiResponse = data.candidates[0].content.parts[0].text;
      addAiMessage(aiResponse, 'ai');
    } else {
      addAiMessage("Sorry, I couldn't process your request. Please try again.", 'ai');
    }
  } catch (error) {
    console.error('AI Chat Error:', error);
    addAiMessage("Sorry, I'm having trouble connecting. Please check your internet connection and try again.", 'ai');
  } finally {
    aiChatSend.disabled = false;
    aiChatSend.textContent = 'Send';
  }
}

// Event listeners for AI chat
// disabled: no open chat button
aiChatClose.addEventListener('click', closeAiChat);
aiChatOverlay.addEventListener('click', (e) => {
  if (e.target === aiChatOverlay) {
    closeAiChat();
  }
});

aiChatSend.addEventListener('click', () => {
  const message = aiChatInput.value.trim();
  if (message) {
    addAiMessage(message, 'user');
    sendToAi(message);
    aiChatInput.value = '';
  }
});

aiChatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    aiChatSend.click();
  }
});

// Close AI chat on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isAiChatOpen) {
    closeAiChat();
  }
});

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
  
  // Format text with proper code blocks and paragraphs
  const formattedText = formatChatMessage(text);
  div.innerHTML = formattedText;
  
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

addBubble('Hello! I\'m your AI Lab Assistant. I can help you with questions about DevOps, Machine Learning, Web Technology, Computer Networks, and Data Structures & Algorithms. What would you like to know?');
// Add quick feedback buttons
const quick = document.createElement('div');
quick.className = 'chat-quick';
['👍 Great','👌 Good','😐 Average','👎 Needs improvement'].forEach(txt=>{
  const b=document.createElement('button'); b.type='button'; b.className='qbtn'; b.textContent=txt; b.onclick=()=>{ addBubble(txt,'user'); quick.remove(); addBubble('Thanks for the feedback! What do you want help with next?'); };
  quick.appendChild(b);
});
chatBody.appendChild(quick);
chatBody.scrollTop = chatBody.scrollHeight;

// Build searchable corpus from provided lab program data (titles + code)
function getAllProgramsFromData() {
  const programs = [];
  try {
    if (window.DSA_DATA?.dsaPrograms) {
      programs.push(...window.DSA_DATA.dsaPrograms.map(p => ({ lab: 'DSA', ...p })));
    }
  } catch {}
  try {
    if (window.CN_DATA?.cnPrograms) {
      programs.push(...window.CN_DATA.cnPrograms.map(p => ({ lab: 'CN', ...p })));
    }
  } catch {}
  try {
    if (window.WT_DATA?.wtPrograms) {
      programs.push(...window.WT_DATA.wtPrograms.map(p => ({ lab: 'WT', ...p })));
    }
  } catch {}
  try {
    if (window.ML_DATA?.mlExperiments) {
      programs.push(...window.ML_DATA.mlExperiments.map(p => ({ lab: 'ML', ...p })));
    }
  } catch {}
  return programs;
}

function findProgramByQuery(query) {
  const text = (query || '').toLowerCase();
  const all = getAllProgramsFromData();
  if (all.length === 0) return null;
  // Match by explicit id like dsa-1, cn-3 etc.
  const idMatch = all.find(p => (p.id || '').toLowerCase() === text || text.includes((p.id || '').toLowerCase()));
  if (idMatch) return idMatch;
  // Match by program number words like "program 1", "experiment 2"
  const num = (text.match(/\b(program|exp(eriment)?)\s*(\d{1,2})\b/i) || [])[3];
  if (num) {
    const byNumInTitle = all.find(p => (p.title || '').toLowerCase().match(new RegExp(`(^|[^\\d])${num}[^\\d]`)));
    if (byNumInTitle) return byNumInTitle;
  }
  // Fallback to fuzzy title contains
  const titleMatch = all.find(p => (p.title || '').toLowerCase().includes(text));
  if (titleMatch) return titleMatch;
  // Fallback by keywords: arrays, stack, queue, dfs, bfs, etc.
  const keywords = ['array','stack','queue','linked','tree','graph','bfs','dfs','hash','sort','search','socket','http','dns','routing','php','ajax','jquery','python','pandas','numpy','regression','bayes'];
  if (keywords.some(k => text.includes(k))) {
    const first = all.find(p => (p.description || p.title || '').toLowerCase().includes(keywords.find(k => text.includes(k))));
    if (first) return first;
  }
  return null;
}

// Send message to Gemini API with optional grounded program context
async function sendToGemini(message) {
  const program = findProgramByQuery(message);
  const programTitle = program?.title || '';
  const programLab = program?.lab || '';
  const programCode = program?.code || program?.program || '';
  const context = program ? `\n\nContext Program (Lab: ${programLab}):\nTITLE: ${programTitle}\nCODE:\n${programCode}\n\nInstructions: Answer ONLY using the above program and explain step-by-step referencing the given code. If the user asks for modifications, propose minimal edits with small diff-like code blocks. If unsure, ask a clarifying question.` : '';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBVnxv2G12vNqd9gTetGZvQ02LMJ9U-Fws`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are an AI Lab Assistant for VTU students. You MUST respond ONLY in English.

Help with lab experiment questions about:
- DevOps: Docker, Kubernetes, CI/CD, Jenkins, Maven, Gradle
- Machine Learning: Python, pandas, numpy, scikit-learn, data visualization
- Web Technology: HTML, CSS, JavaScript, jQuery, PHP, AJAX
- Computer Networks: TCP, UDP, HTTP, DNS, socket programming, routing
- Data Structures & Algorithms: C programming, arrays, linked lists, trees, graphs

Be helpful, concise, and provide practical examples. If the question is not related to these topics, politely redirect to lab-related questions.${context}

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

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = chatText.value.trim();
  if (!msg) return;
  addBubble(msg, 'user');
  chatText.value = '';
  
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
      // Premium card on scroll
      gsap.from('.premium-card', { opacity: 0, y: 18, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: '.premium-section', start: 'top 85%', once: true } });
    }
    // Hero float
    gsap.to('.orb-blue', { y: -10, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });
    gsap.to('.orb-green', { y: 10, repeat: -1, yoyo: true, duration: 3.5, ease: 'sine.inOut' });
    gsap.to('.sparkles', { y: -6, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 3 });
  }
});


