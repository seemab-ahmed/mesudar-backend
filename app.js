import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import dotenv from "dotenv";

import adminRoutes from './modules/admin/admin.routes.js';
import checklistRoutes from './modules/checklist/checklist.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/user', checklistRoutes);

await mongoose.connect(process.env.MONGO_URL);

// Self-signed SSL options
const options = {
  key: fs.readFileSync('/etc/ssl/selfsigned/key.pem'),
  cert: fs.readFileSync('/etc/ssl/selfsigned/cert.pem')
};

// Start HTTPS server
https.createServer(options, app).listen(443, '0.0.0.0', () => {
  console.log("HTTPS server running on port 443");
});






// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import adminRoutes from './modules/admin/admin.routes.js';
// import checklistRoutes from './modules/checklist/checklist.routes.js';
// import dotenv from "dotenv";
// const https = require('https');
// const fs = require('fs');
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/admin',adminRoutes);
// app.use('/api/user',checklistRoutes)

// await mongoose.connect(process.env.MONGO_URL)
// app.listen(3000,'0.0.0.0' , ()=>{
//     console.log("Database connected sucessfully")
// });


