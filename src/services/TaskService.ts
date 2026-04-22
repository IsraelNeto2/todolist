import type { Task } from "../models/Task.ts";
import TaskRepository from "../repositories/TaskRepository.ts";

const taskRepository = new TaskRepository();

class TaskService{

    constructor(){

    }

    getById(id: string): Task | undefined {
        return taskRepository.get().find(obj => obj.id === id);
    }

    get(status: string){
        const result = taskRepository.get();
        const tasks: Task[] = []; 

        result.map((obj)=> {
            if (obj.status === status) {
                tasks.push(obj);
            }
        })
        return tasks;
    }

    add(data: Task): Task{
        return taskRepository.add(data);
    }

    getIndexById(id_task: string): number{
        const result = taskRepository.get(); 

        let position:number = 99999;
        result.map((obj, index)=>{
            if(obj.id === id_task) {
                position = index;
            }
        });
        return position
    }

    update(data:Task, id_task: string){
        const position = this.getIndexById(id_task); 
        if(position !== 99999){
            return taskRepository.update(data, position);

        }
    }
    delete(id_task: string){
        const position = this.getIndexById(id_task); 
        if(position !== 99999){
            return taskRepository.delete(position);
        }else{};
    }
}

export default TaskService;