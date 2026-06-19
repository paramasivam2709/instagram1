// ============================================
// STACKLY - Animation Utilities
// Advanced scroll animations & effects
// ============================================

const StacklyAnimations = {
  // Initialize all animations
  init() {
    this.initScrollReveal();
    this.initParallax();
    this.initNavbarScroll();
    this.initCounterAnimation();
    this.initParticles();
    this.initTypingEffect();
    this.initMagneticButtons();
  },

  // Scroll reveal - elements animate when scrolled into view
  initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add stagger delay if specified
          const delay = entry.target.dataset.delay;
          if (delay) {
            entry.target.style.transitionDelay = `${delay}s`;
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  },

  // Parallax effect on scroll
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  },

  // Navbar background on scroll
  initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  },

  // Counter animation - numbers count up
  initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  },

  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration) || 2000;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);
      element.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  },

  // Floating particles in hero
  initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${10 + Math.random() * 20}s`;
      particle.style.width = `${2 + Math.random() * 4}px`;
      particle.style.height = particle.style.width;
      particle.style.opacity = `${0.2 + Math.random() * 0.4}`;

      // Random color between accent and secondary
      const colors = ['#F43F5E', '#3B82F6', '#FB7185', '#60A5FA'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];

      container.appendChild(particle);
    }
  },

  // Typing effect for text
  initTypingEffect() {
    const elements = document.querySelectorAll('[data-typing]');
    elements.forEach(el => {
      const text = el.dataset.typing;
      const speed = parseInt(el.dataset.typingSpeed) || 100;
      let i = 0;
      el.textContent = '';

      const type = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      };

      // Start typing when element is visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(type, 500);
          observer.disconnect();
        }
      });
      observer.observe(el);
    });
  },

  // Magnetic button effect
  initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  },

  // Smooth scroll to element
  smoothScroll(target, offset = 80) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  },

  // Add animation class with delay
  animate(element, animationClass, delay = 0) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    setTimeout(() => {
      el.classList.add(animationClass);
    }, delay);
  },

  // Stagger animation for multiple elements
  stagger(selector, animationClass, baseDelay = 0, staggerDelay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add(animationClass);
      }, baseDelay + (i * staggerDelay));
    });
  },

  // GSAP-like timeline (simplified)
  timeline() {
    const animations = [];
    let currentTime = 0;

    return {
      to(selector, props, duration = 0.6) {
        animations.push({ selector, props, duration, delay: currentTime });
        currentTime += duration * 1000;
        return this;
      },
      wait(ms) {
        currentTime += ms;
        return this;
      },
      play() {
        animations.forEach(anim => {
          setTimeout(() => {
            const elements = document.querySelectorAll(anim.selector);
            elements.forEach(el => {
              Object.assign(el.style, {
                transition: `all ${anim.duration}s ease`,
                ...anim.props
              });
            });
          }, anim.delay);
        });
      }
    };
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  window.StacklyAnimations = StacklyAnimations;
  document.addEventListener('DOMContentLoaded', () => {
    StacklyAnimations.init();
  });
}
