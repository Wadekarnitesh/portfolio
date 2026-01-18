gsap.registerPlugin(ScrollTrigger);

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });
}

// 1. DYNAMIC NAV HIGHLIGHTING
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// 2. CANVAS BACKGROUND
const canvas = document.getElementById("bg");
if (canvas) {
  const ctx = canvas.getContext("2d");

  // Handle Resize
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(143, 211, 255, 0.5)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// 3. 3D PROFILE TILT
const ring = document.querySelector(".profile-ring");
if (ring) {
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    ring.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}

// 4. SCROLL ANIMATIONS (GSAP ScrollTrigger)

// Hero Animations
gsap.from(".hero-left", { opacity: 0, x: -100, duration: 1 });
gsap.from(".hero-right > *", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  delay: 0.5,
});

// Common Fade Up for Sections
const fadeElements = document.querySelectorAll(
  ".card, .edu-card, .project-card, .skill-card, .cert-card, .blog-card, .contact-info, .contact-form",
);

fadeElements.forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%", // Animation starts when top of element hits 85% of viewport
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});
