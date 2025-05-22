// Cache selectors
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

// Toggle navbar background on scroll & highlight nav links
window.addEventListener('scroll', () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  activateNavLinkOnScroll();
});

// Highlight active nav link based on scroll position
function activateNavLinkOnScroll() {
  const scrollY = window.pageYOffset;
  let foundActive = false;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70; // Adjust this if navbar height changes
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
        foundActive = true;
      }
    }
  });

  // If no section matched (e.g., at top of page), highlight Home link
  if (!foundActive) {
    navLinks.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
  }
}

// Run once on page load
activateNavLinkOnScroll();


// Login/Register popup handlers
document.getElementById("show-login").onclick = function (e) {
  e.preventDefault();
  document.getElementById("loginForm").style.display = "flex";
  document.getElementById("registerForm").style.display = "none";
};

document.getElementById("show-register").onclick = function (e) {
  e.preventDefault();
  document.getElementById("registerForm").style.display = "flex";
  document.getElementById("loginForm").style.display = "none";
};

document.getElementById("goToRegister").onclick = function (e) {
  e.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "flex";
};

document.getElementById("goToLogin").onclick = function (e) {
  e.preventDefault();
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "flex";
};

document.getElementById("closeLogin").onclick = function () {
  document.getElementById("loginForm").style.display = "none";
};

document.getElementById("closeRegister").onclick = function () {
  document.getElementById("registerForm").style.display = "none";
};

// Dummy submit handling for forms
document.querySelector("#loginForm form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Signed in successfully!");
});

document.querySelector("#registerForm form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Account created successfully!");
});

// Typed Text Animation
const typedText = document.querySelector(".typed-text");
const textArray = ["Interior Designer", "Architect", " Decor Consultant "];
let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textIndex].length) {
    typedText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, 1000);
});

// ScrollReveal Animations
ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 1500,
  delay: 200
});

ScrollReveal().reveal('.hero-content', { origin: 'top' });
ScrollReveal().reveal('.section h2', { origin: 'left' });
ScrollReveal().reveal('.section p, .cards, .input-group, .cta-button', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.card', { origin: 'right', interval: 300 });
ScrollReveal().reveal('.about-section .hero-name', { origin: 'top', delay: 200 });
ScrollReveal().reveal('.about-section .typed-text', { origin: 'left', delay: 400 });
ScrollReveal().reveal('.about-section .about-description', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.about-section .cta-text', { origin: 'right', delay: 800 });
ScrollReveal().reveal('.about-description p', { origin: 'left', distance: '40px', delay: 200, interval: 200 });
ScrollReveal().reveal('.cta-text', { origin: 'bottom', scale: 0.85, delay: 1000 });

// IntersectionObserver for cards and animate-* classes
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay2, .animate-fade-in-delay3, .animate-fade-in-delay4, .animate-fade-in-delay5, .animate-fade-in-delay6, .card, .section-title')
  .forEach(el => {
    observer.observe(el);
  });
  ScrollReveal().reveal('.logo-img, .highlight, .auth-box', {
    delay: 300,
    scale: 0.85,
    opacity: 0,
    duration: 1000,
    easing: 'ease-out',
    reset: true
  });
  const box = document.querySelector('.wooden-box');
  const image = box.querySelector('img');
  
  box.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside box
    const y = e.clientY - rect.top;  // y position inside box
  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
  
    // Calculate rotation angles (-15deg to +15deg)
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * -15;
  
    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    image.style.boxShadow = `0 25px 40px rgba(0, 0, 0, 0.5)`;
    box.style.setProperty('--reflection-opacity', '0.7');
  });
  
  box.addEventListener('mouseleave', () => {
    image.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    image.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
    box.style.setProperty('--reflection-opacity', '0.5');
  });
    