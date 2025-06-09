import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function SummaryPage() {
  const location = useLocation();
  console.log('Rendering SummaryPage with data:', location.state?.expenseBreakdown);
  const expenseBreakdown = location.state?.expenseBreakdown || {}; // Fallback to an empty object
  const canvasRef = useRef(null);

  const totalExpense = Object.values(expenseBreakdown).reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    if (Object.keys(expenseBreakdown).length === 0) {
      console.warn('No expense breakdown data available.');
      return; // Exit early if no data
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    let startAngle = 0;

    Object.values(expenseBreakdown).forEach((value, index) => {
      const sliceAngle = (value / totalExpense) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(150, 150); // Center of the pie chart
      ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index];
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Add labels
    let labelAngle = 0;
    Object.keys(expenseBreakdown).forEach((key, index) => {
      const sliceAngle = (expenseBreakdown[key] / totalExpense) * 2 * Math.PI;
      const labelX = 150 + Math.cos(labelAngle + sliceAngle / 2) * 120;
      const labelY = 150 + Math.sin(labelAngle + sliceAngle / 2) * 120;
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(key, labelX, labelY);
      labelAngle += sliceAngle;
    });
  }, [expenseBreakdown, totalExpense]);

  return (
    <div className="container" style={{ backgroundColor: 'blue', color: 'white', padding: '20px' }}>
      <h1>Expense Summary</h1>
      <div>
        <h2>Total Expense: ${totalExpense.toFixed(2)}</h2>
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(expenseBreakdown).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>${value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(expenseBreakdown).length > 0 ? (
        <canvas ref={canvasRef} width="300" height="300"></canvas>
      ) : (
        <p>No data available to display.</p>
      )}
      <p>Suggestion: Suggestion</p>
    </div>
  );
}

export default SummaryPage;
