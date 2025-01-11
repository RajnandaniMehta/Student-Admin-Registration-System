import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Define all state variables inside the component
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [subjectloading, setSubjectLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
const navigateTo=useNavigate();

  // Fetch student details on component mount
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true); 
      try {
        const response = await axios.get("http://localhost:4000/student/profile", { withCredentials: true });
        
        if (response && response.data) {
          // console.log("data in home ",response.data);
          setStudent(response.data); // Store data in state
        }
      } catch (error) {
        console.error("Error fetching student details:", error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchDetails(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  
  // Fetch subjects based on semester
  const handleFetchSubjects = async () => {
    setSubjectLoading(true);
    try {
      console.log(semester);
      const response = await axios.get(`http://localhost:4000/student/subjects?semester=${semester}`, { withCredentials: true });
      if(response.data){
    //   setSubjects(response.data.subjectList);
    // console.log(response.data.subjectList);
    const subjectsArray = Object.values(response.data.subjectList);
      setSubjects(subjectsArray);
      console.log(subjectsArray);
    }
    } catch (error) {
      setSubjectLoading(false);
      console.error('Error fetching subjects', error);
    }finally{
      setSubjectLoading(false);
    }
  };
  const handleCheckboxChange = (subject) => {
    if (selectedSubjects.includes(subject)) {
      // Remove subject if already selected
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      // Add subject if not already selected
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/student/chooseSubject', { subjects: selectedSubjects },{withCredentials:true},)
      .then(response => {
        console.log('Subjects updated successfully:', response.data);
        setSelectedSubjects([]);
      })
      .catch(error => {
        console.error('Error updating subjects:', error);
      });
      navigateTo('/ReviewForm');
  };
  return (
    <>
      {}
      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(student).length > 0 ? (
        // Display student data if available
        <div className='datails'>
          <h1>Welcome, {student.name || "Student"}</h1>
          <p><strong>Roll Number:</strong> {student.rollno}</p>
          <p><strong>Student Id:</strong> {student.id}</p>
          <p><strong>Father Name:</strong> {student.fatherName}</p>
          <p><strong>Permanent Address:</strong> {student.permanentAddress}</p>
          <p><strong>Parent MobNo:</strong> {student.parentMobNo}</p>
          <p><strong>Parent Email:</strong> {student.parentEmail}</p>
          <p><strong>Present Address:</strong> {student.presentAddress}</p>
          <p><strong>Student Number:</strong> {student.studentNo}</p>
          <p><strong>Student Email:</strong> {student.studentEmail}</p>
        </div>
      ) : (
        <p>No student data available.</p> // If no student data exists
      )}

      {/* Fetch Subjects based on Semester */}
      <div className='fetch'>
        <h1>Fetch Subjects based on Semester</h1>
        <input id='homeinput'
          type="text"
          placeholder="Enter Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)} // Update semester state
        />
        <button className='homebtn' onClick={handleFetchSubjects}>Get Subjects</button>
        <form onSubmit={handleSubmit}>
        <ul >
  {subjectloading ? (
    <p>Loading...</p>
  ) : subjects.length > 0 ? ( // Check length instead of Object.keys()
    subjects.map((subject) => (
      <li className='getSubject' key={subject._id}>
      <label>
        <input
          type="checkbox"
          value={subject.courseTitle}
          checked={selectedSubjects.includes(subject.courseTitle)}
          onChange={() => handleCheckboxChange(subject.courseTitle)}
        />
        {subject.courseTitle}
      </label>
    </li> // Render each subject in an <li> element
    ))
  ) : (
    <p>You have not selected semester</p>
  )}
  <button  type="submit">Submit</button>
</ul>
</form>
      </div>
      
    </>
  );
};

export default Home;
