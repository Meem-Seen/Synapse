
function AIChat() {
  return (
    <>
        <button id="chatToggle"><span className="material-symbols-rounded">chat</span></button>
    <div className="chat-container">
      
      <div className="chat-header">
        <div className="logo">
          <span className="material-symbols-rounded">smart_toy</span>
          <h2>Synapty</h2>
        </div>

        <button id="closeChat">
          <span className="material-symbols-rounded">keyboard_arrow_down</span>
        </button>
      </div>

      <div className="chat-body">
        <div className="message bot-message">
          <span className="material-symbols-rounded chat-robot">smart_toy</span>
          <div className="message-text">
            Hey there  <br />
            How can I help you today?
          </div>
        </div>

        <div id="thinking-template" style={{ display: "none" }}>
          <div className="message bot-message">
            <span className="material-symbols-rounded chat-robot">smart_toy</span>
            <div className="message-text">
              <div className="chat-thinking">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <form className="chat-form">
          <textarea
            placeholder="Type a message..."
            className="message-input"
            required
          ></textarea>

          <div className="chat-controls">
            <button type="button" className="material-symbols-rounded">
              attach_file
            </button>

            <button type="button" className="material-symbols-rounded">mic</button>

            <button type="submit" className="material-symbols-rounded send-btn">
              arrow_upward
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AIChat