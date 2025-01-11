import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../main';

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(Context);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:4000/student/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuth(false);
      navigate("/"); // Redirect to home after logout
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav>
      <Link to="/">HOME</Link>
      <button onClick={handleLogout}>LOGOUT</button>
    </nav>
  );
};

export default Navbar;
