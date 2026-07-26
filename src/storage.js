export function saveProjectInfo(projects) {
    console.log("saving...", projects);
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
    if (localStorage.getItem("projects") != null) {
        const savedProjects = localStorage.getItem("projects");
        const projects = JSON.parse(savedProjects);
        return projects;
    } else {
        return null;
    }
}
