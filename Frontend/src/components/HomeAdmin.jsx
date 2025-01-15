import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const HomeAdmin = () => {
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(false);

    const [semester, setSemester] = useState('');
    const [subjectList, setSubjectList] = useState([{ courseTitle: '',  }]);
    const [message, setMessage] = useState('');
    const navigateTo=useNavigate();
    useEffect(() => {
        const fetchDetails = async () => {
          setLoading(true); 
          try {
            const response = await axios.get("http://localhost:4000/admin/profile", { withCredentials: true });
            
            if (response && response.data) {
              // console.log("data in home ",response.data);
              setAdmin(response.data); // Store data in state
              console.log(response.data.username);
            }
          } catch (error) {
            console.error("Error fetching student details:", error.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchDetails(); // Call the function to fetch data on component mount
      }, []); 
      const handleAddSubject = () => {
        setSubjectList([...subjectList, { courseTitle: '', }]);
    };
    const handleSubjectChange = (index, field, value) => {
        const updatedSubjects = [...subjectList];
        updatedSubjects[index][field] = value;
        setSubjectList(updatedSubjects);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/admin/floatSubject", {
                semester,
                subjectList
            },{ withCredentials: true },);
            setMessage(response.data.message);
            toast.success(response.data.message);
            
        } catch (error) {
            setMessage('Error floating subjects');
            console.error('There was an error floating subjects:', error);
        }
    };

  return (
    <div className='adminHome'>
        {loading ? (
            <h2>Loading...</h2>
        ):(
            <h2>Welcome {admin.username}</h2>
        )}
        <h2>Float Subjects for Semester</h2>
        {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Semester: </label>
                    <input
                        type="text"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                    />
                </div>

                {subjectList.map((subject, index) => (
                    <div key={index} style={{ marginTop: '10px' }}>
                        <label>Course Title: </label>
                        <input
                            type="text"
                            value={subject.courseTitle}
                            onChange={(e) => handleSubjectChange(index, 'courseTitle', e.target.value)}
                            required
                        />
                      
                    </div>
                ))}

                <button className='homebtn' type="button" onClick={handleAddSubject}>
                    Add Subject
                </button>

                <button type="submit">Float Subjects</button>
            </form>
            <div>
                <h3>See the list of submitted form </h3>
                <button className='homebtn' onClick={() => navigateTo('/student-list')}>Registered Student</button>
            </div>
            <div>
            <h3>See the list of student registered </h3>
                <button className='homebtn' onClick={() => navigateTo('/submission-list')}>Submitted Form</button>
            </div>
    </div>
  )
}

export default HomeAdmin;