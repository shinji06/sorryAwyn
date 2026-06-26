// Floating dots
for (let i = 0; i < 12; i++) {
  const d = document.createElement('div');
  d.className = 'dot';
  const sz = 4 + Math.random() * 7;
  d.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:${Math.random()*20}px;animation-duration:${7+Math.random()*8}s;animation-delay:${Math.random()*10}s;`;
  document.getElementById('dots').appendChild(d);
}

// Typewriter
const text = "I got so caught up in the game last night that I completely lost myself and took it out on you — and that was wrong.\n\nYou were just there to have fun with me, and I made it unpleasant. You deserve so much better than that from me. I'm really, truly sorry. 💜";
let idx = 0;
const msgEl = document.getElementById('msg-text');
const cur = document.createElement('span');
cur.className = 'cursor';
function type() {
  if (idx <= text.length) {
    msgEl.innerHTML = text.slice(0, idx).replace(/\n\n/g, '<br><br>');
    msgEl.appendChild(cur);
    idx++;
    setTimeout(type, idx < 3 ? 60 : 24);
  }
}
setTimeout(type, 700);

// Confetti
const confColors = ['#C4B5FD','#FB7185','#D4D4D4','#A5F3FC','#FDE68A','#86EFAC'];
function burst(rect) {
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  for (let k = 0; k < 28; k++) {
    const p = document.createElement('div');
    p.className = 'conf-particle';
    const angle = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90;
    p.style.cssText = `background:${confColors[k%confColors.length]};left:${cx}px;top:${cy}px;--tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist-40}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-delay:${Math.random()*.1}s;`;
    document.body.appendChild(p);
    setTimeout(() => p.classList.add('go'), 10);
    setTimeout(() => p.remove(), 1400);
  }
}

// Apology buttons
const loveEmojis = ['💜 sent','🌸 sent','🤍 sent','✨ sent','🫶 sent'];
let loveIdx = 0;
document.getElementById('loveBtn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  btn.textContent = loveEmojis[loveIdx++ % loveEmojis.length];
  setTimeout(() => btn.textContent = 'send love back', 1600);
  burst(btn.getBoundingClientRect());
});
document.getElementById('forgiveBtn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  btn.textContent = 'thank you 🤍';
  btn.classList.remove('primary'); btn.classList.add('forgiven');
  btn.replaceWith(btn.cloneNode(true)); // remove listener
  burst(btn.getBoundingClientRect());
});

// Music
const audio = document.getElementById('bgAudio');
const bars = document.getElementById('bars');
const playIcon = document.getElementById('playIcon');
let playing = false;
audio.volume = 0.5;
document.getElementById('playBtn').addEventListener('click', () => {
  if (playing) {
    audio.pause(); bars.classList.add('paused');
    playIcon.innerHTML = '<path d="M1 1l10 6-10 6V1z"/>';
  } else {
    audio.play().catch(() => {});
    bars.classList.remove('paused');
    playIcon.innerHTML = '<rect x="2" y="1" width="4" height="12"/><rect x="8" y="1" width="4" height="12"/>';
  }
  playing = !playing;
});
document.getElementById('vol-slider').addEventListener('input', (e) => {
  audio.volume = parseFloat(e.target.value);
});

// YT like
let liked = false, likeN = 847;
document.getElementById('likeBtn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  liked = !liked; likeN += liked ? 1 : -1;
  document.getElementById('likeCount').textContent = likeN;
  btn.classList.toggle('liked', liked);
  if (liked) burst(btn.getBoundingClientRect());
});

// YT share
document.getElementById('shareBtn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
  const orig = btn.innerHTML;
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
  setTimeout(() => btn.innerHTML = orig, 2000);
});

// Subscribe
let subbed = false, subN = 312;
document.getElementById('subBtn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  subbed = !subbed; subN += subbed ? 1 : -1;
  btn.textContent = subbed ? 'Subscribed ✓' : 'Subscribe';
  btn.classList.toggle('subscribed', subbed);
  document.getElementById('subCount').textContent = subN + ' subscribers';
  if (subbed) burst(btn.getBoundingClientRect());
});

// Description toggle
document.getElementById('descMore').addEventListener('click', () => {
  const full = document.getElementById('descFull');
  const more = document.getElementById('descMore');
  const open = full.classList.toggle('open');
  more.textContent = open ? 'show less' : '...more';
});

// Comment likes
document.querySelectorAll('.comment-like').forEach(btn => {
  btn.addEventListener('click', () => {
    const wasLiked = btn.classList.contains('liked');
    btn.classList.toggle('liked');
    const n = parseInt(btn.dataset.likes);
    const newN = wasLiked ? n - 1 : n + 1;
    btn.dataset.likes = newN;
    btn.innerHTML = btn.innerHTML.replace(/\d+/, newN);
  });
});

// Load more comments
document.getElementById('loadMoreBtn').addEventListener('click', (e) => {
  document.querySelectorAll('.hidden-comment').forEach(c => c.style.display = 'flex');
  e.target.remove();
});

// Back to top
document.getElementById('backTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
