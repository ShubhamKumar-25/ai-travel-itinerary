const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/generate-itinerary", async (req, res) => {
  try {
    const { destination, days, budget, style } = req.body;

    if (!destination || !days || !budget || !style) {
      return res.status(400).json({ success: false, error: "All fields are required!" });
    }

    // JSON Guidelines refined for Strict Parser
    const prompt = `
      You are an elite Travel Guide. Create a highly detailed, rich day-by-day travel itinerary for a trip to "${destination}" for ${days} days and use normal english language not so technical.
      The traveler's budget is "${budget}" and style is "${style}".

      Return a JSON object matching this exact schema. Do not truncate the text, provide full descriptions:
      {
        "tripSummary": {
          "destination": "${destination}",
          "duration": "${days} Days",
          "budgetCategory": "${budget}",
          "style": "${style}",
          "aboutDestination": "A detailed 3-4 sentence background about the vibe and culture of ${destination}.",
          "bestTimeToVisit": "Specify the best months to visit and why.",
          "estimatedTotalCostEstimate": "Detailed breakdown range (e.g., ₹25,000 - ₹30,000)"
        },
        "itinerary": [
          {
            "day": 1,
            "theme": "Creative title for this day's vibe",
            "dayBudget": "Estimated pocket money needed for this day",
            "timeSlots": {
              "morning": "Detailed breakdown of morning activities, spots, and tips without using unescaped quotes.",
              "afternoon": "Detailed lunch and afternoon transition guide.",
              "evening": "Detailed nightlife, markets, or sunset plans."
            },
            "foodSuggestions": "Specific local dishes or cafes to try."
          }
        ],
        "travelTips": [
          "Detailed tip 1 about transport or local hacks.",
          "Detailed tip 2 about safety or packing.",
          "Detailed tip 3 about saving money."
        ]
      }

      CRITICAL: The "itinerary" array MUST contain exactly ${days} elements. Ensure all strings are clean and properly closed. Do not include markdown code blocks.
    `;

    // Groq API Call with strict JSON Mode enabled
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      response_format: { type: "json_object" } // 🔥 Yeh Groq ko strictly valid JSON generate karne par majboor karta hai
    });

    const aiResponseText = chatCompletion.choices[0]?.message?.content;

    // Ab parsing bina kisi parsing error ke smoothly chalegi
    const jsonResponse = JSON.parse(aiResponseText);
    res.status(200).json({ success: true, data: jsonResponse });

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ success: false, error: "Failed to parse or generate a high-quality travel plan. Please try again!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Travel backend running on port ${PORT}`));









