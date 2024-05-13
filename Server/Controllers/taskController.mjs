/*import Task from "../Models/schema.mjs";
import task from '../database/data.mjs'


const taskController = {
  async createTask(req, res) {
    try {
      const { task, description, date, priority, status } = req.body;

      const newTask = new Task({
        task,
        description,
        date: date || Date.now(),
        priority: priority || 1,
        status: status || false,
      });

      await newTask.save();

      res.status(201).send(newTask); 
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).send("Error creating task");
    }
  },
};

const delTaskController = {

  async insertTaskId(req,res){
    const { taskId } = req.params;
    const newData = req.body; 
    try {
        console.log(req.body);
          Task.insertMany({newData});
         res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ "error": "Invalid body" });
    }
  }

  async deleteTaskId(req, res) {
    const { taskId } = req.params;

    try {
      const taskDeleted = await Task.deleteTaskId(taskId);
      if (taskDeleted) {
        res.status(200).send({ message: 'Task deleted successfully.' });
      } else {
        res.status(404).send({ message: 'Task not found or already deleted.' });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send({ message: 'Error deleting task.' });
    }
  },

  async editTaskId(req, res) {
    const { taskId } = req.params;
    const newData = req.body; 

    try {
      const updatedTask = await Task.editTaskId(taskId, newData);
      if (updatedTask) {
        res.status(200).send(updatedTask);
      } else {
        res.status(404).send({ message: 'Task not found.' });
      }
    } catch (error) {
      console.error('Error editing task:', error);
      res.status(500).send({ message: 'Error editing task.' });
    }
  },
};

export default taskController;
/*
const taskController = {
async getTask(req, res){
  try {
     const q = await Task.find()
     res.json(q)
  } catch (error) {
      res.json({ error })
  }
}


async insertTask(req,res){
  try {
      console.log(req.body);
        Task.insertMany({task});
       res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
      console.error(error);
      res.status(400).json({ "error": "Invalid body" });
  }
}


async dropTask(req, res){
  try {
     await Task.deleteMany();
     res.json({ msg: "Task deleted successfully"});
  } catch (error) {
      res.json({ error })
  }
}
}
export default taskController;
*/

import Task from "../Models/schema.mjs";
import task from '../database/data.mjs';

export const createTask = async (req, res) => {
  try {
    const { taskName, description, date, priority, status } = req.body;

    const newTask = new Task({
      task: taskName,
      description,
      date: date || Date.now(),
      priority: priority || 1,
      status: status || false,
    });

    await newTask.save();

    //res.status(201).send(newTask); 
    res.status(201).send({ TaskId: newTask._id, ...newTask.toJSON() });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Error creating task");
  }
};

 export const insertTaskId = async (req, res) => {
  const newData = req.body; 
  try {
    const task = new Task(newData);
    await task.save();
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ "error": "Invalid body" });
  }
};


export const deleteTaskId = async (req, res) => {
  const { taskId } = req.params;

  try {
    const taskDeleted = await Task.deleteTaskId(taskId);
    if (taskDeleted) {
      res.status(200).send({ message: 'Task deleted successfully.' });
    } else {
      res.status(404).send({ message: 'Task not found or already deleted.' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send({ message: 'Error deleting task.' });
  }
};

export const editTaskId = async (req, res) => {
  const { taskId } = req.params;
  const newData = req.body; 

  try {
    const updatedTask = await Task.editTaskId(taskId, newData);
    if (updatedTask) {
      res.status(200).send(updatedTask);
    } else {
      res.status(404).send({ message: 'Task not found.' });
    }
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).send({ message: 'Error editing task.' });
  }
};

const taskController = {
  createTask,
  insertTaskId,
  deleteTaskId,
  editTaskId
};

export default taskController;
