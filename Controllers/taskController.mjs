import Task from "../Models/schema.mjs"; 

const taskController = {
  async createTask(req, res) {
    try {
      const { task, date, priority, status } = req.body;

      // Create a new task instance using the Task model
      const newTask = new Task({
        task,
        date: date || Date.now(),
        priority: priority || 1,
        status: status || false,
      });

      // Save the new task to the database
      await newTask.save();

      res.status(201).send(newTask); 
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).send("Error creating task");
    }
  },
};

export default taskController;
