const { osPrograms } = window.OS_DATA;

const params = new URLSearchParams(location.search);
const id = params.get('id');
const program = osPrograms.find(p => p.id === id) || osPrograms[0];

document.getElementById('expTitle').textContent = program.title;
document.getElementById('expSubtitle').textContent = program.description;

const codeBlock = document.getElementById('codeBlock');
const preToCode = () => {
  // Wrap content in a real <code> node for highlight.js after typing
  if (!codeBlock.querySelector('code')) {
    const codeNode = document.createElement('code');
    codeNode.className = 'hljs';
    codeNode.textContent = codeBlock.textContent;
    codeBlock.innerHTML = '';
    codeBlock.appendChild(codeNode);
  }
  if (window.hljs) window.hljs.highlightElement(codeBlock.querySelector('code'));
};

function highlightPlain(src){
  return src.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Simple C formatter: inserts newlines/indentation so compact code becomes readable
function formatC(source){
  let out = '';
  let indent = 0;
  let inStr = false, inChar = false, inSL = false, inML = false;
  let prev = '';
  let iForParens = 0; // >0 while inside for(...)
  const isAlphaNum = c => /[A-Za-z0-9_]/.test(c);
  const peek = (i) => source[i] || '';
  const tokenAt = (i) => {
    // get last 3 letters to detect 'for'
    return (source.slice(Math.max(0,i-3), i+1) || '').toLowerCase();
  };
  for (let i=0;i<source.length;i++){
    const c = source[i];
    const next = peek(i+1);
    // handle comment/state transitions
    if (!inStr && !inChar && !inML && c==='/' && next==='/' ) { inSL = true; out += c; continue; }
    if (!inStr && !inChar && !inSL && c==='/' && next==='*' ) { inML = true; out += c; continue; }
    if (inSL && c==='\n'){ inSL=false; out+=c; out += '  '.repeat(indent); continue; }
    if (inML && prev==='*' && c==='/' ){ inML=false; out+=c; continue; }
    if (inSL || inML){ out+=c; prev=c; continue; }

    if (c==='"' && !inChar && prev!=='\\') inStr = !inStr;
    if (c==='\'' && !inStr && prev!=='\\') inChar = !inChar;
    if (inStr || inChar){ out+=c; prev=c; continue; }

    // detect 'for(' to avoid breaking semicolons inside
    if (c==='('){
      const look = source.slice(Math.max(0,i-3), i).trim().toLowerCase();
      if (look.endsWith('for')) iForParens++;
    } else if (c===')' && iForParens>0){
      iForParens--;
    }

    if (c==='{' ){
      out += '{\n';
      indent++;
      out += '  '.repeat(indent);
      prev=c; continue;
    }
    if (c==='}'){
      indent = Math.max(0, indent-1);
      // trim trailing spaces/newlines
      if (out.length && out[out.length-1] !== '\n') out += '\n';
      out += '  '.repeat(indent) + '}';
      // add newline after closing brace except before semicolon
      if (peek(i+1) !== ';') out += '\n' + '  '.repeat(indent);
      prev=c; continue;
    }
    if (c===';'){
      out += ';';
      if (iForParens===0){
        out += '\n' + '  '.repeat(indent);
      }
      prev=c; continue;
    }
    if (c==='\n'){
      out += '\n' + '  '.repeat(indent);
      prev=c; continue;
    }
    out += c;
    prev=c;
  }
  return out
    .replace(/\s+\n/g,'\n')
    .replace(/\n+$/,'\n');
}

async function typeCodeByLine(text, el) {
  const formatted = formatC(text);
  const lines = formatted.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  el.innerHTML = '';
  for (let i = 0; i < lines.length; i++) {
    const lineEl = document.createElement('span');
    lineEl.className = 'code-line';
    el.appendChild(lineEl);
    if (i < lines.length - 1) el.appendChild(document.createTextNode('\n'));

    const line = lines[i];
    // Type this line character-by-character
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      // Append safely escaped char
      const safe = highlightPlain(ch);
      lineEl.innerHTML += safe;
      await new Promise(r => setTimeout(r, 6));
    }
    lineEl.classList.add('active');
    // Brief pause between lines for readability
    await new Promise(r => setTimeout(r, 40));
  }
  // After typing finished, apply syntax highlighting
  preToCode();
}

typeCodeByLine(program.code, codeBlock);

document.getElementById('copyBtn').addEventListener('click', ()=>{
  navigator.clipboard.writeText(program.code);
});

// Populate software list after code
const softwareText = document.getElementById('softwareText');
if (program.software && program.software.length > 0) {
  const s = program.software[0];
  softwareText.innerHTML = `Software: <a class="nav-link" href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`;
}


