import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true
    }
    ,
    role: {
        type: String,
        enum: ['admin','user'],
        default: 'admin'
    },

    data: []
},{
    timestamps: true
})
 const User = mongoose.model('user', userSchema);
 export default User;

 