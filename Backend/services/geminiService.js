const axios = require("axios");

async function analyzeRisk(profile) {
  const prompt = `
    Analyze this financial profile and return a JSON with a "riskScore" (0-100) 
    and an array of 3 "suggestions" to improve it.
    Profile:
    Income: ${profile.income}, Expenses: ${profile.expenses}, Debt: ${profile.debt},
    Savings: ${profile.savings}, Credit Utilization: ${profile.creditUtilization}
  `;

  try {
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
  }
}

module.exports = { analyzeRisk };
