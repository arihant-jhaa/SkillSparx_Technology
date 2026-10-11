import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Sparkles } from "lucide-react";
import ChatbotPanel from "./ChatbotPanel";

export default function MobileChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Focus close button on open
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Liquid Glass AI Launcher Button */}
      <button
        type="button"
        className="liquid-floating-launcher"
        onClick={() => setIsOpen(true)}
        aria-label="Open SkillSparx AI Assistant"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="relative flex items-center justify-center">
          <MessageSquare size={22} className="text-white drop-shadow-md" />
          <Sparkles
            size={12}
            className="absolute -top-1 -right-1 text-purple-300 animate-pulse"
          />
        </span>
      </button>

      {/* Mobile Modal Drawer */}
      {isOpen && (
        <div
          className="liquid-mobile-modal-backdrop"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            ref={modalRef}
            className="liquid-mobile-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-ai-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3
                  id="mobile-ai-dialog-title"
                  className="text-sm font-semibold tracking-wide text-white"
                >
                  SkillSparx AI Builder
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="liquid-round-btn"
                aria-label="Close AI Assistant drawer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh]">
              <ChatbotPanel isMobileModal={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
