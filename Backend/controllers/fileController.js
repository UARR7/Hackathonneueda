const fs = require("fs");
const axios = require("axios");
const analyzer = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    // Convert image to base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");
    // Get file mime type
    const mimeType = req.file.mimetype;
    const analysis = await analyzeImageWithGemini(base64Image, mimeType);
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    res.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
};

async function analyzeImageWithGemini(base64Image, mimeType) {
  const STOCK_CHART_ANALYSIS_PROMPT = `
You are a professional financial analyst with expertise in technical analysis and macroeconomic factors. Analyze the provided image and follow these instructions:

## VALIDATION REQUIREMENTS:
First, verify if this is a valid stock chart by checking for:
- Price data (candlesticks, line chart, or bar chart)
- Time axis (dates/periods)
- Price axis (numerical values)
- Stock ticker symbol or company name
- Trading volume (preferred but not mandatory)

If the image is NOT a valid stock chart, return this exact JSON format:
{
  "isValidChart": false,
  "error": "Invalid stock chart - missing required elements: [list specific missing elements]",
  "errorType": "VALIDATION_ERROR"
}

## ANALYSIS REQUIREMENTS:
If it IS a valid stock chart, provide a comprehensive analysis considering:

### 1. TECHNICAL ANALYSIS:
- Chart pattern identification (head & shoulders, triangles, support/resistance, etc.)
- Trend analysis (uptrend, downtrend, sideways)
- Key price levels (support, resistance, breakouts)
- Volume analysis (if visible)
- Momentum indicators (if present)

### 2. CURRENT ECONOMIC CONDITIONS (2025):
Consider these macroeconomic factors in your analysis:
- Federal Reserve interest rate policy and recent decisions
- Inflation trends and CPI data
- Employment market conditions
- GDP growth expectations
- Dollar strength/weakness
- Geopolitical tensions affecting markets
- Sector-specific economic impacts

### 3. POLITICAL LANDSCAPE:
Factor in current political conditions:
- Presidential administration policies (Trump 2025)
- Congressional composition and policy priorities
- Regulatory environment changes
- Trade policies and international relations
- Tax policy expectations
- Infrastructure and spending bills impact

### 4. RISK ASSESSMENT:
- Market volatility indicators
- Sector-specific risks
- Company-specific risk factors (if identifiable)
- Macroeconomic risk factors

## RESPONSE FORMAT:
Return your analysis in this JSON structure:
{
  "isValidChart": true,
  "stockInfo": {
    "ticker": "identified ticker or 'Unknown'",
    "timeframe": "chart timeframe (1D, 1W, 1M, etc.)",
    "currentPrice": "last visible price or 'Not visible'",
    "priceChange": "recent change % or 'Not calculable'"
  },
  "technicalAnalysis": {
    "trend": "bullish/bearish/neutral",
    "patterns": ["list of identified patterns"],
    "supportLevels": ["key support prices"],
    "resistanceLevels": ["key resistance prices"],
    "volumeAnalysis": "volume trend description",
    "momentum": "bullish/bearish/neutral with explanation"
  },
  "macroeconomicContext": {
    "economicFactors": ["relevant economic conditions affecting this stock/sector"],
    "interestRateImpact": "how current Fed policy affects this stock",
    "inflationImpact": "how inflation trends affect this company/sector",
    "sectorOutlook": "overall sector performance expectations"
  },
  "politicalContext": {
    "policyImpacts": ["relevant policies affecting this stock/sector"],
    "regulatoryEnvironment": "current regulatory climate impact",
    "politicalRisks": ["political risks specific to this investment"],
    "tradePolicy": "trade policy implications if applicable"
  },
  "riskAssessment": {
    "overallRisk": "low/medium/high",
    "keyRisks": ["primary risk factors"],
    "volatilityExpectation": "expected volatility level",
    "timeHorizonRecommendation": "short/medium/long term suitability"
  },
  "recommendation": {
    "action": "buy/hold/sell/avoid",
    "confidence": "high/medium/low",
    "reasoning": "detailed explanation of recommendation",
    "targetPrice": "estimated target or 'Unable to determine'",
    "stopLoss": "suggested stop loss level or 'Unable to determine'"
  },
  "additionalNotes": "any other relevant observations or caveats"
}

## IMPORTANT GUIDELINES:
- If you cannot identify specific details, use "Not visible" or "Unable to determine"
- Base economic/political analysis on conditions as of early 2025
- Be specific about which economic/political factors are most relevant
- Consider both bullish and bearish scenarios
- Acknowledge limitations of chart-only analysis
- Include disclaimers about the need for fundamental analysis

REMEMBER: If the image is not a valid stock chart, immediately return the validation error format. Do not attempt analysis on non-chart images.
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Image,
                },
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
    return {
      analysis: response.data.candidates[0].content.parts[0].text,
      success: true,
    };
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  analyzer,
};
