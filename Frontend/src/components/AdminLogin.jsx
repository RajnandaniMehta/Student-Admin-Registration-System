import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const {isAuthAdmin, setIsAuthAdmin, user, setUser} = useContext(Context);
  const handleLogin= async(e) => {
    e.preventDefault();
    try{
      console.log("reached here",username,password);
        const {data} = await axios.post("http://localhost:4000/admin/login",
            {username,password},
            { withCredentials: true, headers: {"Content-Type" : "application/json"}}
        );
        toast.success(data.message);
        setIsAuthAdmin(true);
        setUser(data.user);
        navigateTo('/HomeAdmin')
        
    }catch(error){
        console.log(error);
    }

};
  return (
    <>
    <div className='authLogin'>
      <section className="box">
        <div>
        <img src="/logonituk.jpg" alt="NITUK" />
        <form onSubmit={handleLogin} className="authForm">
            <h3 className="H">LOGIN</h3>
               
                <div>
                    <label className="Input">Username</label>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e)=> setUsername(e.target.value)}
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
      </section>
      </div>
    </>
  )
}

export default AdminLogin;