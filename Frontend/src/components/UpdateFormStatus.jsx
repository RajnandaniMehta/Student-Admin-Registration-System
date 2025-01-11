import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const UpdateFormStatus = () => {
    const [rollno, setRollno] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rollno || !status) {
      toast.error("Please provide both roll number and status");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/admin/updateForm', 
        { rollno, status }, 
        { withCredentials: true }
      );
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating form status:', error);
      setMessage('Error updating form status');
      toast.error('Error updating form status');
    }
  };

  return (
    <div className='auth'>
      <div className='registerDiv'>
      <h2>Update Form Status</h2>
      <form className="formm" onSubmit={handleSubmit}>
        <div>
          <label>Roll Number: </label>
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status: </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Status</button>
      </form>
      {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default UpdateFormStatus