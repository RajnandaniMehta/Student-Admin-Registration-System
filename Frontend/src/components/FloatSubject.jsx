import React, { useState } from 'react';
import axios from 'axios';

const FloatSubject = () => {
    const [semester, setSemester] = useState('');
    const [subjectList, setSubjectList] = useState([{ courseTitle: '',  }]);
    const [message, setMessage] = useState('');

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
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error floating subjects');
            console.error('There was an error floating subjects:', error);
        }
    };

    return (
        <div>
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

                <button type="button" onClick={handleAddSubject}>
                    Add Subject
                </button>

                <button type="submit">Float Subjects</button>
            </form>
        </div>
    );
};

export default FloatSubject;
