import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    income: '',
    totalExpense: 0,
    debt: '',
    creditScore: '',
    savings: '',
  });
  const navigate = useNavigate();

  console.log('Rendering FormPage with formData:', formData);

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
      totalExpense: 0,
      debt: '',
      creditScore: '',
      savings: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/summary', { state: formData });
  };

  return (
    <div className="container" style={{ backgroundColor: 'blue', color: 'white', padding: '20px' }}>
      <h1>Financial Form</h1>
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
        <input type="number" name="totalExpense" value={formData.totalExpense} readOnly />

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
