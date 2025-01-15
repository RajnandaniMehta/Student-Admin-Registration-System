import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/submissionList', {
          withCredentials: true,
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setStudentLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSubjectChange = (studentIndex, subjectIndex, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].subjects[subjectIndex] = value;
    setStudents(updatedStudents);
  };

  const handleUpdateFormStatus = async (e, rollno) => {
    e.preventDefault(); // Prevent form submission reload
    
    // Get the selected status from radio buttons
    const form = e.target.closest('form');
    const selectedStatus = form.querySelector(`input[name="updateform-${rollno}"]:checked`)?.value;
  
    if (!selectedStatus) {
      alert("Please select a status before updating.");
      return;
    }
  
    try {
      // Send data to the backend
      const response = await axios.post(
        'http://localhost:4000/admin/updateForm',
        { rollno, status: selectedStatus },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        alert(response.data.message);
        // Update local state or refetch students
        const updatedStudents = students.map((student) =>
          student.rollno === rollno ? { ...student, formStatus: selectedStatus } : student
        );
        setStudents(updatedStudents);
      } else {
        alert('Failed to update form status');
      }
    } catch (error) {
      console.error('Error updating form status:', error);
      alert('An error occurred while updating the form status.');
    }
  };
  

  return (
    <div>
      <h2>Student List</h2>
      {studentLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map((student, studentIndex) => (
            <li className='list' key={student.rollno}>
              <p><strong>Student Name:</strong> {student.name}</p>
              <p><strong>Roll Number:</strong> {student.rollno}</p>
              <p><strong>Subjects chosen are:</strong></p>
              <ul>
                {student.subjects.map((subject, subjectIndex) => (
                  <li key={subjectIndex}>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) =>
                        handleSubjectChange(studentIndex, subjectIndex, e.target.value)
                      }
                    />
                  </li>
                ))}
              </ul>
              <p><strong>Form Status:</strong> {student.formStatus}</p>
              <form onSubmit={(e) => handleUpdateFormStatus(e, student.rollno)}>
                <label>
                  Pending:
                  <input type="radio" name={`updateform-${student.rollno}`} value="pending" />
                </label>
                <label>
                  Confirmed:
                  <input type="radio" name={`updateform-${student.rollno}`} value="confirmed" />
                </label>
                <button
                  className='homebtn'
                  type="submit"
                >
                  Update
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;

   