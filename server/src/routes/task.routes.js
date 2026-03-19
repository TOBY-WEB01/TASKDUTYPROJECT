import { Router } from "express";
import { createTask, deleteTask, getSingleTask, getTask, updateTask } from "../controller/task.controller.js";
import { validateTaskSchema } from "../utils/formValidation.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateFormData } from "../middleware/validateFormData.js";

const router = Router();

router.post(
  "/create",
  authenticate,
  validateFormData(validateTaskSchema),
  createTask,
);

router.get("/get", authenticate, getTask);

router.delete("/delete/:id", authenticate, deleteTask);




router.get("/single/:id", authenticate, getSingleTask);


router.patch("/update/:id", authenticate, updateTask);



export default router;
