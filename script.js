// العناصر
const countEl = document.getElementById('count');
const bigBtn = document.getElementById('bigBtn');
const resetBtn = document.getElementById('resetBtn');
const surpriseModal = document.getElementById('surpriseModal');
const continueBtn = document.getElementById('continueBtn');
const whatsappBtn = document.getElementById('whatsappBtn');

// العداد
let count = 0;

// === منطق العد ===
bigBtn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;

  // تأثير الضغط
  bigBtn.style.transform = 'scale(0.94)';
  setTimeout(() => { bigBtn.style.transform = 'scale(1)'; }, 120);

  // عند كل مضاعف لـ 10 (10، 20، 30...) → مفاجأة + طراطير
  if (count > 0 && count % 10 === 0) {
    launchConfetti();
    setTimeout(() => {
      surpriseModal.style.display = 'flex';
    }, 300);
  }
});

// إعادة العد
resetBtn.addEventListener('click', () => {
  count = 0;
  countEl.textContent = count;
  surpriseModal.style.display = 'none';
});

// متابعة العد بعد المفاجأة
continueBtn.addEventListener('click', () => {
  surpriseModal.style.display = 'none';
});

// فتح واتساب
whatsappBtn.addEventListener('click', () => {
  const whatsappLink = 'https://wa.me/966557144054'; // ← غيّر هنا
  window.open(whatsappLink, '_blank');
});

// === طراطير احتفالية (Confetti) ===
function launchConfetti() {
  // إنشاء canvas ديناميكيًا
  let canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 150;
  const gravity = 0.3;
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

  const confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let stillFalling = false;

    confetti.forEach(c => {
      c.y += c.speed;
      c.x += Math.sin(c.angle) * 0.5;
      c.rotation += c.rotationSpeed;

      if (c.y < canvas.height + 20) stillFalling = true;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rotation * Math.PI / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
      ctx.restore();
    });

    if (stillFalling) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  draw();
}

// دعم تكبير الشاشة
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});