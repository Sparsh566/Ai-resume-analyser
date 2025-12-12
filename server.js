import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// ENV VARIABLES
// ----------------------
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 5000;

// Check if API key exists
if (!OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing in .env file!");
    process.exit(1);
}

// ----------------------
// TEST ROOT
// ----------------------
app.get("/", (req, res) => {
    res.send("AI Resume Builder Backend is Running ✔️");
});

// ----------------------
// AI ROUTE (MAIN)
// ----------------------
// Shared handler for generate endpoint (used by both /api/generate and /generate)
async function handleGenerate(req, res) {
    try {
        const { inputText } = req.body;

        if (!inputText || inputText.trim().length === 0) {
            return res.status(400).json({ error: "inputText is required" });
        }

        console.log("📩 Request received, length:", inputText.length);

        const payload = {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an expert resume analyzer. Provide clear, structured suggestions." },
                { role: "user", content: inputText }
            ],
            max_tokens: 1000,
            temperature: 0.7
        };

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            payload,
            { headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" } }
        );

        const aiMessage = response?.data?.choices?.[0]?.message?.content || '';
        console.log("✅ AI Response received (length:", aiMessage.length, ")");

        return res.json({ message: aiMessage });

    } catch (error) {
        // Detailed logging
        console.error("❌ AI Server Error:", error?.response?.status, error?.response?.data || error.message);

        const status = error?.response?.status;
        const data = error?.response?.data;

        if (status === 401) {
            return res.status(401).json({ error: "Invalid API key", details: "Please check your OPENAI_API_KEY in .env" });
        }

        if (status === 403) {
            return res.status(403).json({ error: "Access denied to model", details: data || 'Project does not have access to the requested model' });
        }

        if (status === 429) {
            return res.status(429).json({ error: "Rate limit exceeded", details: data || "Too many requests. Please try again later." });
        }

        return res.status(500).json({ error: "AI server error", details: data?.error?.message || error.message });
    }
}

app.post("/api/generate", handleGenerate);
app.post("/generate", handleGenerate);

// ----------------------
// HEALTH CHECK
// ----------------------
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        openai: !!OPENAI_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// ----------------------
// 404 HANDLER
// ----------------------
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        availableRoutes: [
            "GET /",
            "GET /health",
            "POST /api/generate"
        ]
    });
});

// ----------------------
// START SERVER
// ----------------------
app.listen(PORT, () => {
    console.log(`\n============================================`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔑 OpenAI API Key: ${OPENAI_API_KEY ? "✅ Configured" : "❌ Missing"}`);
    console.log(`============================================\n`);
});