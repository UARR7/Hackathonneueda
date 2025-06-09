

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeRisk(profile) {
  const prompt = `
Please analyze this financial profile and return a JSON like:
{
  "riskScore": number between 0-100,
  "suggestions": ["string", "string", "string"]
}

Respond ONLY with JSON. Do not add any explanation or formatting.

Profile:
Income: ${profile.income},
Expenses: ${profile.expenses},
Debt: ${profile.debt},
Savings: ${profile.savings},
Credit Utilization: ${profile.creditUtilization}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // ✅ Remove Markdown code block formatting like ```json ... ```
    text = text.trim();
    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
    }

    console.log('Cleaned AI response:', text);

    const parsed = JSON.parse(text);
    return parsed;

  } catch (err) {
    console.error('Gemini SDK error:', err.message || err);
    throw new Error('AI service failure');
  }
}

module.exports = { analyzeRisk };
