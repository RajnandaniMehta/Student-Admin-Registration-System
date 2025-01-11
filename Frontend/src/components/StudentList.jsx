import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [studentloading, setStudentLoading] = useState(true); 
    useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await axios.get('http://localhost:4000/admin/studentList', { withCredentials: true });
            setStudents(response.data);
          } catch (error) {
            console.error('Error fetching students:', error);
          } finally {
            setStudentLoading(false);
          }
        };
    
        fetchStudents();
      }, []);
  return (
    <div>
       <div>
      <h2>Student List</h2>
      <ul >
        {students.map((student) => (
          <li className='list' key={student.rollno}>
            <p><strong>Student Name:</strong> {student.name}</p>
            <p><strong>Roll Number:</strong> {student.rollno}</p>
       <p><strong>Student Id:</strong> {student.id}</p>
       <p><strong>Father Name:</strong> {student.fatherName}</p>
       <p><strong>Permanent Address:</strong> {student.permanentAddress}</p>
       <p><strong>Parent MobNo:</strong> {student.parentMobNo}</p>
       <p><strong>Parent Email:</strong> {student.parentEmail}</p>
       <p><strong>Present Address:</strong> {student.presentAddress}</p>
       <p><strong>Student Number:</strong> {student.studentNo}</p>
       <p><strong>Student Email:</strong> {student.studentEmail}</p>
       <p><strong>Subjects choosen are : </strong></p>
       <ul>{student.subjects.map((subject, index) => (
                    <li key={index}>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => handleSubjectChange(index, e)}
                        />
                    </li>
                ))}
                </ul>
         <p><strong>Form Status:</strong> {student.formStatus}</p>
          </li>
        ))}
      </ul>
     

    </div>
        </div>
  )
}

export default StudentList

// {}
// {loading ? (
//   <p>Loading...</p>
// ) : Object.keys(student).length > 0 ? (
//   // Display student data if available
//   <div>
//     <h1>Welcome, {student.name || "Student"}</h1>
//     <p><strong>Roll Number:</strong> {student.rollno}</p>
//     <p><strong>Student Id:</strong> {student.id}</p>
//     <p><strong>Father Name:</strong> {student.fatherName}</p>
//     <p><strong>Permanent Address:</strong> {student.permanentAddress}</p>
//     <p><strong>Parent MobNo:</strong> {student.parentMobNo}</p>
//     <p><strong>Parent Email:</strong> {student.parentEmail}</p>
//     <p><strong>Present Address:</strong> {student.presentAddress}</p>
//     <p><strong>Student Number:</strong> {student.studentNo}</p>
//     <p><strong>Student Email:</strong> {student.studentEmail}</p>
//   </div>
// ) : (
//   <p>No student data available.</p> // If no student data exists
// )}