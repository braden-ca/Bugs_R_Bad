import mongoose from "mongoose";
const { Schema } = mongoose;


const taskModel = new Schema({
    task : { type: String, default: ''},
    date : { type : Date, default: Date.now},
    priority : { type: Number, default: 1, min: 1, max: 3},
    status : {type: Boolean, default: false}
});

export default mongoose.model('Task', taskModel);