// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ===== 3D BACKGROUND ANIMATION =====
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle system
let particles = [];
const particleCount = 150;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.4,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 60%)`
    });
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#050811');
    gradient.addColorStop(1, '#0a0f2c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });
    
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 - distance / 700})`;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateBackground);
}

animateBackground();

// ===== TYPING ANIMATION =====
const roles = ["IT Student", "Creative Developer", "Problem Solver", "Tech Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicElement = document.getElementById('dynamic-word');

function typeRole() {
    if (!dynamicElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        dynamicElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
        return;
    }
    
    const speed = isDeleting ? 40 : 100;
    setTimeout(typeRole, speed);
}

typeRole();

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show')) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('.nav-menu a, .btn, .scroll-hint').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        }
    });
});

// ===== ANIMATE SKILL BARS =====
const skillBars = document.querySelectorAll('.skill-progress');

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = width;
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    barObserver.observe(bar);
});

// ===== ACTIVE NAVIGATION =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Thank you! Mahasri will reach out to you soon.');
        contactForm.reset();
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

console.log("%c🚀 3D Portfolio Loaded!", "color: cyan; font-size: 16px; font-weight: bold;");
console.log("%c✨ Welcome to Mahasri's Creative Universe ✨", "color: magenta; font-size: 14px;");