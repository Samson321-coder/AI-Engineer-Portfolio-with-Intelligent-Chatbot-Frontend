document.addEventListener('DOMContentLoaded', () => {
    // Language Configuration
    const translations = {
        en: {
            title: "AI Assistant",
            welcome: "Hello! I'm Samson's virtual assistant. Ask me anything about his projects, skills, or experience! 🤖",
            placeholder: "Type a message...",
            fallback: {
                greetings: "Hi there! I'm running in 'Offline Mode' because my AI brain (API Key) isn't connected yet. But I can still tell you about Samson's **skills**, **projects**, or **contact** info!",
                skills: "Samson is proficient in Python, Machine Learning (TensorFlow, PyTorch), and Full Stack Web Dev. (Offline Mode)",
                projects: "He has built cool things like a Cold Email Generator, Potato Disease Classifier, and more. (Offline Mode)",
                contact: "You can reach him at samsonmare569@gmail.com. (Offline Mode)",
                about: "Samson is an AI Engineer and Full Stack Developer passionate about building intelligent solutions. (Offline Mode)",
                thanks: "You're welcome! Let me know if you have more questions.",
                default: "I'm in offline mode. Ask about **skills**, **projects**, or **contact**! (To enable AI, add an OpenAI API Key to the code)."
            }
        },
        am: {
            title: "AI ረዳት",
            welcome: "ሰላም! እኔ የሳምሶን AI ረዳት ነኝ። ስለ ፕሮጀክቶቹ፣ ክህሎቶቹ ወይም ልምዱ ማንኛውንም ነገር ይጠይቁኝ! 🤖",
            placeholder: "መልእክት ይጻፉ...",
            fallback: {
                greetings: "ሰላም! የእኔ AI (API Key) ስላልተገናኘ በ'ከመስመር ውጭ' ሁነታ ነው የምሰራው። ነገር ግን ስለ ሳምሶን **ክህሎቶች**፣ **ፕሮጀክቶች** ወይም **መገኛ** መረጃ ልነግርዎ እችላለሁ!",
                skills: "ሳምሶን በPython፣ Machine Learning (TensorFlow, PyTorch) እና Full Stack Web Dev ብቁ ነው። (ከመስመር ውጭ ሁነታ)",
                projects: "እንደ Cold Email Generator፣ Potato Disease Classifier እና ሌሎችንም ሰርቷል። (ከመስመር ውጭ ሁነታ)",
                contact: "በ samsonmare569@gmail.com ልታገኙት ትችላላችሁ። (ከመስመር ውጭ ሁነታ)",
                about: "ሳምሶን የማሽን መማሪያ (Machine Learning) እና አርቴፊሻል ኢንተለጀንስ (AI) ባለሙያ ነው። (ከመስመር ውጭ ሁነታ)",
                thanks: "ምንም አይደል! ተጨማሪ ጥያቄ ካለዎት ይጠይቁኝ።",
                default: "ከመስመር ውጭ ሁነታ ላይ ነኝ። ስለ **ክህሎቶች**፣ **ፕሮጀክቶች** ወይም **መገኛ** ይጠይቁ! (AI ለማብራት፣ OpenAI API Key ወደ ኮዱ ያስገቡ)።"
            }
        }
    };

    let currentLanguage = 'en';

    // Chatbot HTML Structure
    const chatbotHTML = `
        <div class="chat-toggle" id="chat-toggle">
            <svg viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </div>
        <div class="chat-container" id="chat-container">
            <div class="chat-header">
                <div class="header-left">
                    <h3><span class="chat-status"></span> <span id="chat-title">AI Assistant</span></h3>
                </div>
                <div class="header-right">
                    <select id="lang-select" class="lang-select">
                        <option value="en">EN</option>
                        <option value="am">አማ</option>
                    </select>
                    <button class="close-chat" id="close-chat">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot" id="welcome-message">
                    Hello! I'm Samson's virtual assistant. Ask me anything about his projects, skills, or experience! 🤖
                </div>
                <div class="typing-indicator" id="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
            <form class="chat-input-area" id="chat-form">
                <input type="text" id="chat-input" placeholder="Type a message..." autocomplete="off">
                <button type="submit" class="send-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    `;

    // Inject styles and HTML
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'chatbot.css';
    document.head.appendChild(styleLink);
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const langSelect = document.getElementById('lang-select');
    const chatTitle = document.getElementById('chat-title');
    const welcomeMessage = document.getElementById('welcome-message');

    // Configuration - Now handled by backend

    // System Prompts
    const systemPrompts = {
        en: `
            You are the virtual AI assistant for Samson Mare, an AI Engineer.
            Your goal is to professionally and friendly represent Samson to visitors of his portfolio website.
            Respond in ENGLISH.
            
            Here is Samson's profile context:
            - Role: AI Engineer & Full Stack Developer.
            - Summary: Passionate about artificial intelligence, machine learning, and building intelligent solutions.
            
            - Skills:
              - Machine Learning: TensorFlow, PyTorch, Scikit-learn.
              - Languages: Python (Data Science, Web), JavaScript (React, Node.js).
              - Deep Learning: Neural Networks, CNNs, RNNs.
              - Data Analysis: Pandas, NumPy, Matplotlib.
              - Cloud: AWS, Google Cloud, Azure.
              - Tools: Git, Docker, Jupyter Notebooks.

            - Featured Projects:
              1. Cold Email Generator (GenAI, LLM, API integration).
              2. Inventory System (LLM, Embeddings, MySQL, ChromaDB).
              3. Q&A System (Google Palm LLM, Langchain).
              4. Potato Disease Classification (Deep Learning, CNNs).
              5. Amazon & Netflix Clones (Full Stack React/Node).
              
            - Contact Info:
              - Email: samsonmare569@gmail.com
              - LinkedIn & GitHub links are on the page.

            Guidelines:
            - Be concise, professional, yet enthusiastic.
            - If asked about a specific project, provide details from the list above.
            - If asked about hiring, encourage them to contact Samson via email.
            - You are answering on behalf of Samson's portfolio.
            - Do not make up facts not present in this context.
        `,
        am: `
            You are the virtual AI assistant for Samson Mare, an AI Engineer.
            Your goal is to professionally and friendly represent Samson to visitors of his portfolio website.
            Respond in AMHARIC (አማርኛ).

            Here is Samson's profile context:
            - Role: AI Engineer & Full Stack Developer.
            - Summary: Passionate about artificial intelligence, machine learning, and building intelligent solutions.
            
            - Skills:
              - Machine Learning: TensorFlow, PyTorch, Scikit-learn.
              - Languages: Python (Data Science, Web), JavaScript (React, Node.js).
              - Deep Learning: Neural Networks, CNNs, RNNs.
              - Data Analysis: Pandas, NumPy, Matplotlib.
              - Cloud: AWS, Google Cloud, Azure.
              - Tools: Git, Docker, Jupyter Notebooks.

            - Featured Projects:
              1. Cold Email Generator (GenAI, LLM, API integration).
              2. Inventory System (LLM, Embeddings, MySQL, ChromaDB).
              3. Q&A System (Google Palm LLM, Langchain).
              4. Potato Disease Classification (Deep Learning, CNNs).
              5. Amazon & Netflix Clones (Full Stack React/Node).
              
            - Contact Info:
              - Email: samsonmare569@gmail.com
              - LinkedIn & GitHub links are on the page.

            Guidelines:
            - Be concise, professional, yet enthusiastic.
            - Answer in Amharic script.
            - If asked about a specific project, provide details from the list above.
            - If asked about hiring, encourage them to contact Samson via email.
            - You are answering on behalf of Samson's portfolio.
            - Do not make up facts not present in this context.
        `
    };

    // Language Switching
    langSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        updateInterfaceLanguage();
    });

    function updateInterfaceLanguage() {
        // Update static text
        chatTitle.textContent = translations[currentLanguage].title;
        chatInput.placeholder = translations[currentLanguage].placeholder;

        // Update welcome message if it's visible or relevant
        // We only update the initial welcome message if it hasn't been scrolled away or mixed with other messages too much
        // For simplicity, checking if it exists is enough.
        if (welcomeMessage) {
            welcomeMessage.innerHTML = translations[currentLanguage].welcome;
        }
    }

    // Toggle Chat
    function toggleChat() {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            chatInput.focus();
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    // AI Integration
    async function getAIResponse(userMessage) {
        try {
            // const response = await fetch('http://localhost:5000/api/chat', {
            const response = await fetch('https://ai-engineer-portfolio-with-intelligent.onrender.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    language: currentLanguage,
                    systemPrompt: systemPrompts[currentLanguage]
                })
            });

            if (!response.ok) throw new Error('Backend API request failed');
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Backend Error:', error);
            // Fallback
            return getFallbackResponse(userMessage);
        }
    }

    // Fallback Local Logic (Backup if no API Key)
    const knowledgeBase = {
        greetings: ['hi', 'hello', 'hey', 'greetings', 'morning', 'evening', 'hl', 'hlo', 'selam', 'ሰላም', 'ጤና ይስጥልኝ'],
        skills: ['skills', 'stack', 'technologies', 'python', 'tensorflow', 'machine learning', 'react', 'node', 'skill', 'tech', 'ችሎታ', 'ክህሎት'],
        projects: ['projects', 'work', 'portfolio', 'built', 'clone', 'app', 'system', 'project', 'ፕሮጀክት', 'ስራ'],
        contact: ['contact', 'email', 'touch', 'hire', 'reach', 'call', 'phone', 'አግኝ', 'ኢሜይል', 'ስልክ'],
        about: ['about', 'who', 'background', 'yourself', 'experience', 'me', 'ስለ', 'ማን'],
        thanks: ['thanks', 'thank', 'cool', 'awesome', 'good', 'thx', 'አመሰግናለሁ']
    };

    function getFallbackResponse(input) {
        input = input.toLowerCase();

        let matchedCategory = 'default';

        for (const [category, keywords] of Object.entries(knowledgeBase)) {
            if (keywords.some(keyword => input.includes(keyword))) {
                matchedCategory = category;
                break;
            }
        }

        const responses = translations[currentLanguage].fallback;
        return responses[matchedCategory] || responses.default;
    }

    // Handle Submit
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // Add User Message
        addMessage(message, 'user');
        chatInput.value = '';

        // Show Typing Indicator
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Fetch Response
        // Use a small timeout to allow the UI to update with the typing indicator first
        setTimeout(async () => {
            const response = await getAIResponse(message);
            typingIndicator.style.display = 'none';
            addMessage(response, 'bot');
        }, 600);
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;

        // Convert basic markdown to bold/links if needed (simple)
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        div.innerHTML = text;

        // Insert before typing indicator
        chatMessages.insertBefore(div, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
