const projects = [
    {
        id: 1,
        title: "Página Personal con HTML y CSS",
        student: "Carlos Quispe",
        grade: "3sec",
        tech: ["HTML", "CSS"],
        tagClass: ["tag-html"],
        desc: "Sitio web interactivo sobre historia creado con estructuras HTML5 y estilos CSS grid.",
        url: "/estudiantes/3sec/carlos-quispe/",
        featured: true,
        image: "https://via.placeholder.com/400x200/1e293b/38bdf8?text=Proyecto+HTML5"
    },
    {
        id: 2,
        title: "Calculadora de Promedios en Python",
        student: "María Apaza",
        grade: "4sec",
        tech: ["Python"],
        tagClass: ["tag-python"],
        desc: "Algoritmo en Python para calcular notas trimestrales utilizando estructuras condicionales.",
        url: "/estudiantes/4sec/maria-apaza/codigo.py",
        featured: true,
        image: "https://via.placeholder.com/400x200/1e293b/3776ab?text=Script+Python"
    },
    {
        id: 3,
        title: "App Asistente de Tareas",
        student: "Aarón Yana",
        grade: "5sec",
        tech: ["App Inventor"],
        tagClass: ["tag-appinventor"],
        desc: "Aplicación móvil Android para organizar horarios escolares con alertas de voz.",
        url: "/estudiantes/5sec/aaron-yana/",
        featured: true,
        image: "https://via.placeholder.com/400x200/1e293b/a4c639?text=App+Android"
    },
    {
        id: 4,
        title: "Juego de Trivia Interactiva",
        student: "Rodrigo Mamani",
        grade: "3sec",
        tech: ["HTML", "JavaScript"],
        tagClass: ["tag-html", "tag-js"],
        desc: "Juego de preguntas sobre ciencia de la computación programado en JS nativo.",
        url: "/estudiantes/3sec/rodrigo-mamani/",
        featured: false,
        image: "https://via.placeholder.com/400x200/1e293b/f7df1e?text=Trivia+JS"
    }
];

function renderProjects(data) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<p style="color: var(--text-secondary); grid-column: 1/-1; text-align: center; padding: 2rem;">Aún no hay proyectos publicados para este grado.</p>`;
        return;
    }

    data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${project.image}" alt="${project.title}">
                ${project.featured ? '<span class="badge-featured">Destacado</span>' : ''}
            </div>
            <div class="card-body">
                <div class="student-info">${project.student} • ${project.grade.toUpperCase()}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.desc}</p>
                <div class="tech-tags">
                    ${project.tech.map((technology, index) => `<span class="tag ${project.tagClass[index] || ''}">${technology}</span>`).join('')}
                </div>
                <a href="${project.url}" target="_blank" class="btn-view">Ver Proyecto</a>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterGrade(grade, selectedButton) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => button.classList.remove('active'));
    selectedButton.classList.add('active');

    const title = document.getElementById('gallery-title');

    if (grade === 'all') {
        title.innerHTML = 'TRABAJOS <span>DESTACADOS</span>';
        renderProjects(projects.filter(project => project.featured));
        return;
    }

    const gradeNames = {
        '1sec': '1° de Secundaria',
        '2sec': '2° de Secundaria',
        '3sec': '3° de Secundaria',
        '4sec': '4° de Secundaria',
        '5sec': '5° de Secundaria'
    };

    title.innerHTML = `PROYECTOS <span>${gradeNames[grade].toUpperCase()}</span>`;
    renderProjects(projects.filter(project => project.grade === grade));
}

renderProjects(projects.filter(project => project.featured));

const themeToggle = document.getElementById('theme-toggle');
const themeMenu = document.getElementById('theme-menu');
const themeOptions = document.querySelectorAll('.theme-option');

function getSavedTheme() {
    try {
        return localStorage.getItem('pentagono-theme') || 'kali';
    } catch (error) {
        console.warn('No se pudo leer el tema guardado; se usará Kali Linux.', error);
        return 'kali';
    }
}

function setTheme(themeName) {
    const availableThemes = [...themeOptions].map(option => option.dataset.theme);
    if (!availableThemes.includes(themeName)) {
        themeName = 'kali';
    }

    document.documentElement.dataset.theme = themeName;
    try {
        localStorage.setItem('pentagono-theme', themeName);
    } catch (error) {
        console.warn('El tema cambiará solo durante esta visita.', error);
    }

    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === themeName);
    });
}

themeToggle.addEventListener('click', () => {
    const isOpen = themeToggle.getAttribute('aria-expanded') === 'true';
    themeToggle.setAttribute('aria-expanded', String(!isOpen));
    themeMenu.hidden = isOpen;
});

themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        setTheme(option.dataset.theme);
        themeToggle.setAttribute('aria-expanded', 'false');
        themeMenu.hidden = true;
    });
});

document.addEventListener('click', event => {
    if (!event.target.closest('.theme-picker')) {
        themeToggle.setAttribute('aria-expanded', 'false');
        themeMenu.hidden = true;
    }
});

setTheme(getSavedTheme());

const matrixCanvas = document.getElementById('matrix-canvas');
const matrixContext = matrixCanvas.getContext('2d');
const matrixCharacters = '01アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ';
let matrixColumns = [];
let matrixAnimationId;

function resizeMatrix() {
    const scale = window.devicePixelRatio || 1;
    matrixCanvas.width = window.innerWidth * scale;
    matrixCanvas.height = window.innerHeight * scale;
    matrixContext.setTransform(scale, 0, 0, scale, 0, 0);

    const columnCount = Math.ceil(window.innerWidth / 18);
    matrixColumns = Array.from({ length: columnCount }, () => Math.random() * window.innerHeight / 18);
}

function drawMatrix() {
    const computedStyles = getComputedStyle(document.documentElement);
    const matrixColor = computedStyles.getPropertyValue('--matrix-color').trim() || '#00e5ff';
    const width = window.innerWidth;
    const height = window.innerHeight;

    matrixContext.fillStyle = 'rgba(3, 6, 14, 0.08)';
    matrixContext.fillRect(0, 0, width, height);
    matrixContext.fillStyle = matrixColor;
    matrixContext.font = '14px monospace';

    matrixColumns.forEach((y, index) => {
        const character = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        const x = index * 18;
        matrixContext.fillText(character, x, y * 18);

        if (y * 18 > height && Math.random() > 0.975) {
            matrixColumns[index] = 0;
        } else {
            matrixColumns[index] += 0.55;
        }
    });

    matrixAnimationId = requestAnimationFrame(drawMatrix);
}

function startMatrix() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    resizeMatrix();
    cancelAnimationFrame(matrixAnimationId);
    drawMatrix();
}

window.addEventListener('resize', resizeMatrix);
startMatrix();
