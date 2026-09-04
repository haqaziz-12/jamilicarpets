// ===== Mobile Menu =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger) {
  burger.addEventListener('click', () => navLinks.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(31,42,68,0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
      header.style.background = 'rgba(31,42,68,0.97)';
      header.style.boxShadow = 'none';
    }
  });
}

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.style.display = 'none';
    contactSuccess.classList.add('show');
  });
}

// ===== Wholesale Form =====
const wholesaleForm = document.getElementById('wholesaleForm');
const wholesaleSuccess = document.getElementById('wholesaleSuccess');
if (wholesaleForm) {
  wholesaleForm.addEventListener('submit', e => {
    e.preventDefault();
    wholesaleForm.style.display = 'none';
    wholesaleSuccess.classList.add('show');
  });
}

// ===== Custom Order Form =====
const customOrderForm = document.getElementById('customOrderForm');
const customSuccess = document.getElementById('customSuccess');
if (customOrderForm) {
  customOrderForm.addEventListener('submit', e => {
    e.preventDefault();
    customOrderForm.style.display = 'none';
    customSuccess.classList.add('show');
  });
}

// ===== Lazy Load Images =====
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}
