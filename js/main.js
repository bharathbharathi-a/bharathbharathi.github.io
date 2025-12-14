// nav toggle + simple typed text + IntersectionObserver reveal
document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.style.display = open ? '' : 'flex';
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        nav.style.display = '';
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.style.display = '';
      }
    });
  }

  // Simple typing effect (vanilla)
  function typeText(el, words, speed = 90, pause = 1200) {
    if (!el || !words || words.length === 0) return;
    let w = 0, i = 0, forward = true;
    function step() {
      const word = words[w];
      if (forward) {
        i++;
        el.textContent = word.slice(0, i);
        if (i === word.length) { forward = false; setTimeout(step, pause); return; }
      } else {
        i--;
        el.textContent = word.slice(0, i);
        if (i === 0) { forward = true; w = (w + 1) % words.length; }
      }
      setTimeout(step, speed);
    }
    step();
  }
  const typedEl = document.querySelector('.hero .typed');
  if (typedEl) typeText(typedEl, ['Front-end Developer', 'UI/UX Designer', 'Open Source Enthusiast']);

  // IntersectionObserver for reveal animations
  const observerOptions = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.reveal, .fade-in').forEach(el => observer.observe(el));
});
