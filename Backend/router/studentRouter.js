import express from "express";
import {profile, login, register, logout, getSubjects, chooseSubject, submitForm} from "../controller/studentController.js";
import { isAuth } from "../middleware/auth.js";

const router =express.Router();

router.post("/register",register);
router.post("/login",login)
router.get("/profile",isAuth,profile);
router.get("/logout",isAuth,logout);
router.get("/subjects",isAuth,getSubjects);
router.post("/chooseSubject",isAuth,chooseSubject);
router.post("/submitForm",isAuth,submitForm);
export default router;