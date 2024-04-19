import express from "express";
import taskController from "../Controllers/taskController.mjs";

const router = express.Router();

router.post("/tasks", taskController.createTask);

export default router;
