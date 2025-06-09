const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeRisk(profile) {
//   const prompt = `
// Please analyze this financial profile and return a JSON like:
// {
//   "riskScore": number between 0-100,
//   "suggestions": ["string", "string", "string"]
// }

// Respond ONLY with JSON. Do not add any explanation or formatting.

// Profile:
// Income: ${profile.income},
// Expenses: ${profile.expenses},
// Debt: ${profile.debt},
// Savings: ${profile.savings},
// Credit Utilization: ${profile.creditUtilization}
//   `;

const prompt = `
You are a financial advisor AI specializing in Indian finance. Analyze the financial profile below and respond ONLY with a JSON object in this format:

{
  "riskScore": number (0 to 100, where 100 means highest financial risk),
  "suggestions": [
    "Actionable suggestion 1 with specific numbers in Indian Rupees (₹)",
    "Actionable suggestion 2 with specific numbers in Indian Rupees (₹)",
    "Actionable suggestion 3 with specific numbers in Indian Rupees (₹)"
  ]
}

Your suggestions must be specific, helpful, and based on the user's income, expenses, savings, debt, and credit utilization. Use Indian Rupees (₹) for all amounts. Do NOT include any explanation, markdown, or extra formatting — respond with JSON only.

Profile:
Income: ₹${profile.income},
Expenses: ₹${profile.expenses},
Debt: ₹${profile.debt},
Savings: ₹${profile.savings},
Credit Utilization: ${profile.creditUtilization}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // ✅ Remove Markdown code block formatting like ```json ... ```
    text = text.trim();
    if (text.startsWith("```")) {
      text = text
        .replace(/^```(?:json)?/, "")
        .replace(/```$/, "")
        .trim();
    }

    console.log("Cleaned AI response:", text);

    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Gemini SDK error:", err.message || err);
    throw new Error("AI service failure");
  }
}

module.exports = { analyzeRisk };
