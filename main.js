/**
 * MAIN JAVASCRIPT - PERSONAL PORTFOLIO
 * Core logic: Navbar scroll, Scrollspy, Theme Switcher,
 * Mobile Menu, Back to top, Reveal animations, Typing effect, & Toast.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initScrollspy();
  initBackToTop();
  initScrollReveal();
  initTypingEffect();
  initCopyButtons();
});

/* -------------------------------------------------------------
   1. NAVBAR STICKY & MOBILE DRAWER
   ------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      // Toggle hamburger / close icon
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      }
    });
  }
}

/* -------------------------------------------------------------
   2. THEME SWITCHER (NAVY DARK / LIGHT WITH LOCALSTORAGE)
   ------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  // Retrieve saved theme or default to light/system preference
  const savedTheme = localStorage.getItem('portfolio_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(newTheme === 'dark' ? 'Mode Navy Dark diaktifkan' : 'Mode Light diaktifkan', 'info');
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeToggle.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
      themeToggle.setAttribute('title', 'Beralih ke Mode Terang');
    } else {
      themeToggle.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
      themeToggle.setAttribute('title', 'Beralih ke Mode Gelap');
    }
  }
}

/* -------------------------------------------------------------
   3. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT ON SCROLL)
   ------------------------------------------------------------- */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* -------------------------------------------------------------
   4. BACK TO TOP BUTTON
   ------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------------------------------------------------
   5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!('IntersectionObserver' in window)) {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Animate child progress bars if this is the skills section
        if (entry.target.classList.contains('skill-category-card')) {
          const bars = entry.target.querySelectorAll('.progress-fill');
          bars.forEach(bar => {
            const pct = bar.getAttribute('data-percentage');
            if (pct) bar.style.width = pct;
          });
        }
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------
   6. TYPING EFFECT FOR HERO TITLE
   ------------------------------------------------------------- */
function initTypingEffect() {
  const targetElement = document.getElementById('typedProfession');
  if (!targetElement) return;

  const roles = [
    'Informatics, Administration & Field Operations',
    'Logistics Administrator & Inventory Specialist',
    'Field Operations & Project Supervision',
    'Information Technology & System Administration'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeLoop() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      targetElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      targetElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at end of text
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

/* -------------------------------------------------------------
   7. COPY TO CLIPBOARD BUTTONS
   ------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Tersalin ke clipboard: ${textToCopy}`, 'success');
      }).catch(() => {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(`Tersalin: ${textToCopy}`, 'success');
      });
    });
  });
}

/* -------------------------------------------------------------
   8. TOAST NOTIFICATION UTILITY
   ------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success'
    ? `<svg width="20" height="20" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
    : `<svg width="20" height="20" fill="none" stroke="#38bdf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove after 3.8s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }, 3800);
}

// Export for usage across modules
window.showToast = showToast;
