import "./styles.css";
import toDo from "./toDo.js";
import "./form.css";
import Project from "./project.js"; 
import { createDOM } from "./DOM.js"
import { projectListUpdate } from "./DOM.js";
import { toDoListUpdate } from "./DOM.js";
import { format } from "date-fns";
import { saveProjectInfo, loadProjects } from "./storage.js";

let projects;
let defaultList;
if (loadProjects() == null) {
    setUpProjects();
} else {
    organizeExistingProjects(loadProjects());
    projectListUpdate(projects, updateCurrentProject);
} 

let currentProject = projects[0];
createDOM(currentProject);

function organizeExistingProjects(rawProjects) {
    projects = rawProjects.map(raw => {
        const project = new Project(raw.name);

        raw.toDos.forEach(rawToDo => {
            project.addToDo(
                new toDo(
                    rawToDo.title,
                    rawToDo.descr,
                    rawToDo.dueDate,
                    rawToDo.priority
                )
            );
        });
        return project;
    });
} 

function setUpProjects() {
    projects = [];
    defaultList = new Project("Default List");
    projects.push(defaultList);
}

function updateCurrentProject(project) {
    currentProject = project;
    createDOM(currentProject);
    toDoListUpdate(currentProject.getToDos(), onDelete);
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const descr = formData.get("descr");
    let dueDate;
    const priority = formData.get("priority");

    if (formData.get("dueDate") == "") {
        const today = new Date();
        dueDate = today;
    } else {
        dueDate = formData.get("dueDate");
    }

    const task = new toDo(title, descr, dueDate, priority);
    currentProject.addToDo(task);
    toDoListUpdate(currentProject.getToDos(), onDelete);
    saveProjectInfo(projects);
})

const projectCreater = document.querySelector(".newProject");
projectCreater.addEventListener("click", (event) => {
    const title = prompt("What is the name of your list?");
    const list = new Project(title);
    projects.push(list);
    projectListUpdate(projects, updateCurrentProject);
    saveProjectInfo(projects);
})

function onDelete(index) {
    currentProject.removeToDo(index);
    toDoListUpdate(currentProject.getToDos(), onDelete);
    saveProjectInfo(projects);
}

