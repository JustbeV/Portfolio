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

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Certificate modal handling
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certTitle = document.getElementById('certTitle');
const certIssuer = document.getElementById('certIssuer');
const certVerify = document.getElementById('certVerify');

document.querySelectorAll('.cert-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const d = e.currentTarget.dataset;
        certModalImg.src = d.img || '';
        certTitle.textContent = d.title || '';
        certIssuer.textContent = (d.issuer || '') + (d.date ? ' — ' + d.date : '');
        if (certVerify) {
            certVerify.href = d.link || '#';
        }
        certModal.classList.add('open');
        certModal.setAttribute('aria-hidden', 'false');
    });
});

document.querySelectorAll('.cert-close').forEach(btn => {
    btn.addEventListener('click', () => {
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
    });
});

certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('open')) {
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
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