import { format, parseISO } from "date-fns";

export default class toDo {
    constructor(title, descr = "", dueDate, priority = 1) {
        this.title = title;
        this.descr = descr;
        this.dueDate = dueDate instanceof Date ? dueDate : parseISO(dueDate);
        this.priority = priority;
    }
}