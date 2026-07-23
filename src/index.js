import "./styles.css";
import toDo from "./toDo.js";
import "./form.css";
import project from "./project.js"; 
import { createDOM } from "./DOM.js"
import { projectListUpdate } from "./DOM.js";

const projects = [];
const defaultList = new project("default");
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
    console.log(task);
})

const projectCreater = document.querySelector(".newProject") 
projectCreater.addEventListener("click", (event) => {
    const title = prompt("What is the name of your list?");
    const list = new project(title);
    projects.push(list);
    projectListUpdate(projects);
})
