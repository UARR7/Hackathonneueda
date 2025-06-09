import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    income: '',
    totalExpense: '',
    debt: '',
    creditScore: '',
    savings: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      username: '',
      age: '',
      gender: '',
      income: '',
      totalExpense: '',
      debt: '',
      creditScore: '',
      savings: '',
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      id: formData.username,
      name: formData.username,
      income: Number(formData.income),
      expenses: Number(formData.totalExpense),
      debt: Number(formData.debt),
      savings: Number(formData.savings),
      creditUtilization: Number(formData.creditScore),
    };

    try {
      const response = await fetch('http://localhost:5001/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from backend');
      }

      const responseData = await response.json();
      navigate('/summary', { state: responseData }); // Pass response data to SummaryPage
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred while submitting the form. Please try again later.');
    }
  };

  return (
    <div className="container" style={{ backgroundColor: 'blue', color: 'white', padding: '20px' }}>
      <h1>Financial Form</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        {/* Age */}
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        {/* Gender */}
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Income */}
        <label>Income:</label>
        <input type="number" name="income" value={formData.income} onChange={handleChange} required />

        {/* Total Expense */}
        <label>Total Expense:</label>
        <input type="number" name="totalExpense" value={formData.totalExpense} onChange={handleChange} required />

        {/* Debt */}
        <label>Debt:</label>
        <input type="number" name="debt" value={formData.debt} onChange={handleChange} required />

        {/* Credit Score */}
        <label>Credit Usability Score:</label>
        <input type="number" name="creditScore" value={formData.creditScore} onChange={handleChange} required />

        {/* Savings */}
        <label>Savings:</label>
        <input type="number" name="savings" value={formData.savings} onChange={handleChange} required />

        {/* Buttons */}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}

export default FormPage;
