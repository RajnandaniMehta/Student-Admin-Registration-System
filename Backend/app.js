import express from "express";
import {config} from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import studentRouter from "./router/studentRouter.js";
import adminRouter from "./router/adminRouter.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

// import {Admin} from "./models/admin.js";
// import bcrypt from "bcrypt";


const app=express();
config({path:"./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/student",studentRouter);
app.use("/admin",adminRouter);

dbConnection();

// const createAdmin = async () => {
//     const username = 'Sneha Chauhan';  
//     const password = 'sneha';  
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     const admin = await Admin.create({username, password: hashedPassword });
//     admin.save();
//     console.log('Admin created successfully');
//   };
//   createAdmin();
export default app;