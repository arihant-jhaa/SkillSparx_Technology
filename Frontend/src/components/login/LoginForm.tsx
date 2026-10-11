import React, { useState } from "react";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Info } from "lucide-react";

interface LoginFormProps {
  onSuccess?: () => void;
  onNavigateHome?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "success" | "info";
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Basic client validation
    if (!email.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please enter your email address.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!password) {
      setStatusMessage({
        type: "error",
        text: "Please enter your password.",
      });
      return;
    }

    if (password.length < 6) {
      setStatusMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    setIsLoading(true);

    // Simulate login request with honest feedback about backend status
    setTimeout(() => {
      setIsLoading(false);
      // As verified during project inspection, Backend/src/app.js is currently empty/uninitialized.
      setStatusMessage({
        type: "info",
        text: "Form validated successfully. Note: Backend authentication API (Backend/src/app.js) is currently uninitialized. Ready for endpoint connection.",
      });
      if (onSuccess) {
        onSuccess();
      }
    }, 900);
  };

  const handleSocialLogin = (provider: "Google" | "Apple") => {
    setStatusMessage({
      type: "info",
      text: `${provider} authentication requires OAuth client credentials to be configured in your backend.`,
    });
  };

  const handleForgotPassword = () => {
    setStatusMessage({
      type: "info",
      text: "Password recovery flow will be available once the user authentication service is configured.",
    });
  };

  const handleSignupClick = () => {
    setStatusMessage({
      type: "info",
      text: "Registration portal will be connected when the user registration API is active.",
    });
  };

  return (
    <div className="liquid-login-card">
      <h2 className="liquid-card-title">Welcome Back</h2>
      <p className="liquid-card-subtitle">
        Enter your email and password to access your account.
      </p>

      {statusMessage && (
        <div
          className={`liquid-alert liquid-alert-${statusMessage.type}`}
          role="alert"
          aria-live="polite"
        >
          {statusMessage.type === "error" && (
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
          )}
          {statusMessage.type === "success" && (
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
          )}
          {statusMessage.type === "info" && (
            <Info size={16} className="shrink-0 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="liquid-form-group">
          <label htmlFor="login-email" className="liquid-form-label">
            Email
          </label>
          <div className="liquid-input-wrap">
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@waavespace"
              className={`liquid-text-input ${
                statusMessage?.type === "error" && !email ? "has-error" : ""
              }`}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="liquid-form-group">
          <label htmlFor="login-password" className="liquid-form-label">
            Password
          </label>
          <div className="liquid-input-wrap">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`liquid-text-input pr-10 ${
                statusMessage?.type === "error" && !password ? "has-error" : ""
              }`}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="liquid-password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="liquid-forgot-row">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="liquid-forgot-link"
            >
              Forget Your Password
            </button>
          </div>
        </div>

        {/* Primary Liquid Glass Login Button */}
        <button
          type="submit"
          className="liquid-primary-btn"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <span>Log in</span>
          )}
        </button>
      </form>

      {/* Social Login Divider */}
      <div className="liquid-divider">
        <span>Or Login With</span>
      </div>

      {/* Google Authentication Button */}
      <button
        type="button"
        onClick={() => handleSocialLogin("Google")}
        className="liquid-social-btn"
        aria-label="Continue with Google"
      >
        <svg
          className="liquid-social-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Apple Authentication Button */}
      <button
        type="button"
        onClick={() => handleSocialLogin("Apple")}
        className="liquid-social-btn"
        aria-label="Continue with Apple"
      >
        <svg
          className="liquid-social-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.92-1 .04-2.18.66-2.88 1.48-.56.65-1.04 1.74-.91 2.78 1.11.09 2.22-.57 2.85-1.34z" />
        </svg>
        <span>Continue with Apple</span>
      </button>

      {/* Signup prompt */}
      <div className="liquid-signup-prompt">
        <span>Don't have an account?</span>
        <button
          type="button"
          onClick={handleSignupClick}
          className="liquid-signup-link"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
