import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import adminRoutes from './modules/admin/admin.routes.js';
import checklistRoutes from './modules/checklist/checklist.routes.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin',adminRoutes);
app.use('/api/user',checklistRoutes)

await mongoose.connect(process.env.MONGO_URL)
app.listen(3000,'0.0.0.0' , ()=>{
    console.log("Database connected sucessfully")
});

