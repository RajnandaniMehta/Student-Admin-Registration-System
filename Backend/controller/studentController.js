import {Student} from "../models/student.js";
import { Subject } from "../models/subjects.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Submission } from "../models/submittedForm.js";
//registration
export const register=async(req,res,next) =>{
    const {name,id,rollno,password,fatherName,permanentAddress,parentMobNo,parentEmail,presentAddress,studentNo,studentEmail}=req.body;
    
    if(!name || !studentEmail || !password|| !id){
        return next(
            res.status(400).json({
                success:false,
                message:"Please fill these required details"
            })
        );
    }
    const isStudent=await Student.findOne({rollno,studentEmail});
    if(isStudent){
        return next(
            res.status(400).json({
                success:false,
                message:"Student already registered"
            })
        );
    }
    
    const hashedPassword= await bcrypt.hash(password,10);
    const student=await Student.create({name,id,rollno,password:hashedPassword,fatherName,permanentAddress,parentMobNo,parentEmail,presentAddress,studentNo,studentEmail});
    res.status(200).json({
        success:true,
        message:"Student registered successfully",
        student
    });
}

//login
export const login=async(req,res,next) => {
    const {rollno, password} =req.body;
    if(!rollno || !password){
        return next(res.status(400).json({
            success:false,
            message:"Login failed"
        }));
    }
    const student=await Student.findOne({rollno});
    if(!student){
        return next(res.status(400).json({
            success:false,
            message:"You have not registered"
        }));
    }
    const matchPassword=await bcrypt.compare(password,student.password);
    if(!matchPassword){
        return next(res.status(400).json({
            success:false,
            message:"Wrong password"
        }));
    }
    // creating token to take student to their profile
    const token=await jwt.sign({id:student._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    res.status(200).cookie("token",token,{
        httpOnly:true,
        expiresIn:new Date(Date.now()+process.env.COOKIE_EXPIRES),
    }).json({
        success:true,
        message:"User logged in, see profile",
        token
    });
}
//profile
export const profile=async(req,res,next) => {
    const student=await Student.findById(req.student._id).select("-password");
    if(!student){
        return next(res.status(400).json({
            success:false,
            message:"Student not found"
        }));
    }
    const studentData = student.toObject()
    res.status(200).json({
        success:true,
        ...studentData,
    })
};
//logout
export const logout=async(req,res,next) => {
    res.status(200).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"You have successfully logged out."
    });
}

//  see the floatedsubjects
export const getSubjects = async (req, res, next) => {
    try {
      const semester = parseInt(req.query.semester);
      if (isNaN(semester)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid semester value. It must be a number.',
        });
      }
      const subjects = await Subject.findOne({ semester });
      if (!subjects || !subjects.subjectList) {
        return res.status(404).json({
          success: false,
          message: 'No subjects found for this semester',
        });
      }
      res.json({
        success: true,
        message: 'Subject lists are:',
        subjectList: subjects.subjectList,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching subjects',
        error: error.message,
      });
    }
  };
  
  //choose subjects
  export const chooseSubject=async(req,res,next)=>{
    const {subjects } = req.body;
    if(!subjects){
        return next( res.status(400).json({
            success:false,
            message:"you have not choosen the subjects"
        }))
    }
    await Student.findByIdAndUpdate(req.student._id, { subjects });
    res.json({ message: 'Subjects chosen successfully' });
  };

  
//to submit form at admin
export const submitForm = async (req, res) => {
  // console.log('Received student data:', req.body);
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(200).json({
      success:true,
      message:"Form submitted successfully"
  });
  } catch (error) {
    console.error('Error saving form:', error); // Log error for debugging
    res.status(500).json({ success: false, message: 'Internal server error while saving form.' });
  }
};


