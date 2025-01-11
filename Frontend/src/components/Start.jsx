import React from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
    const navigateTo=useNavigate();
    const callStudentLogin=async (e) => {
        e.preventDefault();
        navigateTo('/login')
    }
    const callAdminLogin=async (e) => {
        e.preventDefault();
        navigateTo('/adminLogin')
    }
  return (
    <div>
        <section className='home'>
        <h1 className='heading'>Welcome to NIT Uttarakhand</h1>
        
            <h4 className='content'>Choose you category : 
                <button className='btn' onClick={callAdminLogin}>Admin</button>
                <button className='btn' onClick={callStudentLogin}>Student</button>
                
            </h4>
        </section>
    </div>
  )
}

export default Start