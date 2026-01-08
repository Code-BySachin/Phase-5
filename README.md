# Ask Gemini Web App

A simple and powerful web application that allows users to ask questions and get AI-generated answers powered by Google's Gemini API.

## Features

- 🤖 AI-powered responses using Google Gemini
- 💬 Clean chat-style interface
- 🔒 Secure API key handling on the backend
- 📱 Responsive design for mobile and desktop
- ⚡ Real-time communication between frontend and backend

## Project Structure

```
Phase-5/
├── server.js           # Backend server with Express and Gemini API integration
├── package.json        # Project dependencies
├── .env               # Environment variables (API key)
├── .gitignore         # Git ignore file
└── public/            # Frontend files
    ├── index.html     # Main HTML file
    ├── style.css      # Styling
    └── script.js      # Client-side JavaScript
```

## Setup Instructions

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

Open the `.env` file and replace `your_api_key_here` with your actual Gemini API key:

```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### 3. Install Dependencies

The dependencies are already installed, but if needed, run:

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

The server will start on http://localhost:3000

### 5. Use the Application

1. Open your browser and navigate to http://localhost:3000
2. Type your question in the input field
3. Click "Send" or press Enter
4. Wait for Gemini AI to generate a response
5. The answer will appear in the chat interface

## How It Works

### Architecture Flow

1. **Frontend (User Interface)**
   - User enters a question in the HTML form
   - JavaScript captures the form submission
   - Sends a POST request to `/api/ask` endpoint

2. **Backend (Server)**
   - Express.js server receives the request
   - Validates the question
   - Sends the question to Gemini API
   - Receives AI-generated response
   - Sends response back to frontend

3. **Frontend (Display)**
   - Receives the response from backend
   - Displays the answer in the chat interface
   - Provides visual feedback during processing

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - @google/generative-ai (Gemini SDK)
  - dotenv (environment variables)

- **Frontend:**
  - HTML5
  - CSS3
  - Vanilla JavaScript

## API Endpoints

### POST `/api/ask`
Sends a question to Gemini AI and returns the answer.

**Request Body:**
```json
{
  "question": "What is artificial intelligence?"
}
```

**Response:**
```json
{
  "answer": "AI-generated answer here...",
  "question": "What is artificial intelligence?"
}
```

### GET `/api/health`
Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "Server is running!"
}
```

## Features

- **Loading States:** Visual feedback while waiting for AI response
- **Error Handling:** Graceful error messages for network or API issues
- **Auto-resize Textarea:** Input field expands as you type
- **Keyboard Shortcuts:** Press Enter to submit, Shift+Enter for new line
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Smooth Animations:** Sliding message animations for better UX

## Security

- API key is stored in `.env` file (never exposed to frontend)
- `.env` file is in `.gitignore` to prevent accidental commits
- All Gemini API calls happen on the backend
- Input validation to prevent empty requests

## Troubleshooting

**Server won't start:**
- Make sure you've added your API key to the `.env` file
- Check if port 3000 is already in use

**No response from AI:**
- Verify your API key is correct and active
- Check your internet connection
- Look at the server console for error messages

**Frontend not loading:**
- Make sure the server is running
- Check if you're accessing http://localhost:3000
- Open browser developer console for errors

## Future Enhancements

- Add conversation history
- Support for markdown formatting in responses
- Add voice input capability
- Implement rate limiting
- Add user authentication
- Store conversation history in database

## License

ISC

---

Built with ❤️ using Node.js, Express, and Google Gemini AI
