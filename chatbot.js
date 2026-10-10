import "dotenv/config";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

const apiKey = process.env.GROQ_API_KEY?.trim();
if (!apiKey || apiKey === "PASTE_YOUR_KEY_HERE") {
  console.error("\n[Error] GROQ_API_KEY is missing or invalid in your .env file.\n");
  process.exit(1);
}

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.7,
  apiKey: apiKey,
});

const systemPrompt = "You are a helpful assistant. Reply in the same language the user writes in (Hindi, Hinglish or English).";

let history = [new SystemMessage(systemPrompt)];

function handleApiError(error) {
  const errMsg = (error?.message || "").toLowerCase();

  if (errMsg.includes("401") || errMsg.includes("invalid_api_key") || errMsg.includes("unauthorized")) {
    console.error("\n[Error] Invalid Groq API key.");
  } else if (errMsg.includes("429") || errMsg.includes("rate_limit")) {
    console.error("\n[Error] Rate limit reached. Please wait a moment.");
  } else if (errMsg.includes("fetch failed") || errMsg.includes("network") || errMsg.includes("enotfound")) {
    console.error("\n[Error] Network error. Check your internet connection.");
  } else {
    console.error("\n[Error]", error?.message || "Something went wrong.");
  }
}

async function startChatbot() {
  const rl = readline.createInterface({ input, output });

  console.log("==================================================");
  console.log(" Groq Terminal Chatbot (LangChain.js)");
  console.log(" Commands: /clear (reset memory), /exit (quit)");
  console.log("==================================================");

  rl.on("close", () => {
    process.exit(0);
  });

  while (true) {
    let userInput;
    try {
      userInput = await rl.question("\nYou: ");
    } catch {
      break;
    }

    const trimmedInput = userInput.trim();
    if (!trimmedInput) continue;

    if (trimmedInput === "/exit" || trimmedInput === "/quit") {
      console.log("Goodbye!");
      rl.close();
      break;
    }

    if (trimmedInput === "/clear") {
      history = [new SystemMessage(systemPrompt)];
      console.log("Conversation history cleared.");
      continue;
    }

    history.push(new HumanMessage(trimmedInput));

    process.stdout.write("Bot: ");
    let fullReply = "";

    try {
      const stream = await llm.stream(history);

      for await (const chunk of stream) {
        let token = "";
        if (typeof chunk?.content === "string") {
          token = chunk.content;
        } else if (Array.isArray(chunk?.content)) {
          token = chunk.content.map((part) => (typeof part === "string" ? part : part?.text || "")).join("");
        }

        process.stdout.write(token);
        fullReply += token;
      }

      console.log();
      history.push(new AIMessage(fullReply));
    } catch (error) {
      history.pop();
      handleApiError(error);
    }
  }
}

startChatbot();
