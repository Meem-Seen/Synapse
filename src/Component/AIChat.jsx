import { useEffect, useRef, useState } from "react";
import "../App.css";
import { Send, X, Bot, Brain, MessageCircle } from "lucide-react";
import {
  getMessages,
  sendMessage as apiSendMessage,
  subscribeToMessages,
  broadcastMessage,
} from "../api";

async function askGroq(prompt) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      }),
    },
  );

  const data = await response.json();
  return data.choices[0].message.content;
}

function AIChat({ roomId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hey I'm Synapty AI. How can I help you?", sender: "bot" },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    getMessages(roomId).then((msgs) => {
      if (!Array.isArray(msgs)) return;
      setMessages([{ text: "Hey I'm Synapty AI. How can I help you?", sender: "bot" }, ...msgs.map((m) => ({ text: m.text, sender: "bot" }))]);
    }).catch(() => {});
    const channel = subscribeToMessages(roomId, (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.text === msg.text && m.sender === msg.sender)) return prev;
        return [...prev, msg];
      });
    });
    return () => channel.unsubscribe();
  }, [roomId]);

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

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const question = input.trim();

    const userMsg = { text: question, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    await apiSendMessage(roomId, question);
    await broadcastMessage(roomId, { text: question, sender: "user" });

    setInput("");
    setIsThinking(true);

    try {
      const reply = await askGroq(question);

      const saved = await apiSendMessage(roomId, reply);
      await broadcastMessage(roomId, { text: reply, sender: "bot" });

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
          text: "حدث خطأ أثناء الاتصال بـ Groq.",
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
      handleSend();
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
        <button
          id="chatToggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
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
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.sender === "bot" && (
                <div className="chat-robot">
                  <Bot size={18} />
                </div>
              )}
              <div className="message-text">{msg.text}</div>
            </div>
          ))}

          {/* Thinking animation */}
          {isThinking && (
            <div className="message bot-message">
              <div className="chat-robot">
                <Brain size={18} />
              </div>
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
                onClick={handleSend}
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
