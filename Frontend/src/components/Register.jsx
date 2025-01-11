import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [rollno, setRollno] = useState("");
    const [password, setPassword] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [parentMobNo, setParentMobNo] = useState("");
    const [parentEmail, setParentEmail] = useState("");
    const [presentAddress, setPresentAddress] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [studentEmail, setStudentEmail] = useState("");

    const {isAuth, setIsAuth, setUser} = useContext(Context);
    const navigateTo = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/student/register",
                {
                    name,
                    id,
                    rollno,
                    password,
                    fatherName,
                    permanentAddress,
                    parentMobNo,
                    parentEmail,
                    presentAddress,
                    studentNo,
                    studentEmail,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success(data.message);
                navigateTo('/login')
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <section className="auth">
            <div className="registerDiv">
            <form className="formm" onSubmit={handleRegister}>
                <h3 className="Heading hR">REGISTER</h3>
                <div>
                    <label>Your Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Id</label>
                    <input
                        type="number"
                        placeholder="Enter your Id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Roll no</label>
                    <input
                        type="text"
                        placeholder="Enter your Roll no"
                        value={rollno}
                        onChange={(e) => setRollno(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Create Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Father Name</label>
                    <input
                        type="text"
                        placeholder="Enter your Father name"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Permanent Address</label>
                    <input
                        type="text"
                        placeholder="Enter permanent address"
                        value={permanentAddress}
                        onChange={(e) => setPermanentAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Parent MobNo</label>
                    <input
                        type="number"
                        placeholder="Enter parent MobNo"
                        value={parentMobNo}
                        onChange={(e) => setParentMobNo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Parent Email</label>
                    <input
                        type="email"
                        placeholder="Enter parent email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Present Address</label>
                    <input
                        type="text"
                        placeholder="Enter present address"
                        value={presentAddress}
                        onChange={(e) => setPresentAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Student No</label>
                    <input
                        type="number"
                        placeholder="Enter student number"
                        value={studentNo}
                        onChange={(e) => setStudentNo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Student Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            </div>
        </section>
    );
};

export default Register;
