// ===== CONFETTI =====
function createConfetti () {
  const colors = [
    '#f4a0b0',
    '#e8d5f5',
    '#ffd54f',
    '#a5d6a7',
    '#80cbc4',
    '#ce93d8',
    '#fce4ec'
  ]
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-piece'
    el.style.left = Math.random() * 100 + 'vw'
    el.style.background = colors[Math.floor(Math.random() * colors.length)]
    el.style.animationDuration = 2 + Math.random() * 4 + 's'
    el.style.animationDelay = Math.random() * 5 + 's'
    el.style.width = el.style.height = 6 + Math.random() * 10 + 'px'
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
    document.getElementById('splash').appendChild(el)
  }
}
createConfetti()

// ===== CURSOR =====
let mx = 0,
  my = 0
document.addEventListener('mousemove', e => {
  mx = e.clientX
  my = e.clientY

  const stars = ['✦', '✧', '·', '⋆', '✿', '♡']
  if (Math.random() > 0.7) {
    const t = document.createElement('div')
    t.className = 'star-trail'
    t.style.left = mx + (Math.random() - 0.5) * 20 + 'px'
    t.style.top = my + (Math.random() - 0.5) * 20 + 'px'
    t.textContent = stars[Math.floor(Math.random() * stars.length)]
    t.style.color = ['#f4a0b0', '#d4a853', '#ce93d8', '#e88aa0'][
      Math.floor(Math.random() * 4)
    ]
    document.body.appendChild(t)
    setTimeout(() => t.remove(), 800)
  }
})

// ===== ENTER SITE =====
function enterSite () {
  document.getElementById('splash').classList.add('hidden')
  document.getElementById('main').classList.add('visible')
  setTimeout(startFireworks, 500)
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal')
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible')
    })
  },
  { threshold: 0.1 }
)
revealEls.forEach(el => observer.observe(el))

// Staggered reason cards
const reasonCards = document.querySelectorAll('.reason-card')
const reasonObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = Array.from(reasonCards).indexOf(e.target)
        setTimeout(() => e.target.classList.add('revealed'), idx * 120)
      }
    })
  },
  { threshold: 0.1 }
)
reasonCards.forEach(c => reasonObserver.observe(c))

// ===== BALLOONS =====
const balloonMsgs = [
  { msg: 'You are loved more than you know', color: '#f4a0b0' },
  { msg: 'Your smile is beautiful, never loose it', color: '#ce93d8' },
  { msg: 'You are genuinely one of a kind', color: '#80cbc4' },
  { msg: 'The baddest, the kindest, the best', color: '#ffd54f' },
  { msg: 'The best thing about you is being you', color: '#e88aa0' },
  { msg: 'Forever grateful you exist 💕', color: '#a5d6a7' }
]
const bc = document.getElementById('balloonContainer')
const rm = document.getElementById('revealedMessages')
balloonMsgs.forEach((b, i) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'balloon'
  wrapper.innerHTML = `
    <svg width="100" height="140" viewBox="0 0 100 140">
      <ellipse cx="50" cy="55" rx="40" ry="48" fill="${b.color}"/>
      <ellipse cx="50" cy="40" rx="15" ry="18" fill="rgba(255,255,255,0.2)"/>
      <polygon points="50,103 44,115 56,115" fill="${b.color}"/>
      <line x1="50" y1="115" x2="50" y2="138" stroke="#b0b0b0" stroke-width="1.5"/>
    </svg>
    <div class="balloon-msg">${i + 1}</div>
  `
  wrapper.onclick = () => {
    if (!wrapper.classList.contains('popped')) {
      wrapper.classList.add('popped')
      const d = document.createElement('div')
      d.className = 'revealed-msg'
      d.innerHTML = '🎈 ' + b.msg
      rm.appendChild(d)
    }
  }
  bc.appendChild(wrapper)
})

// ===== LETTER =====
function openLetter () {
  document.getElementById('letterOverlay').classList.add('open')
}
function closeLetter (e) {
  if (
    !e ||
    e.target === document.getElementById('letterOverlay') ||
    e.currentTarget.tagName === 'BUTTON'
  ) {
    document.getElementById('letterOverlay').classList.remove('open')
  }
}

// ===== FIREWORKS =====
function startFireworks () {
  const canvas = document.getElementById('fireworkCanvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  function resize () {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)
  const particles = []
  function launch () {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height * 0.6
    const colors = [
      '#f4a0b0',
      '#ffd54f',
      'white',
      '#ce93d8',
      '#80cbc4',
      '#e88aa0'
    ]
    const c = colors[Math.floor(Math.random() * colors.length)]
    for (let i = 0; i < 60; i++) {
      const angle = ((Math.PI * 2) / 60) * i
      const speed = 1.5 + Math.random() * 3
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: c,
        size: 2 + Math.random() * 2
      })
    }
  }
  setInterval(launch, 1200)
  function animate () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy + 0.05
      p.vy += 0.04
      p.alpha -= 0.018
      if (p.alpha <= 0) {
        particles.splice(i, 1)
        continue
      }
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
    requestAnimationFrame(animate)
  }
  animate()
}

function triggerMiniFireworks () {
  const canvas = document.getElementById('fireworkCanvas')
  // also do a little DOM confetti pop
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const el = document.createElement('div')
      el.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:10px;height:10px;border-radius:50%;background:${
        ['#f4a0b0', '#ffd54f', '#ce93d8', '#a5d6a7'][
          Math.floor(Math.random() * 4)
        ]
      };left:${30 + Math.random() * 40}%;top:${
        40 + Math.random() * 20
      }%;animation:trailFade 1s forwards;`
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 1000)
    }, i * 40)
  }
}
let candleBlown = false;

function blowCandle() {

  if (candleBlown) return;

  candleBlown = true;

  const flame = document.getElementById("flame");
  const wishText = document.getElementById("wishText");
  const card = document.getElementById("birthdayWishCard");
  const cake = document.querySelector(".cake-svg");

  flame.classList.add("blown");

  cake.classList.add("shake");

  triggerMiniFireworks();

  wishText.innerHTML =
    "✨ Wish made... let's see what the universe has in store ✨";

  setTimeout(() => {
    card.classList.add("show");
  }, 1000);

  setTimeout(() => {
    cake.classList.remove("shake");
  }, 500);
}