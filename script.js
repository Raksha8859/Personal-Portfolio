document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Mobile nav ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

document.querySelectorAll('.tab').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- Active tab on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('.tab').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'light' ? '○' : '◐';
}

let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('portfolio-theme') || 'dark'; } catch (e) {}
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  try { localStorage.setItem('portfolio-theme', newTheme); } catch (e) {}
});

/* ---------- Hero typing animation ---------- */
const typedCodeEl = document.getElementById('typedCode');
const codeLines = [
  { text: "const priyanka = {", cls: "" },
  { text: "  role: 'Frontend Developer',", cls: "" },
  { text: "  stack: ['HTML', 'CSS', 'JavaScript'],", cls: "" },
  { text: "  loves: 'clean, responsive UI',", cls: "" },
  { text: "  status: 'always learning'", cls: "" },
  { text: "};", cls: "" }
];

function typeCode() {
  typedCodeEl.textContent = '';
  let lineIndex = 0;
  let charIndex = 0;

  function typeChar() {
    if (lineIndex >= codeLines.length) return;
    const line = codeLines[lineIndex].text;
    if (charIndex <= line.length) {
      const linesShown = codeLines.slice(0, lineIndex).map(l => l.text).join('\n');
      typedCodeEl.textContent = (linesShown ? linesShown + '\n' : '') + line.slice(0, charIndex);
      charIndex++;
      setTimeout(typeChar, 18 + Math.random() * 22);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 220);
    }
  }
  typeChar();
}
window.addEventListener('load', typeCode);

/* ---------- Scroll reveal ---------- */
const revealTargets = document.querySelectorAll(
  '.about-grid, .icon-card, .interest-card, .project-card, .skill-row, .contact-form'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

/* ---------- Animated stat counters ---------- */
const statEls = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'), 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    statObserver.unobserve(el);
  });
}, { threshold: 0.4 });
statEls.forEach(el => statObserver.observe(el));

/* ---------- Skill bar fill ---------- */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-level') + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
skillFills.forEach(el => skillObserver.observe(el));

/* ---------- Project filters ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags');
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden-card', !show);
    });
  });
});

/* ---------- Contact form ---------- */
const contactForm = document.getElementById('contactForm');
const messageField = document.getElementById('message');
const charCount = document.getElementById('charCount');

messageField.addEventListener('input', () => {
  const len = messageField.value.length;
  charCount.textContent = `${len} / 500`;
});

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');

  [name, email, message].forEach(f => f.classList.remove('invalid'));
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  formSuccess.textContent = '';

  if (name.value.trim() === '') {
    nameError.textContent = 'Please enter your name.';
    name.classList.add('invalid');
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    email.classList.add('invalid');
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    messageError.textContent = 'Message should be at least 10 characters.';
    message.classList.add('invalid');
    isValid = false;
  }

  if (!isValid) return;

  const btn = contactForm.querySelector('.btn-primary');
  const label = btn.querySelector('.btn-label');
  const loading = btn.querySelector('.btn-loading');
  label.hidden = true;
  loading.hidden = false;
  btn.disabled = true;

  setTimeout(() => {
    label.hidden = false;
    loading.hidden = true;
    btn.disabled = false;
    formSuccess.textContent = "Message sent! I'll get back to you soon 🎉";
    contactForm.reset();
    charCount.textContent = '0 / 500';
  }, 700);
});

/* ---------- Scroll-to-top button ---------- */
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- CV download button ---------- */
const cvBtn = document.querySelector('.btn-cv');
if (cvBtn) {
  cvBtn.addEventListener('click', (e) => {
    fetch(cvBtn.getAttribute('href'), { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          e.preventDefault();
          alert('CV file not found yet. Add "priyanka_roy_CV.pdf" to this project folder to enable the download.');
        }
      })
      .catch(() => {
        e.preventDefault();
        alert('CV file not found yet. Add "priyanka_roy_CV.pdf" to this project folder to enable the download.');
      });
  });
}
// ---------------------typing animation-----------------
const roles = [
    "💻 Full Stack Developer",
    "🚀 MERN Stack Developer",
    "⚛️ React Developer"
];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex++);
    } else {
        typingText.textContent = currentRole.substring(0, charIndex--);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length + 1) {
        speed = 1500; // Pause after typing
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 300;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();