import Task from "../Models/schema.mjs";

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
