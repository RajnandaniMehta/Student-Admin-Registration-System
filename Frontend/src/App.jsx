import React, { useContext, useEffect }  from "react";
import "./App.css";
import "./login.css";
import "./home.css";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context } from "./main"
import ReviewForm from "./components/ReviewForm";
import Start from "./components/Start";
import AdminLogin from "./components/AdminLogin";
import HomeAdmin from "./components/HomeAdmin";
import StudentList from "./components/StudentList";
import UpdateFormStatus from "./components/UpdateFormStatus";

const App = () => {
  // const {isAuth, setIsAuth, user, setUser} = useContext(Context);
  // useEffect(()=>{
  //   const getUser = async() =>{
  //     try{
  //       const {data} = await axios.get("http://localhost:4000/student/profile",
  //         { withCredentials : true}
  //       );
  //       setUser(data.user);
  //       setIsAuth(true);
  //     }catch(error){
  //       setIsAuth(false);
  //       setUser({});
  //     }
      
  //   };
  //   getUser();
  // },[]);
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminLogin" element={<AdminLogin />} />

      <Route path="/register" element={<Register />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/HomeAdmin" element={<HomeAdmin />} />
      <Route path="/ReviewForm" element={<ReviewForm />} />
      <Route path="/student-list" element={<StudentList />} />
      <Route path="/submission-list" element={<UpdateFormStatus />} />
    </Routes>
    <Toaster/>
  </Router>
  );
};

export default App; 