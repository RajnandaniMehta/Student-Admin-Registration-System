import {Admin} from "../models/admin.js";
import {Subject} from "../models/subjects.js";
import {Student} from "../models/student.js";
import { Submission } from "../models/submittedForm.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//login
export const login=async(req,res,next) => {
    const {username, password} =req.body;
    if(!username || !password){
        return next(res.status(400).json({
            success:false,
            message:"Wrong username or password"
        }));
    }
    const admin=await Admin.findOne({username});
    if(!admin){
        return next(res.status(400).json({
            success:false,
            message:"You are not admin"
        }));
    }
    const matchPassword=await bcrypt.compare(password,admin.password);
    if(!matchPassword){
        return next(res.status(400).json({
            success:false,
            message:"Wrong password"
        }));
    }
    // creating token to take Admin to their profile
    const token=await jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    res.status(200).cookie("token",token,{
        httpOnly:true,
        expiresIn:new Date(Date.now()+process.env.COOKIE_EXPIRES),
    }).json({
        success:true,
        message:"Admin token generated, see profile",
        token
    });
};

//profile
export const profile=async(req,res,next) => {
    const admin=await Admin.findById(req.admin._id).select("-password");
    if(!admin){
        return next(res.status(400).json({
            success:false,
            message:"Admin not found"
        }));
    }
    const adminData=admin.toObject();
    res.status(200).json({
        success:true,
        ...adminData,
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

//float-subjects
export const floatSubject=async(req,res,next) => {
    // const {courseCode,courseTitle,slot,credit } = req.body;
    const {semester,subjectList} =req.body;
    console.log(req.body);
    // const subject = await Subject.create({courseCode,courseTitle,slot,credit});
    const subject=await Subject.create({semester,subjectList});
    subject.save();
    res.status(200).json({ 
        success:true,
        message: 'Subjects floated successfully',
        subject
    });
}


//studentList
export const getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
  };

//submissionList
export const getSubmission = async (req, res) => {
    const students = await Submission.find();
    res.json(students);
  };
  
  //form status
  export const updateFormStatus = async (req, res, next) => {
    const { rollno, status } = req.body;
  
    if (!rollno || !status) {
      return res.status(400).json({ success: false, message: 'Roll number and status are required.' });
    }
  
    try {
      const student = await Student.findOne({ rollno });
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found.' });
      }
  
      student.formStatus = status;
      await student.save();
  
      return res.status(200).json({ success: true, message: 'Form status updated successfully.' });
    } catch (error) {
      console.error('Error updating form status:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  };
