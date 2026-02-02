import React, { useState, useEffect, useRef, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import "../assets/scss/_Assistant.scss";
import userIcon from "/icons/kalilinux-svgrepo-com.svg";
import assistantIcon from "/icons/linux-tux-svgrepo-com.svg";
import inputIcon from "/icons/arch-linux-svgrepo-com(2).svg";
import { HiSparkles } from "react-icons/hi2";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { useResizableChatbot } from "../hooks/useResizableChatbot";

const Assistant = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const assistantRef = useRef<HTMLDivElement | null>(null);
  const [isHelpOptionsVisible, setIsHelpOptionsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [messageFeedback, setMessageFeedback] = useState<Record<string, 'up' | 'down' | null>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Custom resize and drag functionality
  const {
    dimensions,
    position,
    isResizing,
    isDragging,
    handleResizeStart,
    handleDragStart,
    setSizePreset,
    resetToDefault,
  } = useResizableChatbot();

  const helpOptions = [
    "Who is Francisco Barrios?",
    "Why should I hire Francisco?",
    "What are Francisco's technical skills?",
    "What projects has Francisco worked on?",
    "Is Francisco available for hire?",
  ];

  // Use the AI SDK's useChat hook
  const { messages, sendMessage, status, error, setMessages, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Function to toggle the chat box open or closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Click event handler to detect clicks outside of the Assistant component
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      assistantRef.current &&
      !assistantRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Effect to add an event listener to the document
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle help options visibility
  const toggleHelpOptions = () => {
    setIsHelpOptionsVisible(!isHelpOptionsVisible);
  };

  // Close help options
  const closeHelpOptions = () => {
    setIsHelpOptionsVisible(false);
  };

  // Function to handle help option selection
  const handleHelpOptionClick = (option: string) => {
    setInput(option);
    setIsHelpOptionsVisible(false);
  };

  // Handle keyboard navigation and shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close help menu on Escape
      if (e.key === 'Escape' && isHelpOptionsVisible) {
        setIsHelpOptionsVisible(false);
        return;
      }
      // Close chat on Escape when help menu is closed
      if (e.key === 'Escape' && isOpen && !isHelpOptionsVisible) {
        setIsOpen(false);
        return;
      }

      // Size shortcuts (Ctrl/Cmd + key)
      if ((e.ctrlKey || e.metaKey) && isOpen) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          setSizePreset('large');
        } else if (e.key === '-') {
          e.preventDefault();
          setSizePreset('compact');
        } else if (e.key === '0') {
          e.preventDefault();
          setSizePreset('default');
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, isHelpOptionsVisible, setSizePreset]);

  // Handle send message
  const handleSend = () => {
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle voice input
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Copy message to clipboard
  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Clear conversation
  const clearConversation = () => {
    setMessages([]);
    setMessageFeedback({});
    setShowClearConfirm(false);
  };

  // Handle clear conversation click
  const handleClearClick = () => {
    if (messages.length === 0) return;
    setShowClearConfirm(true);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // Handle message feedback
  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === feedback ? null : feedback
    }));
  };

  // Handle retry - resend the last user message
  const handleRetry = () => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage && lastUserMessage.parts[0]?.type === 'text') {
      sendMessage({ text: lastUserMessage.parts[0].text });
    }
  };

  // Get detailed error message based on error type
  const getErrorDetails = (error: Error | null) => {
    if (!error) return { title: 'Unknown error', message: 'Something went wrong. Please try again.', suggestion: 'Retry your message' };

    const errorMessage = error.message?.toLowerCase() || '';

    // Network errors
    if (errorMessage.includes('network') || errorMessage.includes('econnrefused') || errorMessage.includes('fetch')) {
      return {
        title: 'Connection Error',
        message: 'Unable to connect to the AI service. Please check your internet connection.',
        suggestion: 'Check your connection and try again'
      };
    }

    // Authentication errors
    if (errorMessage.includes('auth') || errorMessage.includes('401') || errorMessage.includes('403')) {
      return {
        title: 'Authentication Error',
        message: 'There was a problem authenticating your request.',
        suggestion: 'Contact support if this persists'
      };
    }

    // Rate limiting
    if (errorMessage.includes('rate limit') || errorMessage.includes('429') || errorMessage.includes('quota')) {
      return {
        title: 'Rate Limit Exceeded',
        message: 'Too many requests. Please wait a moment before trying again.',
        suggestion: 'Wait a minute and retry'
      };
    }

    // Server errors
    if (errorMessage.includes('500') || errorMessage.includes('503') || errorMessage.includes('server')) {
      return {
        title: 'Server Error',
        message: 'The AI service is temporarily unavailable.',
        suggestion: 'Try again in a few moments'
      };
    }

    // Timeout errors
    if (errorMessage.includes('timeout')) {
      return {
        title: 'Request Timeout',
        message: 'The request took too long to complete.',
        suggestion: 'Try a shorter message or retry'
      };
    }

    // Default error
    return {
      title: 'Error',
      message: error.message || 'An unexpected error occurred.',
      suggestion: 'Try again or contact support'
    };
  };

  return (
    <div
      className={`assistant-wrapper ${isOpen ? "" : "show-bubble"}`}
      ref={assistantRef}
    >
      {!isOpen && (
        <button
          className={`assistant-toggle ${isOpen ? "hide-tooltip" : ""}`}
          onClick={toggleChat}
        >
          <img src="icons/catdog.png" alt="Open Chat" />
        </button>
      )}

      {isOpen && (
        <div
          className={`assistant-container ${isResizing ? 'is-resizing' : ''} ${isDragging ? 'is-dragging' : ''}`}
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            bottom: `${position.bottom}px`,
            right: `${position.right}px`,
          }}
        >
          {/* Resize Handles */}
          <div
            className="resize-handle resize-handle-top"
            onMouseDown={(e) => handleResizeStart(e, 'top')}
            aria-label="Resize from top"
          />
          <div
            className="resize-handle resize-handle-left"
            onMouseDown={(e) => handleResizeStart(e, 'left')}
            aria-label="Resize from left"
          />
          <div
            className="resize-handle resize-handle-corner"
            onMouseDown={(e) => handleResizeStart(e, 'corner')}
            aria-label="Resize from corner"
          />

          {/* Header */}
          <div
            className="assistant-header"
            onMouseDown={handleDragStart}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="assistant-header-content">
              <div className="header-left">
                <h3>AI Assistant</h3>
                <div
                  className={`connection-status ${
                    error ? 'disconnected' :
                    status === 'streaming' || status === 'submitted' ? 'active' :
                    'connected'
                  }`}
                  title={
                    error ? 'Disconnected' :
                    status === 'streaming' ? 'Receiving response...' :
                    status === 'submitted' ? 'Sending message...' :
                    'Connected'
                  }
                >
                  <span className="status-dot"></span>
                  <span className="status-text">
                    {error ? 'Offline' :
                     status === 'streaming' ? 'Receiving' :
                     status === 'submitted' ? 'Sending' :
                     'Online'}
                  </span>
                </div>
                <img
                  src="icons/catdog.png"
                  alt="Assistant Avatar"
                  className="assistant-avatar-icon"
                  onClick={toggleChat}
                  title="Close chat"
                />
              </div>
              <div className="header-controls">
                <button
                  className="help-button"
                  onClick={toggleHelpOptions}
                  aria-label={isHelpOptionsVisible ? "Hide helpful suggestions" : "Show helpful suggestions"}
                  aria-expanded={isHelpOptionsVisible}
                  aria-haspopup="menu"
                  title="Get suggestions"
                >
                  <HiSparkles />
                </button>
                <button
                  className="size-preset-btn"
                  onClick={() => setSizePreset('compact')}
                  title="Compact size"
                  aria-label="Set compact size"
                >
                  <span className="size-indicator small"></span>
                </button>
                <button
                  className="size-preset-btn"
                  onClick={() => setSizePreset('default')}
                  title="Default size"
                  aria-label="Set default size"
                >
                  <span className="size-indicator medium"></span>
                </button>
                <button
                  className="size-preset-btn"
                  onClick={() => setSizePreset('large')}
                  title="Large size"
                  aria-label="Set large size"
                >
                  <span className="size-indicator large"></span>
                </button>
                <button
                  className="clear-button"
                  onClick={handleClearClick}
                  title="Clear conversation"
                  disabled={messages.length === 0}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>

          {/* Clear confirmation dialog */}
          {showClearConfirm && (
            <div className="confirm-overlay">
              <div className="confirm-dialog">
                <h4>Clear Conversation?</h4>
                <p>This will permanently delete all messages in this conversation.</p>
                <div className="confirm-actions">
                  <button
                    className="confirm-button cancel"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-button confirm"
                    onClick={clearConversation}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile backdrop */}
          {isHelpOptionsVisible && (
            <div
              className="help-menu-backdrop"
              onClick={closeHelpOptions}
              aria-hidden="true"
            />
          )}

          {/* Help options */}
          <div
            className={`help-options ${
              isHelpOptionsVisible ? "help-options-visible" : ""
            }`}
            role="menu"
            aria-label="Suggested questions"
          >
            <div className="help-options-header">
              <h4>Quick Questions</h4>
              <button
                className="help-close-btn"
                onClick={closeHelpOptions}
                aria-label="Close suggestions"
              >
                ×
              </button>
            </div>
            {helpOptions.map((option, index) => (
              <div
                key={index}
                className="help-option"
                onClick={() => handleHelpOptionClick(option)}
                role="menuitem"
                tabIndex={isHelpOptionsVisible ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleHelpOptionClick(option);
                  }
                }}
              >
                {option}
              </div>
            ))}
          </div>

          {/* Chat box UI */}
          <div className="assistant-chat">
            <div className="messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.role}`}>
                  <div className="message-content-wrapper">
                    <img
                      src={message.role === "user" ? userIcon : assistantIcon}
                      alt={message.role}
                    />
                    <div className="message-text">
                      <div className="markdown-content">
                        <ReactMarkdown>
                          {message.parts
                            .filter((part: any) => part.type === "text")
                            .map((part: any) => part.text)
                            .join("")}
                        </ReactMarkdown>
                      </div>
                      <span className="message-time">{formatTime(new Date())}</span>
                    </div>
                  </div>
                  <div className="message-actions">
                    {message.role === "assistant" && (
                      <div className="feedback-buttons">
                        <button
                          className={`feedback-button ${messageFeedback[message.id] === 'up' ? 'active' : ''}`}
                          onClick={() => handleFeedback(message.id, 'up')}
                          title="Helpful response"
                          aria-label="Thumbs up"
                        >
                          <FiThumbsUp />
                        </button>
                        <button
                          className={`feedback-button ${messageFeedback[message.id] === 'down' ? 'active' : ''}`}
                          onClick={() => handleFeedback(message.id, 'down')}
                          title="Not helpful"
                          aria-label="Thumbs down"
                        >
                          <FiThumbsDown />
                        </button>
                      </div>
                    )}
                    <button
                      className="copy-button"
                      onClick={() => copyMessage(
                        message.parts
                          .filter((part: any) => part.type === "text")
                          .map((part: any) => part.text)
                          .join("")
                      )}
                      title="Copy message"
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
              {(status === "submitted" || status === "streaming") && (
                <div className="message assistant typing">
                  <img src={assistantIcon} alt="assistant" />
                  <span className="typing-text">
                    {status === "submitted" ? "AI is thinking..." : "Streaming response..."}
                  </span>
                  {status === "streaming" && (
                    <button
                      className="stop-button"
                      onClick={() => stop()}
                      title="Stop generating"
                    >
                      Stop
                    </button>
                  )}
                </div>
              )}
              {error && (
                <div className="error-container">
                  <div className="error-message">
                    <img src={assistantIcon} alt="assistant" />
                    <div className="error-content">
                      <p className="error-title">⚠️ {getErrorDetails(error).title}</p>
                      <p className="error-details">{getErrorDetails(error).message}</p>
                      <p className="error-suggestion">💡 {getErrorDetails(error).suggestion}</p>
                      <button
                        className="retry-button"
                        onClick={handleRetry}
                        title="Retry last message"
                      >
                        <MdRefresh /> Retry Message
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <img src={inputIcon} alt="Input Icon" className="input-icon" />
              <textarea
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={status !== "ready"}
                rows={1}
                aria-label="Chat message input"
                aria-describedby="assistant-input-hint"
              />
              <span id="assistant-input-hint" className="sr-only">
                Press Enter to send, Shift+Enter for new line
              </span>
              {recognitionRef.current && (
                <button
                  className={`voice-button ${isListening ? "listening" : ""}`}
                  onClick={toggleVoiceInput}
                  disabled={status !== "ready"}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  🎤
                </button>
              )}
              <button
                onClick={handleSend}
                disabled={status !== "ready" || !input.trim()}
              >
                {status === "streaming" ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;
