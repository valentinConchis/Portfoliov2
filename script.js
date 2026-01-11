const buttons = document.querySelectorAll(
    '.competences, .projets, .cv, .contact'
);

buttons.forEach(btn => {
    btn.classList.add('nav-btn');

    btn.addEventListener('mouseenter', e => {
        const rect = btn.getBoundingClientRect();

        // Nettoyage
        const oldRipple = btn.querySelector('.ripple');
        if (oldRipple) oldRipple.remove();

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        btn.appendChild(ripple);

        // force repaint
        ripple.getBoundingClientRect();
        btn.classList.add('filled');
    });

    btn.addEventListener('mouseleave', () => {
        const ripple = btn.querySelector('.ripple');
        if (!ripple) return;

        btn.classList.remove('filled');
        btn.classList.add('remove');

        ripple.addEventListener('transitionend', () => {
            ripple.remove();
            btn.classList.remove('remove');
        }, { once: true });
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("overlay");
    const openBtn = document.getElementById("openModal");

    openBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
    });

    // Fermer en cliquant en dehors de la popup
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

});

const competences = document.querySelectorAll(".competence-global");
const container = document.querySelector(".competences-container");

competences.forEach(competence => {
    competence.addEventListener("click", () => {
        competence.classList.toggle("active");
        container.classList.toggle("hide-links");
    });
});

const track = document.querySelector('.projets-list');

let offset = 0;
const speed = 0.4;

function animate() {
    offset -= speed;
    track.style.transform = `translateX(${offset}px)`;

    const first = track.firstElementChild;
    const style = getComputedStyle(first);
    const gap =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight);

    const width = first.offsetWidth + gap;

    if (Math.abs(offset) >= width) {
        offset += width;
        track.appendChild(first);
    }

    requestAnimationFrame(animate);
}

animate();

