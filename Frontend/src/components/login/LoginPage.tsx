import React from "react";
import LoginForm from "./LoginForm";
import ChatbotPanel from "./ChatbotPanel";
import MobileChatLauncher from "./MobileChatLauncher";
import Brand from "../Brand";
import { ArrowLeft } from "lucide-react";
import "./login-glass.css";

interface LoginPageProps {
  onNavigateHome: () => void;
}

export default function LoginPage({ onNavigateHome }: LoginPageProps) {
  return (
    <div className="login-page-wrapper">
      <img src="/images/login-bg.png" alt="" className="login-bg-img" />

      {/* Floating Back to Home Navigation */}
      <button
        type="button"
        onClick={onNavigateHome}
        className="login-nav-back"
        aria-label="Back to home page"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>

      {/* Main Liquid Glass Container */}
      <div className="liquid-outer-container">
        {/* Content Grid */}
        <div className="login-page-grid">
          {/* Left Panel: Branding & LoginForm */}
          <div className="login-left-panel">
            <div className="mb-4">
              <Brand onClick={onNavigateHome} />
            </div>
            <LoginForm onSuccess={onNavigateHome} />

            <div className="login-panel-footer">
              <p>&copy; 2026 SkillSparx Technology. All rights reserved.</p>
            </div>
          </div>

          {/* Right Panel: Chatbot */}
          <div className="login-right-panel">
            <ChatbotPanel />
          </div>
        </div>
      </div>

      {/* Floating AI Launcher for Mobile & Tablet */}
      <MobileChatLauncher />
    </div>
  );
}
