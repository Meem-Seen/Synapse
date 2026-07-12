import { useEffect, useRef, useState } from "react";
import "../App.css";
import { Send, X, Bot,Brain, MessageCircle } from "lucide-react";

console.log("KEY:", import.meta.env.VITE_GEMINI_API_KEY);

async function askGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: prompt }] }
        ],
      }),
    }
  );

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hey I'm Synapty AI. How can I help you?", sender: "bot" },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  // Auto focus when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
  if (!input.trim() || isThinking) return;

  const question = input.trim();

  const userMsg = {
    text: question,
    sender: "user",
  };

  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsThinking(true);

  try {
    const reply = await askGemini(question);

    setMessages((prev) => [
      ...prev,
      {
        text: reply,
        sender: "bot",
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        text: "حدث خطأ أثناء الاتصال بـ Gemini.",
        sender: "bot",
      },
    ]);
  } finally {
    setIsThinking(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto resize textarea
  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <>
      {/* Toggle Button — hidden when open */}
      {!isOpen && (
        <button id="chatToggle" onClick={() => setIsOpen(true)} aria-label="Open chat">
          <MessageCircle size={22} />
        </button>
      )}

      {/* Chat Container */}
      <div className={`chat-container ${isOpen ? "active" : ""}`}>

        {/* Header */}
        <div className="chat-header">
          <div className="logo">

            <span className="logo-name">Synapty</span>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat"><X size={18} strokeWidth={2.5} /></button>
        </div>

        {/* Body */}
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.sender === "bot" && (
                <div className="chat-robot"><Bot size={18} /></div>
              )}
              <div className="message-text">{msg.text}</div>
            </div>
          ))}

          {/* Thinking animation */}
          {isThinking && (
            <div className="message bot-message">
              <div className="chat-robot"><Brain size={18} /></div>
              <div className="chat-thinking">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Footer */}
        <div className="chat-footer">
          <div className="chat-form">
            <textarea
              ref={textareaRef}
              className="message-input"
              placeholder="Type a message..."
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isThinking}
            />
            <div className="chat-controls">
              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={!input.trim() || isThinking}
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default AIChat;