const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Root route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to handle questions
app.post('/api/ask', async (req, res) => {
    try {
        const { question } = req.body;

        // Validate input
        if (!question || question.trim() === '') {
            return res.status(400).json({ 
                error: 'Please provide a question' 
            });
        }

        console.log('Received question:', question);

        // Call Gemini API
        const result = await model.generateContent(question);
        const response = await result.response;
        const answer = response.text();

        console.log('Gemini response received');

        // Send response back to frontend
        res.json({ 
            answer: answer,
            question: question 
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Failed to get response from Gemini AI. Please try again.' 
        });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// Start server (only if not in serverless environment)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Visit http://localhost:${PORT} to use the Ask Gemini app`);
    });
}

// Export for Vercel
module.exports = app;
