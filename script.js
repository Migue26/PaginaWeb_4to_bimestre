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
