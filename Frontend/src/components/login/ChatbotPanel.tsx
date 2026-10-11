import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Compass,
  FileText,
  Bot,
  Plus,
  Globe,
  ArrowUp,
  Volume2,
  Loader2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface ChatbotPanelProps {
  isMobileModal?: boolean;
}

export default function ChatbotPanel({ isMobileModal = false }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [hasSpecs, setHasSpecs] = useState(true);
  const streamEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    {
      id: "welcome",
      label: "Welcome",
      prompt: "Welcome! Tell me what SkillSparx AI can help me build.",
      icon: Sparkles,
      iconColor: "#a855f7",
    },
    {
      id: "mvp",
      label: "Plan my MVP",
      prompt: "I want to plan my MVP. What are the recommended architecture and tech stack steps?",
      icon: Compass,
      iconColor: "#22c55e",
    },
    {
      id: "landing",
      label: "Planning Page",
      prompt: "Create a design specification for a high-converting landing page.",
      icon: FileText,
      iconColor: "#f43f5e",
    },
    {
      id: "builder",
      label: "Chatwall Builder",
      prompt: "How do I build an interactive chatwall component with liquid glass styling?",
      icon: Bot,
      iconColor: "#f59e0b",
    },
  ];

  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulated AI response demonstrating interactive capabilities
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("welcome")) {
        reply =
          "Welcome to SkillSparx Technology! I can help you architect MVPs, generate prototypes, and structure modern web applications with cutting-edge UI design.";
      } else if (lower.includes("mvp")) {
        reply =
          "To plan your MVP: 1) Define core value proposition, 2) Choose modern stack (React/Vite + TypeScript + Tailwind), 3) Scaffold authentication, 4) Deploy fast feedback loops. How can I assist further?";
      } else if (lower.includes("plan") || lower.includes("page")) {
        reply =
          "For high-converting landing pages, prioritize crystal-clear value above the fold, social proof, responsive glass aesthetics, and accessible interactive call-to-actions.";
      } else {
        reply = `I have received: "${text}". Note: Real-time LLM endpoints can be connected by adding your API endpoint to the backend service.`;
      }

      const botMessage: Message = {
        id: `b-${Date.now()}`,
        sender: "assistant",
        text: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 850);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`liquid-chat-container ${isMobileModal ? "w-full" : ""}`}>
      {/* Chatbot Heading */}
      <h2 className="liquid-chat-title">What can I help with?</h2>

      {/* Suggestion Chips */}
      <div className="liquid-chips-row" role="region" aria-label="AI suggestions">
        {suggestionChips.map((chip) => {
          const IconComp = chip.icon;
          return (
            <button
              key={chip.id}
              type="button"
              className="liquid-chip"
              onClick={() => handleSendMessage(chip.prompt)}
              title={chip.prompt}
            >
              <span className="chip-icon-wrap" style={{ color: chip.iconColor }}>
                <IconComp size={14} />
              </span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Message Stream Area */}
      {messages.length > 0 && (
        <div
          className="liquid-chat-stream"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`liquid-msg ${
                msg.sender === "user" ? "liquid-msg-user" : "liquid-msg-bot"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="liquid-msg liquid-msg-bot flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-purple-400" />
              <span>SkillSparx AI is thinking...</span>
            </div>
          )}
          <div ref={streamEndRef} />
        </div>
      )}

      {/* Message Composer */}
      <div className="liquid-composer">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AI Builder to Create a Prototype..."
          className="liquid-composer-input"
          rows={2}
          aria-label="Ask AI Builder a question"
          disabled={isTyping}
        />

        <div className="liquid-composer-actions">
          {/* Tool actions on left */}
          <div className="liquid-tool-group">
            <button
              type="button"
              className="liquid-round-btn"
              title="Add attachment or context"
              aria-label="Add attachment or context"
              onClick={() => {
                setInputValue((prev) => prev + " [Attachment Context]");
              }}
            >
              <Plus size={16} />
            </button>

            <button
              type="button"
              className={`liquid-pill-badge ${isPublic ? "opacity-100" : "opacity-60"}`}
              onClick={() => setIsPublic(!isPublic)}
              title="Toggle public visibility"
              aria-label="Toggle public visibility"
            >
              <Globe size={13} />
              <span>{isPublic ? "Public" : "Private"}</span>
            </button>

            <button
              type="button"
              className={`liquid-pill-badge ${hasSpecs ? "opacity-100" : "opacity-60"}`}
              onClick={() => setHasSpecs(!hasSpecs)}
              title="Toggle specifications mode"
              aria-label="Toggle specifications mode"
            >
              <FileText size={13} />
              <span>Specifications</span>
            </button>
          </div>

          {/* Right action buttons */}
          <div className="liquid-tool-group">
            <button
              type="button"
              className="liquid-round-btn opacity-70 hover:opacity-100"
              title="Voice Input (Preview)"
              aria-label="Voice input preview"
              onClick={() => {
                setInputValue("Voice note: Design a liquid glass prototype.");
              }}
            >
              <Volume2 size={15} />
            </button>

            <button
              type="button"
              className="liquid-submit-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              title="Send message"
              aria-label="Send message"
            >
              <ArrowUp size={18} strokeWidth={2.6} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
