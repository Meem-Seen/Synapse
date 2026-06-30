import { useEffect, useRef, useState } from "react";
import "../App.css";
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

  const sendMessage = () => {
    if (!input.trim() || isThinking) return;

    const userMsg = { text: input.trim(), sender: "user" };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const msg = input.toLowerCase();
      let reply = "I'm not sure I understand. Could you rephrase that? ";

      if (msg.includes("hello") || msg.includes("hi"))
        reply = "Hey there! How can I help you today?";
      else if (msg.includes("name"))
        reply = "I'm Synapty AI  — your smart assistant.";
      else if (msg.includes("good") || msg.includes("great"))
        reply = "Glad to hear that!  Anything I can help with?";
      else if (msg.includes("bye") || msg.includes("goodbye"))
        reply = "See you later!  Come back anytime.";
      else if (msg.includes("help"))
        reply = "Sure! Just tell me what you need and I'll do my best. ";

      setIsThinking(false);
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    }, 1000);
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
          💬
        </button>
      )}

      {/* Chat Container */}
      <div className={`chat-container ${isOpen ? "active" : ""}`}>

        {/* Header */}
        <div className="chat-header">
          <div className="logo">
            <span className="chat-robot-icon">🤖</span>
            <span className="logo-name">Synapty</span>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">✕</button>
        </div>

        {/* Body */}
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.sender === "bot" && (
                <div className="chat-robot">🤖</div>
              )}
              <div className="message-text">{msg.text}</div>
            </div>
          ))}

          {/* Thinking animation */}
          {isThinking && (
            <div className="message bot-message">
              <div className="chat-robot">🤖</div>
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
                ⬆
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default AIChat;