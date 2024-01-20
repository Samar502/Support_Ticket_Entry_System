import React, { useState } from 'react';
import axios from 'axios';
import './Components.css';

const AddTicket = () => {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    severity: 'Low',
    type: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      const payload = JSON.stringify(formData);
      axios.post('http://localhost:5000/api/support-tickets', payload, {
        headers: {
            'Content-type' : 'application/json',
        }
      })
      .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log('Error sending data to the backend', err);
    });
    setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.topic.trim()) {
      errors.topic = 'Topic is required';
    }

    if (!data.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!data.type.trim()){
        errors.type = 'Type is required';
    }

    return errors;
  };

  const handleNew = (e) => {
    setSubmitted(false);
    setFormData({
      title: '',
      description: '',
      severity: 'Low',
      type: ''
      });
    }

  return (
    <div>
      <h2 className='heading'>Support Ticket</h2>
      {submitted ? (
        <div className='success-submit'>
          {errors ? ( <p className='failed-submit'>Failed to add agent, Try again with checking details properly!</p>
        ) : (
          <p>Support Ticket added successfully!</p>
              )}
        <button onClick={handleNew}> Create a new ticket</button>
    </div>
        ) : (
      <form onSubmit={handleSubmit} className='ticket-form'>
        <div className='form-group'>
          <label htmlFor="topic" className='label-description'>Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className='form-control'
          />
          {errors.topic && <div className="error">{errors.topic}</div>}
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
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor="severity" className='label-description'>Severity</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className='form-control'
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="type" className='label-description'>Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className='form-control'
          />
          {errors.type && <div className="error">{errors.type}</div>}
        </div>
        <button type="submit" className='submit-button'>Create Ticket</button>
      </form> 
      )}</div>
  );
};

export default AddTicket;