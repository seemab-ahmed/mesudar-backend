
// Live server code with SSL configuration

import adminRoutes from './modules/admin/admin.routes.js';
import checklistRoutes from './modules/checklist/checklist.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import suggestionRoutes from './modules/suggestions/suggestions.routes.js';
import exportRoutes from './modules/export/export.routes.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['https://mesudar.com', 'https://admin.mesudar.com'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Routes
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/user',checklistRoutes)
app.use('/api/suggestion',suggestionRoutes);
app.use('/api/export',exportRoutes);

// Database Connection
await mongoose.connect(process.env.MONGO_URL);

// SSL Configuration - Only needed if NOT using Nginx SSL termination
const options = {
  key: fs.readFileSync('/etc/ssl/selfsigned/key.pem'),
  cert: fs.readFileSync('/etc/ssl/selfsigned/cert.pem')
};

// Start server on port 5000
https.createServer(options, app).listen(5000, '0.0.0.0', () => {
  console.log("HTTPS server running on port 5000"); // Make sure this matches the actual port
});





// // local server code without SSL configuration
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import adminRoutes from './modules/admin/admin.routes.js';
// import checklistRoutes from './modules/checklist/checklist.routes.js';
// import authRoutes from './modules/auth/auth.routes.js';
// import suggestionRoutes from './modules/suggestions/suggestions.routes.js';
// import exportRoutes from './modules/export/export.routes.js';
// import dotenv from "dotenv";
// import https from 'https';
// import fs from'fs';
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '10mb' })); // Increase size limit for PDF base64 data

// app.use('/api/auth',authRoutes);
// app.use('/api/admin',adminRoutes);
// app.use('/api/user',checklistRoutes);
// app.use('/api/suggestion',suggestionRoutes);
// app.use('/api/export',exportRoutes);


// app.use((err, req, res, next) => {
//   console.error(err.stack);  

  
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
    
//   });
// });


// await mongoose.connect(process.env.MONGO_URL)
// app.listen(3000,'0.0.0.0' , ()=>{
//     console.log("Database connected sucessfully")
// });


