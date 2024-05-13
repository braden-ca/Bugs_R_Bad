import express from "express";
import taskController from "../Controllers/taskController.mjs";
import Task from '../Models/schema.mjs';

const router = express.Router();

router.post("/tasks", taskController.createTask);

router.delete('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
  
    try {
      const taskDeleted = await taskController.deleteTaskId(taskId);
      if (taskDeleted) {
        res.status(200).send({ message: 'Task deleted successfully.' });
      } else {
        res.status(404).send({ message: 'Task not found or already deleted.' });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send({ message: 'Error deleting task.' });
    }
  });
  
  // PUT request to edit a task by ID
  router.put('/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { task, description, date, priority, status } = req.body;
  
    try {
      const updatedTask = await taskController.editTaskId(taskId, { task, description, date, priority, status });
      if (updatedTask) {
        res.status(200).send(updatedTask);
      } else {
        res.status(404).send({ message: 'Task not found.' });
      }
    } catch (error) {
      console.error('Error editing task:', error);
      res.status(500).send({ message: 'Error editing task.' });
    }
  });

//  GET request to fetch and display tasks
// router.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find(); 
//     res.status(200).json(tasks);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     res.status(500).send("Error fetching tasks");
//   }
// });

//  USED FOR TESTING FRONTEND
router.get("/tasks", async (req, res) => {
  const tasks = [
    { name: "Task 1", description: "Description for Task 1", date: "05-09-2024", priority: 1 },
    { name: "Task 2", description: "Description for Task 2", date: "05-10-2024", priority: 2 },
    { name: "Task 3", description: "Description for Task 3", date: "05-12-2024", priority: 3 },
    { name: "Task 4", description: "Description for Task 4", date: "06-01-2024", priority: 1 },
    { name: "Task 5", description: "Description for Task 5", date: "05-20-2024", priority: 2 },
    { name: "Task 6", description: "Description for Task 6", date: "05-25-2024", priority: 3 },
    { name: "Task 7", description: "Description for Task 7", date: "05-18-2024", priority: 1 }
  ]
  res.status(200).json(tasks);

});

export default router;

/*
import { Router } from "express";
const router = Router();

import * as controller from '../controllers/controller.js';

router.route('/task')
.get(controller.getTask) 
.post(controller.insertTask) 
.delete(controller.dropTask) 

router.route('/result')
    .get(controller.getTask)
    .post(controller.storeTask)
    .delete(controller.dropTask)

export default router;
*/
