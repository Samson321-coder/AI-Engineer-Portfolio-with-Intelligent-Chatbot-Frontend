# AI Engineer Portfolio with Intelligent Chatbot 🤖

A modern, responsive portfolio website designed to showcase my projects, skills, and experience. It features a built-in AI assistant that can answer questions about my background using the OpenAI or Google Gemini API.

## 🚀 Features

*   **Intelligent AI Chatbot**: Secure backend-powered chatbot that acts as my virtual assistant.
*   **Secure API Handling**: Backend proxy to keep API keys hidden from the frontend/browser.
*   **Introduction Video**: High-quality video introduction integrated directly into the hero section for a professional first impression.
*   **Multilingual Support**: Chatbot supports both **English** and **Amharic** languages with instant switching.
*   **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
*   **Modern UI/UX**: Clean aesthetic with side-by-side hero content, smooth animations, glassmorphism, and interactive elements.
*   **Project Showcase**: Dedicated section to highlight AI and machine learning projects with details and links.

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Backend**: Node.js, Express.js.
- **AI Integration**: OpenAI (GPT-3.5) & Google Gemini API.
- **Tools**: Axios, Dotenv, CORS.

## 📂 Project Structure

```
├── Images/          # Project images and assets
├── server/          # Backend Node.js server
│   ├── index.js     # Server logic and API proxy
│   ├── .env         # [HIDDEN] API keys and configuration
│   └── package.json # Backend dependencies
├── index.html       # Main HTML structure
├── script.js        # Main website logic (navigation, scroll)
├── styles.css       # Core website styling
├── chatbot.js       # Chatbot frontend logic
├── chatbot.css      # Chatbot specific styling
├── .gitignore       # Git ignore rules
└── README.md        # Project documentation
```

## 🤖 Chatbot Architecture

The portfolio uses a secure **Client-Server architecture** for the chatbot:

1.  **Frontend**: User types a message in the chat UI.
2.  **Backend Proxy**: The frontend sends the request to the local Node.js server (`/api/chat`).
3.  **Secure API Call**: The server retrieves the API key from the private `.env` file and calls OpenAI/Gemini.
4.  **Response**: The server sends the AI's response back to the frontend.

This ensures that **my API keys are never exposed** to users visiting my website.

### 🌍 Language Support
The chatbot supports **English** and **Amharic**.
- **Toggle**: Switch languages using the dropdown in the chat header.
- **Fallback**: Even without a server connection, the chatbot has local keyword matching for both languages.

## ⚙️ Setup and Installation

### 1. Backend Setup
1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add your keys:
    ```env
    OPENAI_API_KEY=your_openai_key_here
    GOOGLE_API_KEY=your_gemini_key_here
    PORT=5000
    ```

### 2. Running Local
1.  Start the backend server:
    ```bash
    node index.js
    ```
2.  Open `index.html` in your browser (use Live Server for the best experience).

## 🌐 Deployment

When deploying:
- Host the backend on a platform like **Render**, **Railway**, or **Heroku**.
- Add your `.env` variables to the host's environment settings.
- Update the `fetch` URL in `chatbot.js` to point to your deployed backend URL.
