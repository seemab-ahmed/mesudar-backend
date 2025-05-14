import mongoose from "mongoose";


const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskTitle: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('task', taskSchema)

const subCategorySchema = new Schema({
    subCategoryTitle:{
        type: String,
        required: true
    },
    tasks:[taskSchema]
    
})

const SubCategory = mongoose.model('subCategory', subCategorySchema)

const categorySchema = new Schema({
    categoryTitle:{
        type: String,
        required: true
    },
    subCategory: [subCategorySchema]
})
const Category = mongoose.model('category', categorySchema)

export {Category, SubCategory, Task};