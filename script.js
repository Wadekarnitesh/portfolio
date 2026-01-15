/* GSAP – SAME EFFECT EVERYWHERE */
if (typeof gsap !== "undefined") {
    gsap.from(".navbar", {
        y: -60,
        opacity: 0,
        duration: 1
    });

    gsap.from(".hero-right > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.4
    });

    gsap.from(".card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3
    });
}

/* 3D PROFILE TILT */
const ring = document.querySelector(".profile-ring");
if (ring) {
    document.addEventListener("mousemove", e => {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        ring.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
}

/* PARTICLE BACKGROUND */
const canvas = document.getElementById("bg");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const particles = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
    }));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "#8fd3ff";
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
const cards = document.querySelectorAll(".cert-card");

cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(() => {
        card.style.transition = "0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, i * 200);
});
