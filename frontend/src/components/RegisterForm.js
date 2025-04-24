import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const [feedback, setFeedback] = useState(''); // State for server message

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/register`, formData);
      setFeedback(res.data.message);//Display success message
    } catch (err) {
      setFeedback('Registration failed');//Display error message
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="firstname" placeholder="First Name" onChange={handleChange} required />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>

     {/* Feedback message */}
     {feedback && <p>{feedback}</p>}
    
    </>
    
  );
}

export default RegisterForm;
