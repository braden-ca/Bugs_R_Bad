import mongoose from "mongoose";
const { Schema } = mongoose;


const taskModel = new Schema({
    task : { type: String, default: ''},
    description : {type: String, default: ''},
    date : { type : Date, default: Date.now},
    priority : { type: Number, default: 1, min: 1, max: 3},
    status : {type: Boolean, default: false}
});

taskModel.statics.deleteTaskId = async function (taskId) {
    try {
      const result = await this.deleteOne({ _id: taskId });
      return result.deletedCount > 0; 
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  taskModel.statics.editTaskId = async function (taskId, newData) {
    try {
      const updatedTask = await this.findByIdAndUpdate(taskId, newData, { new: true });
      return updatedTask;
    } catch (error) {
      console.error("Error editing task:", error);
      throw error;
    }
  };
  

export default mongoose.model('Task', taskModel);