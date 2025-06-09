<<<<<<< HEAD
const axios = require("axios");
=======


const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
>>>>>>> 73affc3e94702b9458dfed8b17461b717c79c46d

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
<<<<<<< HEAD
    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Gemini response:", JSON.stringify(res.data, null, 2));
    let text = res.data.candidates[0].content.parts[0].text;
    let parsed;
    text = text.replace(/```json|```/g, "").trim();
    try {
      parsed = JSON.parse(text);
    } catch (parseErr) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error("Gemini did not return valid JSON. Response: " + text);
    }
    return parsed;
  } catch (err) {
    console.error("Error in analyzeRisk:", err.message);
    throw err;
=======
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
>>>>>>> 73affc3e94702b9458dfed8b17461b717c79c46d
  }
}

module.exports = { analyzeRisk };
