import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import { useSelector } from 'react-redux';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.user.userId); 
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input,
        user_id: userId,
      });

      const text = res.data;
      
      // Update the state to include the new bot message
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text },
      ]);
      
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>
            {/* Conditionally render message as a <pre> or regular div */}
            {msg.sender === "bot" ? (
              <pre className="chat-message bot">{msg.text}</pre>
            ) : (
              <div className="chat-message user">{msg.text}</div>
            )}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
