import { isPast, format, startOfDay } from "date-fns";

export function createDOM(currentProject) {
    const projectOpen = document.querySelector(".project_name");
    projectOpen.textContent = currentProject.name;
};

export function projectListUpdate(projectList, updateCurrentProject) {
    const allProjects = document.querySelector(".projectList");
    allProjects.replaceChildren();
    for (const project of projectList) {
        const name = document.createElement("h2");
        name.textContent = project.name;
        name.classList.add("list");
        name.addEventListener("click", () => {
            updateCurrentProject(project);
        })
        allProjects.appendChild(name);
    }
}

export function toDoListUpdate(toDos, onDelete) {
    const allToDos = document.querySelector(".current");
    allToDos.replaceChildren();

    toDos.forEach((td, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        const titleCheckDiv = document.createElement("div");
        const checker = document.createElement("button");
        checker.classList.add("check");
        checker.classList.add(index);
        checker.addEventListener("click", () => {
            onDelete(index);
        });
        titleCheckDiv.appendChild(checker);
        titleCheckDiv.classList.add("titleCheck");
        const task = document.createElement("p");
        task.classList.add("taskTitle");
        task.textContent = td.title;
        titleCheckDiv.appendChild(task);
        taskDiv.appendChild(titleCheckDiv);
        const description = document.createElement("p");
        description.classList.add("descr")
        if (td.descr != "") {
            description.textContent = td.descr;
        }
        taskDiv.appendChild(description);
        const dueDate = document.createElement("p");
        dueDate.classList.add("due");
        dueDate.textContent = format(td.dueDate, "MMMM d, yyyy");
        if (isPast(startOfDay(td.dueDate))) {
            dueDate.classList.add("overdue");
        }
        taskDiv.appendChild(dueDate);

        const priority = document.createElement("div");
        priority.classList.add("priority");
        switch (td.priority) {
            case "1":
                priority.classList.add("urgent");
                priority.textContent = "!!!"
                break;
            case "2":
                priority.classList.add("moderate");
                priority.textContent = "!!"
                break;
            default:
                priority.classList.add("normal");
                break;
        }
        taskDiv.appendChild(priority)
        allToDos.appendChild(taskDiv);
    });
}

