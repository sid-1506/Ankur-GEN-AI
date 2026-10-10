# Ankur-GEN-AI 🤖

A lightweight, terminal-based AI chatbot built while learning Generative AI and experimenting with **Groq Cloud** and **LangChain.js**.

---

## 💡 About This Project

I built this project as a hands-on learning exercise to understand how LLMs integrate with Node.js applications. Rather than just using ChatGPT or web interfaces, I wanted to build a practical CLI tool from scratch to see how conversation memory, streaming tokens, and system prompts work behind the scenes.

It uses Groq's LPU inference engine with the `llama-3.3-70b-versatile` model, making the response times practically instantaneous.

---

## 🎯 What I Learned & Practiced

- **LLM Integration:** Connecting Node.js to Groq using LangChain's `@langchain/groq` wrapper.
- **Token Streaming:** Implementing `llm.stream()` to output words in real-time as they are generated, rather than waiting for the full response.
- **Conversation Memory:** Maintaining an active message history (`SystemMessage`, `HumanMessage`, `AIMessage`) across multiple turns.
- **System Prompts:** Instructing the model to adapt and mirror the user's language (English, Hindi, or Hinglish).
- **Error Handling:** Gracefully catching authentication errors, rate limits, and network dropouts without crashing the CLI.
- **Environment Security:** Keeping API keys safe using `.env` and `.gitignore`.

---

## ✨ Features

- ⚡ **Ultra-Fast Streaming:** Real-time token-by-token output in the terminal.
- 🧠 **Context Awareness:** Remembers what you said earlier in the conversation.
- 🗣️ **Multilingual:** Automatically responds in English, Hindi, or Hinglish based on how you speak to it.
- ⌨️ **Built-in Commands:**
  - `/clear` - Clears conversation history and starts a fresh session.
  - `/exit` or `/quit` - Closes the chatbot cleanly.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (ESM)
- **AI Framework:** [LangChain.js](https://js.langchain.com/) (`@langchain/groq`, `@langchain/core`)
- **LLM Provider:** [Groq Cloud](https://groq.com/) (`llama-3.3-70b-versatile`)
- **Configuration:** `dotenv`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sid-1506/Ankur-GEN-AI.git
cd Ankur-GEN-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure your API Key
1. Create a free account and get an API key from the [Groq Console](https://console.groq.com/keys).
2. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
3. Open `.env` and paste your key:
```env
GROQ_API_KEY=gsk_your_actual_groq_api_key
```

### 4. Run the chatbot
```bash
npm start
```

---

## 💬 Example Run

```text
==================================================
 Groq Terminal Chatbot (LangChain.js)
 Commands: /clear (reset memory), /exit (quit)
==================================================

You: Hey, who are you?
Bot: Hello! I'm your AI assistant powered by Groq. How can I help you today?

You: mujhe beeper app banana hai kaise banau
Bot: Beeper app banane ke liye aap Flutter/React Native aur Firebase use kar sakte ho...

You: /clear
Conversation history cleared.

You: /exit
Goodbye!
```

---

## 📌 Next Steps / Future Plans

- [ ] Add a clean web interface (React / Tailwind)
- [ ] Experiment with RAG (Retrieval-Augmented Generation) on personal documents
- [ ] Try out function calling / tools with LangChain agents

---

## 👤 Author

- GitHub: [@sid-1506](https://github.com/sid-1506)
