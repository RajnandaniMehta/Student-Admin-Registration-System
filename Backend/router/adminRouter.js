import express from "express";
import {logout, login, profile, floatSubject, getStudents,updateFormStatus} from "../controller/adminController.js";
import { isAuthAdmin } from "../middleware/auth.js";

const router =express.Router();
router.post("/login",login);
router.get("/profile",isAuthAdmin,profile);
router.get("/logout",isAuthAdmin,logout);
router.post("/floatSubject",isAuthAdmin,floatSubject);
router.get("/studentList",isAuthAdmin,getStudents);
router.post("/updateForm",isAuthAdmin,updateFormStatus);
export default router;