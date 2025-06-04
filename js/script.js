// DOM Elements
const navbarToggler = document.getElementById('navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navbarLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const progressBars = document.querySelectorAll('.progress-bar');

// Navbar Toggle
navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('showNav');
    navbarToggler.setAttribute('aria-expanded', 
        navbarToggler.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('showNav');
        navbarToggler.setAttribute('aria-expanded', 'false');
    }
});

// Smooth scroll for navigation links
navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Close mobile menu
        navbarCollapse.classList.remove('showNav');
        navbarToggler.setAttribute('aria-expanded', 'false');
        
        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active link
        navbarLinks.forEach(link => link.parentElement.classList.remove('nav-active'));
        link.parentElement.classList.add('nav-active');
    });
});

// Intersection Observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate progress bars when skills section is in view
            if (entry.target.id === 'skills') {
                progressBars.forEach(bar => {
                    const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                    bar.style.width = width;
                });
            }
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => sectionObserver.observe(section));

// Typewriter effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize TypeWriter
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typewrite');
    const words = JSON.parse(txtElement.getAttribute('data-type'));
    const wait = txtElement.getAttribute('data-period');
    new TypeWriter(txtElement, words, wait);
}

// Scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = 'scroll-top';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Add hover effect to project cards
document.querySelectorAll('.projects .item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Add animation to skill bars
const animateSkillBars = () => {
    progressBars.forEach(bar => {
        const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
};

// Initialize animations when skills section is in view
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

skillsObserver.observe(skillsSection);