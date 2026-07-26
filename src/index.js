import "./styles.css";
import toDo from "./toDo.js";
import "./form.css";
import project from "./project.js"; 
import { createDOM } from "./DOM.js"
import { projectListUpdate } from "./DOM.js";
import { toDoListUpdate } from "./DOM.js";
import { format } from "date-fns";

const projects = [];
const defaultList = new project("Default List");
projects.push(defaultList);
let currentProject = defaultList;
createDOM(currentProject);

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
})

const projectCreater = document.querySelector(".newProject");
projectCreater.addEventListener("click", (event) => {
    const title = prompt("What is the name of your list?");
    const list = new project(title);
    projects.push(list);
    projectListUpdate(projects, updateCurrentProject);
})

function onDelete(index) {
    currentProject.removeToDo(index);
    toDoListUpdate(currentProject.getToDos(), onDelete);
}
