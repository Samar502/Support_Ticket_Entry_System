import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Components.css';

const Agent = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      description: '',
    });
  
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
  
    const validateForm = () => {
      let valid = true;
      const newErrors = {};
  
      if (!formData.name) {
        valid = false;
        newErrors.name = 'Name is required';
      }
  
      if (!formData.email) {
        valid = false;
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        valid = false;
        newErrors.email = 'Invalid email format';
      }
  
      if (!formData.phone) {
        valid = false;
        newErrors.phone = 'Phone is required';
      }
  
      if (!formData.description) {
        valid = false;
        newErrors.description = 'Description is required';
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        const payload = JSON.stringify(formData);
        axios.post('http://localhost:5000/api/support-agents', payload, {
            headers: {
                'Content-type' : 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
        })
        setSubmitted(true);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    const handleNew = (e) => {
        setSubmitted(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            description: '',
        })
    }
  
    return (
      <div>
        <h2 className='heading'>Support Agent</h2>
        
        {submitted ? (
        <div className='success-submit'>
            {errors ? (
                <p className='failed-submit'>Failed to add agent, Try again with checking details properly!</p>
            ) : (
        <p>Support Agent added successfully!</p>
            )}
        <button onClick={handleNew}> Create a new agent</button>
    </div>
        ) : (
          <form onSubmit={handleSubmit} className='ticket-form'>
            <div className='form-group'>
              <label htmlFor="name" className='label-description'>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className='form-control'
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className='form-group'>
              <label htmlFor="email" className='label-description'>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='form-control'
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className='form-group'>
              <label htmlFor="phone" className='label-description'>Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className='form-control'
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>
            <div className='form-group'>
              <label htmlFor="description" className='label-description'>Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className='form-control'
              />
              {errors.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>
            <button type="submit" className='submit-button'>Submit</button>
          </form>
        )}
      </div>
    );
  };
  
  export default Agent;