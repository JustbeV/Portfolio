// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close mobile nav if open
        navLinks.classList.remove('open');
    });
});

// Scroll fade-in for sections
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('show');
        }
    });

    // Navbar scroll shadow
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function closeNavigation() {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
}

navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navLinks.classList.toggle('open', !isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
});

document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
        closeNavigation();
    }
});

// Footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Certificate modal handling
const certModal = document.getElementById('certModal');
const certDialog = certModal.querySelector('[role="dialog"]');
const certModalImg = document.getElementById('certModalImg');
const certTitle = document.getElementById('certTitle');
const certIssuer = document.getElementById('certIssuer');
const certVerify = document.getElementById('certVerify');
const certClose = certModal.querySelector('.cert-close');
let lastFocusedElement = null;

function closeCertificate() {
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

document.querySelectorAll('.cert-view').forEach((button) => {
    button.addEventListener('click', () => {
        const { title, issuer, date, img, link } = button.dataset;
        lastFocusedElement = button;
        certTitle.textContent = title || '';
        certIssuer.textContent = [issuer, date].filter(Boolean).join(' — ');
        certVerify.href = link || '#';
        certModalImg.style.display = img ? 'block' : 'none';
        certModalImg.alt = title ? `${title} certificate` : 'Certificate image';
        certModalImg.src = img || '';
        certModalImg.onerror = () => {
            certModalImg.style.display = 'none';
        };
        certModal.classList.add('open');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        certClose.focus();
    });
});

certClose.addEventListener('click', closeCertificate);

certModal.addEventListener('click', (event) => {
    if (event.target === certModal) {
        closeCertificate();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (certModal.classList.contains('open')) {
            closeCertificate();
        } else {
            closeNavigation();
        }
        return;
    }

    if (event.key !== 'Tab' || !certModal.classList.contains('open')) {
        return;
    }

    const focusableElements = certDialog.querySelectorAll('a[href], button:not([disabled])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
});

// Role rotator (hero)
(() => {
    const roles = ['Virtual Assistant', 'IT', 'Web Developer', 'Developer-in-Training'];
    const el = document.getElementById('role');
    if (!el) return;
    let i = 0;

    const withArticle = (role) => {
        const vowelSound = /^[aeiou]/i;
        const article = vowelSound.test(role) || /^IT\b/.test(role) ? 'an' : 'a';
        return `${article} ${role}`;
    };

    setInterval(() => {
        i = (i + 1) % roles.length;
        el.classList.remove('fade-in');
        void el.offsetWidth;
        el.textContent = withArticle(roles[i]);
        el.classList.add('fade-in');
    }, 2600);
})();