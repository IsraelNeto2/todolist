import type { Task } from "../models/Task.ts";

class TaskRepository{

    private tasks: Task[];
    
    constructor(){
        this.tasks = [];
    }

    get(): Task[]{
        return this.tasks;
        

    }

    add(data: Task){
        this.tasks.push(data);
        return data;


    }

    update(data: Task, position: number){
        this.tasks[position] = data;
    }

    delete(position: number){
        delete this.tasks[position];
        return position;
    }
}

export default TaskRepository;