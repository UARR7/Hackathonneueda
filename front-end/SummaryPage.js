import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const id = location.state?.id; // Get the ID passed from FormPage
      if (!id) {
        setErrorMessage('No profile ID provided.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/api/profile/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data from backend');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setErrorMessage('An error occurred while fetching profile data. Please try again later.');
      }
    };

    fetchProfileData();
  }, [location.state]);

  if (errorMessage) {
    return <div className="container" style={{ color: 'red' }}>{errorMessage}</div>;
  }

  if (!profileData) {
    return <div className="container">Loading...</div>;
  }

  const { id, name, income, expenses, debt, savings, creditUtilization, riskScore, suggestions } = profileData;

  return (
    <div className="container" style={{ backgroundColor: 'blue', color: 'white', padding: '20px' }}>
      <h1>Expense Summary</h1>
      <p><strong>Username:</strong> {name}</p>
      <p><strong>Income:</strong> {income}</p>
      <p><strong>Total Expense:</strong> {expenses}</p>
      <p><strong>Debt:</strong> {debt}</p>
      <p><strong>Credit Usability Score:</strong> {creditUtilization}</p>
      <p><strong>Savings:</strong> {savings}</p>
      <p><strong>Risk Score:</strong> {riskScore}</p>
      <p><strong>Suggestions:</strong> {suggestions?.join(', ') || 'No suggestions available.'}</p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default SummaryPage;
