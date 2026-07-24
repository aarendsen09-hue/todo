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

export function toDoListUpdate(toDos, onDelete) {
    const allToDos = document.querySelector(".current");
    allToDos.replaceChildren();

    toDos.forEach((td, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        const checker = document.createElement("button");
        checker.classList.add("check");
        checker.classList.add(index);
        checker.addEventListener("click", () => {
            onDelete(index);
        });
        taskDiv.appendChild(checker);
        const task = document.createElement("p");
        task.textContent = td.title;
        taskDiv.appendChild(task);
        allToDos.appendChild(taskDiv);
    });
}

