import { Router } from "express";
import {
  getToDos,
  insertToDo,
  getToDo,
  updateToDo,
  deleteToDo,
} from "../controllers/todo-controller.js";
const router = Router();

router.get("/todos", getToDos);
router.post("/todos", insertToDo);
router.get("/todos/:id", getToDo);
router.patch("/todos/:id", updateToDo);
router.delete("/todos/:id", deleteToDo);

export default router;
