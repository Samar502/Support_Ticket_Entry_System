import React, { useState } from 'react';
import axios from 'axios';
import './AddTicket.css';

const AddTicket = () => {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    severity: 'Low',
    type: ''
    // status: 'New',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form data is valid, handle submission (e.g., send to the backend)
    //   console.log('Form data:', formData);
      const payload = JSON.stringify(formData);
      axios.post('http://localhost:5000/api/support-tickets', payload, {
        headers: {
            'Content-type' : 'application/json',
        }
      })
      .then((response) => {
        console.log(response);
      // Reset the form
      // setFormData({
      //   title: '',
      //   description: '',
      //   severity: 'Low',
      //   type: ''
      //   // status: 'New',
      //   // assignedTo: '',
      //   // createdOn: '',
      // });
    })
    .catch((err) => {
        console.log('Error sending data to the backend', err);
    });
    setSubmitted(true);
    } else {
      // Form data has validation errors, update errors state
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when the user changes the field
    setErrors({ ...errors, [name]: '' });
  };

  // Validation function
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

    // if (!data.assignedTo.trim()) {
    //   errors.assignedTo = 'Assigned To is required';
    // }

    // if (!data.createdOn.trim()) {
    //   errors.createdOn = 'Created On date is required';
    // } else if (!isValidDate(data.createdOn)) {
    //   errors.createdOn = 'Invalid date format (YYYY-MM-DD)';
    // }

    return errors;
  };

  const handleNew = (e) => {
    setSubmitted(false);
    setFormData({
      title: '',
      description: '',
      severity: 'Low',
      type: ''
      // status: 'New',
      // assignedTo: '',
      // createdOn: '',
      });
    }

  // Function to validate date format (YYYY-MM-DD)
//   const isValidDate = (dateString) => {
//     const pattern = /^\d{4}-\d{2}-\d{2}$/;
//     return pattern.test(dateString);
//   };

  return (
    <div>
      <h2 className='heading'>Support Ticket</h2>
      {submitted ? (
        //   <p className='success-submit'>Form submitted successfully!</p>
        <div className='success-submit'>
        <p>Support Ticket added successfully!</p>
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
        {/* <div>
          <label htmlFor="status">Type</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select> */}
        {/* </div> */}
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
        {/* <div>
          <label htmlFor="createdOn">Created On</label>
          <input
            type="text"
            id="createdOn"
            name="createdOn"
            placeholder="YYYY-MM-DD"
            value={formData.createdOn}
            onChange={handleChange}
          />
          {errors.createdOn && <div className="error">{errors.createdOn}</div>}
        </div> */}
        <button type="submit" className='submit-button'>Create Ticket</button>
      </form> 
      )}</div>
  );
};

export default AddTicket;