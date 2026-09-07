/**
 * Nova Showcase - Interactive Experience Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemePicker();
  initMouseGlow();
  initPlaygroundControls();
  initStatsCounter();
  initMockupAnimation();
  initNewsletter();
  initMobileMenu();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Accent Switcher
   ========================================================================== */
function initThemePicker() {
  const themeDots = document.querySelectorAll('.theme-dot');
  
  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const selectedTheme = dot.getAttribute('data-color');
      
      themeDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      if (selectedTheme === 'violet') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', selectedTheme);
      }
    });
  });
}

/* ==========================================================================
   2. Bento Card Subtle Mouse-Tracking Glow
   ========================================================================== */
function initMouseGlow() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   3. Interactive Laboratory Playground Controls
   ========================================================================== */
function initPlaygroundControls() {
  const element = document.getElementById('dynamic-element');
  const scaleSlider = document.getElementById('scale-slider');
  const rotationSlider = document.getElementById('rotation-slider');
  const radiusSlider = document.getElementById('radius-slider');
  const scaleValue = document.getElementById('scale-value');
  const rotationValue = document.getElementById('rotation-value');
  const radiusValue = document.getElementById('radius-value');
  const tabButtons = document.querySelectorAll('#preview-tabs .tab-btn');

  if (!element || !scaleSlider || !rotationSlider || !radiusSlider) return;

  function updateTransform() {
    const scale = scaleSlider.value;
    const rotation = rotationSlider.value;
    const radius = radiusSlider.value;

    scaleValue.textContent = `${scale}x`;
    rotationValue.innerHTML = `${rotation}&deg;`;
    radiusValue.textContent = `${radius}px`;

    element.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    element.style.borderRadius = `${radius}px`;
  }

  scaleSlider.addEventListener('input', updateTransform);
  rotationSlider.addEventListener('input', updateTransform);
  radiusSlider.addEventListener('input', updateTransform);

  // Mode Preset Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      if (mode === 'orb') {
        radiusSlider.value = 60;
        rotationSlider.value = 45;
        scaleSlider.value = 1.0;
      } else if (mode === 'prism') {
        radiusSlider.value = 12;
        rotationSlider.value = 25;
        scaleSlider.value = 1.1;
      } else if (mode === 'shield') {
        radiusSlider.value = 32;
        rotationSlider.value = 0;
        scaleSlider.value = 1.2;
      }
      updateTransform();
    });
  });
}

/* ==========================================================================
   4. Intersection Observer Animated Number Counter
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllCounters(statNumbers);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

function animateAllCounters(elements) {
  elements.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quint
      const easeOut = 1 - Math.pow(1 - progress, 5);
      const currentVal = target * easeOut;

      if (isDecimal) {
        el.textContent = currentVal.toFixed(2) + suffix;
      } else {
        el.textContent = Math.floor(currentVal) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  });
}

/* ==========================================================================
   5. Dynamic Hero Chart Simulation
   ========================================================================== */
function initMockupAnimation() {
  const bars = document.querySelectorAll('#chart-container .chart-bar');
  if (!bars.length) return;

  setInterval(() => {
    bars.forEach(bar => {
      // Gentle fluctuation between 35% and 100%
      const newHeight = Math.floor(Math.random() * 65) + 35;
      bar.style.height = `${newHeight}%`;
    });
  }, 2400);
}

/* ==========================================================================
   6. Interactive Newsletter Form
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('subscribe-submit-btn');

  if (!form || !input || !feedback || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Verifying...';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get Started Free';
      feedback.textContent = `Welcome aboard! Access invitation dispatched to ${email}`;
      feedback.classList.add('success');
      input.value = '';

      setTimeout(() => {
        feedback.textContent = '';
      }, 5000);
    }, 900);
  });
}

/* ==========================================================================
   7. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close when clicking on links
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   8. Scrollspy for Active Link Highlight
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
