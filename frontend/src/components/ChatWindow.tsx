import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const botResponses = [
  "Hello! How can I assist you today?",
  "That's an interesting point. Can you tell me more?",
  "I understand. Let me know if you have any questions.",
  "I'm here to help. What else would you like to know?",
  "Thank you for sharing that information.",
];

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newUserMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: botResponses[Math.floor(Math.random() * botResponses.length)],
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[500px] max-w-md w-full mx-auto border rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "rounded-br-none"
                  : "rounded-bl-none"
              } border`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="border-t p-4 flex items-center"
      >
        <button
          type="button"
          className="p-2 rounded-full border"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mx-4 p-2 border rounded-full"
        />
        <button
          type="submit"
          className="p-2 rounded-full border"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};
