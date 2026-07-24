import "./styles.css";
import toDo from "./toDo.js";
import "./form.css";
import project from "./project.js"; 
import { createDOM } from "./DOM.js"
import { projectListUpdate } from "./DOM.js";
import { toDoListUpdate } from "./DOM.js";

const projects = [];
const defaultList = new project("Default List");
projects.push(defaultList);
let currentProject = defaultList;
createDOM(currentProject);

const projectList = document.querySelectorAll(".list");
projectList.forEach(list => { 
    list.addEventListener("click", () => {
        currentProject = list;
        createDOM(currentProject);
    })
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const descr = formData.get("descr");
    // const dueDate = formData.get("dueDate");
    const priority = formData.get("priority")

    const task = new toDo(title, descr, priority);
    currentProject.addToDo(task);
    toDoListUpdate(currentProject.getToDos(), onDelete);
})

const projectCreater = document.querySelector(".newProject");
projectCreater.addEventListener("click", (event) => {
    const title = prompt("What is the name of your list?");
    const list = new project(title);
    projects.push(list);
    projectListUpdate(projects);
})

function onDelete(index) {
    currentProject.removeToDo(index);
    toDoListUpdate(currentProject.getToDos(), onDelete);
}

