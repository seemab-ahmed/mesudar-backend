import mongoose from "mongoose";
const Schema = mongoose.Schema;
const categoryOrderSchema = new Schema({
    catOrder: [ {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    }]
        
    })
    const catOrder = mongoose.model('categoryOrder', categoryOrderSchema)

    export default catOrder;
