// import jwt from "jsonwebtoken";
// import { Student } from "../models/student.js";
// import {Admin} from "../models/admin.js";
// export const isAuth=async(req,res,next) => {
//     const {token} = req.cookies;
//     if(!token){
//         return next(res.status(401).json({
//             success:false,
//             message:"Not Authenticated"
//         }));
//     }
//     const decoded=await jwt.verify(token,process.env.JWT_SECRET);
//     req.student=await Student.findById(decoded.id);

//     // console.log(req.student)
//     next();
// };
// export const isAuthAdmin =async(req,res,next) => {
//     const {token} = req.cookies;
//     if(!token){
//         return next(res.status(401).json({
//             success:false,
//             message:"Not Authenticated"
//         }));
//     }
//     const decoded=await jwt.verify(token,process.env.JWT_SECRET);
//     req.admin=await Admin.findById(decoded.id);
//     next();
// }



import jwt from "jsonwebtoken";
import { Student } from "../models/student.js";
import { Admin } from "../models/admin.js";

export const isAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Authenticated",
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findById(decoded.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        req.student = student;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export const isAuthAdmin = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Authenticated",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};