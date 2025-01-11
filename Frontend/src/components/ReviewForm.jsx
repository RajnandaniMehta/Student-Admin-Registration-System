import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
    const [student, setStudent] = useState({
        name:"",
        id:"",
        rollno:"",
        fatherName:"",
        permanentAddress:"",
        parentMobNo:"",
        parentEmail:"",
        presentAddress:"",
        studentNo:"",
        studentEmail:"",
        subjects:[],
        formStatus:"",
      });
    const [loading, setLoading] = useState(false);
    const navigateTo=useNavigate();
    useEffect(() => {
        const fetchDetails = async () => {
          setLoading(false); 
          try {
            const response = await axios.get("http://localhost:4000/student/profile", { withCredentials: true });
            
            if (response && response.data) {
                // console.log("Fetched student data:", response.data);
              setStudent({
                name:response.data.name || "",
                id:response.data.id || "",
                rollno:response.data.rollno || "",
                fatherName:response.data.fatherName || "",
                permanentAddress:response.data.permanentAddress || "",
                parentMobNo:response.data.parentMobNo || "",
                parentEmail:response.data.parentEmail || "",
                presentAddress:response.data.presentAddress || "",
                studentNo:response.data.studentNo || "",
                studentEmail:response.data.studentEmail || "",
                subjects:response.data.subjects || [],
                formStatus:response.data.formStatus || "",
              }); 
            }
          } catch (error) {
            console.error("Error fetching student details:", error.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchDetails(); 
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
          ...prevStudent,
          [name]: value,
        }));
      };
      const handleSubjectChange = (index, event) => {
        const newSubjects = [...student.subjects];
        newSubjects[index] = event.target.value;
        setStudent((prevStudent) => ({
            ...prevStudent,
            subjects: newSubjects,
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Student data:', student);
        axios.post(
          'http://localhost:4000/student/submitForm',
                student
             ,
          { withCredentials: true } // Move withCredentials into the config object
        )
          .then(response => {
            console.log('Form submitted successfully:', response.data);
            console.log(response.data.message)
            toast.success(response.data.message);
            
            navigateTo('/Home')

          })
          .catch(error => {
            console.error('Error submitting form:', error.response?.data || error.message);
          });
      };
  return (
    <div className='auth'>
        <div className="registerDiv">
        <form className="formm" onSubmit={handleSubmit}>
        <div>
                 <label>Your Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={student.name}
                        onChange={handleChange}
                       
                    />
                </div>
                <div>
                    <label>Id</label>
                    <input
                        type="number"
                        placeholder="Enter your Id"
                        value={student.id}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label>Roll no</label>
                    <input
                        type="text"
                        placeholder="Enter your Roll no"
                        value={student.rollno}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label>Father Name</label>
                    <input
                        type="text"
                        placeholder="Enter your Father name"
                        value={student.fatherName}
                        onChange={handleChange}
                       
                    />
                </div>
                <div>
                    <label>Permanent Address</label>
                    <input
                        type="text"
                        placeholder="Enter permanent address"
                        value={student.permanentAddress}
                        onChange={handleChange}
                       
                    />
                </div>
                <div>
                    <label>Parent MobNo</label>
                    <input
                        type="number"
                        placeholder="Enter parent MobNo"
                        value={student.parentMobNo}
                        onChange={handleChange}
                       
                    />
                </div>
                <div>
                    <label>Parent Email</label>
                    <input
                        type="email"
                        placeholder="Enter parent email"
                        value={student.parentEmail}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label>Present Address</label>
                    <input
                        type="text"
                        placeholder="Enter present address"
                        value={student.presentAddress}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label>Student No</label>
                    <input
                        type="number"
                        placeholder="Enter student number"
                        value={student.studentNo}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label>Student Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={student.studentEmail}
                        onChange={handleChange}
                        
                    />
                </div> 
                <div>
            <label>Subjects chosen are:</label>
            <ul>
                {student.subjects.map((subject, index) => (
                    <li key={index}>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => handleSubjectChange(index, e)}
                        />
                    </li>
                ))}
            </ul>
        </div>
                <div>
                    <label>Form Status</label>
                    <input
                        type="text"
                        placeholder="status"
                        value={student.formStatus}
                        onChange={handleChange}
                        
                    />
                </div> 
                <button type="submit">Submit</button>
            </form>
            </div>
    </div>
  )
}

export default ReviewForm