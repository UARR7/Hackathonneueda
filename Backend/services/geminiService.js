const axios = require('axios');

async function analyzeRisk(profile) {
  const prompt = `
    Analyze this financial profile and return a JSON with a "riskScore" (0-100) 
    and an array of 3 "suggestions" to improve it.
    Profile:
    Income: ${profile.income}, Expenses: ${profile.expenses}, Debt: ${profile.debt},
    Savings: ${profile.savings}, Credit Utilization: ${profile.creditUtilization}
  `;

  const res = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY, {
    contents: [{ parts: [{ text: prompt }] }]
  });

  const text = res.data.candidates[0].content.parts[0].text;
  const parsed = JSON.parse(text);
  return parsed;
}

module.exports = { analyzeRisk };
