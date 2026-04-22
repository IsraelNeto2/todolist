import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import TaskController from "./src/controllers/TaskController.ts";
import multer from "multer";
import storage from "./src/utils/storage.ts";

const taskController = new TaskController();

const router = Router();

const upload = multer({storage})

const authMiddleware = (req: Request, res: Response, netx: NextFunction) =>{
    if(req.headers.authorization){
        next();
    }else{res.status(401).json({error: "Usuario nao autenticado"})}
}

router.get('/task', taskController.get);
router.get('/task/:id', taskController.getById);
router.post('/task',upload.single("file"), taskController.add);
router.put('/task', taskController.update);
router.delete('/task/:id', taskController.delete);

// router.post('/teste/:id', taskController.teste);

export default router;
function next() {
    throw new Error("Function not implemented.");
}

