export function createDOM(currentProject) {
    const projectOpen = document.querySelector(".project_name");
    projectOpen.textContent = currentProject.name;
};

export function projectListUpdate(projectList) {
    const allProjects = document.querySelector(".projectList");
    allProjects.replaceChildren();
    for (const project of projectList) {
        const name = document.createElement("h2");
        name.textContent = project.name;
        name.classList.add("list");
        allProjects.appendChild(name);
    }
}

