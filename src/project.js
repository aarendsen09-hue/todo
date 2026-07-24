export default class Project {
    constructor(name) {
        this.name = name;
        this.toDos = [];
    }

    addToDo(toDo) {
        this.toDos.push(toDo);
    }

    getToDos() {
        return this.toDos;
    }

    removeToDo(index) {
        this.toDos.splice(index, 1);
    }
}