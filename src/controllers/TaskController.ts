import type { Request, Response } from "express";
import {v4 as uuidv4} from "uuid";
import TaskService from "../services/TaskService.ts";
import { GetSchema, GetByIdSchema, AddSchema, UpdateSchema, DeleteSchema } from "../schemas/TaskSchema.ts";



const taskService = new TaskService();

class TaskController {

    constructor(){

    }
   async getById(req: Request, res: Response){
        const { id } = req.params;
        try {
            await GetByIdSchema.validate(req.params);
            const result = taskService.getById(id);
            res.status(200).json(result);

        } catch (error) {
            res.status(401).json({ error: error });
        }
    }

   async get(req: Request, res: Response){
        try {
            const {status} = req.query;
            await GetSchema.validate(req.query);
            const result = taskService.get(status as string);
            res.status(200).json(result);


        } catch (error) {
            res.status(400).json({ error: error});
        }
    }

   async add(req: Request, res: Response){
        // console.log(req.file);
        // return;
        try {
            await AddSchema.validate(req.body);
            const id = uuidv4();
            req.body.id = id;

            const result = taskService.add(req.body);
            res.status(201).json(result);
            
        } catch (error) {
            res.status(400).json({ error: error});   
        }
            
    }

   async update(req: Request, res: Response) {

        try {
            const {id} = req.body;

            console.log(id);

            await UpdateSchema.validate(req.body);
            const result = taskService.update(req.body, id);
            res.status(200).json(result);


            console.log(`ID DA TAREFA:${id}\n`);
        } catch (error) {res.status(400).json(error);
            
        }

    }


  async delete(req: Request, res: Response){
        try {
            const {id} = req.params;
            await DeleteSchema.validate(id);
            const result = taskService.delete(id);
            res.status(200).json(result);
            
        } catch (error) {
            res.status(400).json({error: "ID is required"})};
        };  
    }

   


export default TaskController;