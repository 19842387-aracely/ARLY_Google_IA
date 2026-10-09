
document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const themeButton = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("arly-theme");

    if (savedTheme) root.setAttribute("data-theme", savedTheme);

    function updateThemeButton() {
        if (!themeButton) return;
        const dark = root.getAttribute("data-theme") === "dark";
        themeButton.textContent = dark ? "☀ Claro" : "☾ Oscuro";
        themeButton.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    }

    if (themeButton) {
        updateThemeButton();
        themeButton.addEventListener("click", () => {
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("arly-theme", next);
            updateThemeButton();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
});

function bienvenida() {
    alert("¡Gracias por visitar ARLY!");
}

function revisarCuestionario() {
    const form = document.getElementById("quizForm");
    const result = document.getElementById("quizResult");
    if (!form || !result) return;

    const answers = {
        q1: "gemini",
        q2: "notebooklm",
        q3: "aistudio",
        q4: "stitch",
        q5: "opal"
    };

    let score = 0;
    Object.keys(answers).forEach(q => {
        const selected = form.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) score++;
    });

    result.innerHTML = `<strong>Resultado:</strong> ${score}/5 respuestas correctas. ${
        score === 5 ? "¡Excelente trabajo!" :
        score >= 3 ? "Vas muy bien; revisa las tarjetas donde fallaste." :
        "No pasa nada: vuelve a leer las tarjetas y prueba otra vez."
    }`;
    result.classList.remove("d-none");
}
