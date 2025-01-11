import React, { useContext, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const {isAuth, setIsAuth, user, setUser} = useContext(Context);
  const handleLogin= async(e) => {
    e.preventDefault();
    try{
      console.log("I have reached");
      console.log("I have reached",rollno,password);

        const {data} = await axios.post("http://localhost:4000/student/login",
            {rollno,password},
            { withCredentials: true, headers: {"Content-Type" : "application/json"}}
        );
        toast.success(data.message);
        setIsAuth(true);
        setUser(data.user);
        navigateTo('/Home')
        
    }catch(error){
        toast.error(error.response.data.message);
    }

};
  return (
    <>
    <div className="authLogin">
      <section className="box">
        <div>
        <img src="/logonituk.jpg" alt="NITUK" />
        <form onSubmit={handleLogin} className="authForm">
            <h3 className="H">LOGIN</h3>
               
                <div>
                    <label className="Input">Username</label>
                    <input type="text" placeholder="Enter your roll" value={rollno} onChange={(e)=> setRollno(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label className="Input">Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)}
                    required
                    />
                </div>
              
            <button type="submit" className="Login">Login In</button>
        </form>
        </div>
      
      <Link to="/register" className="newAcc">Create new account</Link>
      </section>
      </div>
    </>
  );
};

export default Login;
