import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import "../assets/scss/_ChatBox.scss";
import userIcon from "/icons/kalilinux-svgrepo-com.svg";
import assistantIcon from "/icons/linux-tux-svgrepo-com.svg";
import messageIcon from "/icons/arch-linux-svgrepo-com(2).svg";
import { HiSparkles } from "react-icons/hi2";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";

export const ChatBox = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isHelpMenuVisible, setIsHelpMenuVisible] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [messageFeedback, setMessageFeedback] = useState<Record<string, 'up' | 'down' | null>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const helpSuggestions = [
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

  // Toggle help menu visibility
  const toggleHelpMenu = () => {
    setIsHelpMenuVisible(!isHelpMenuVisible);
  };

  // Method to update chat input with a suggestion
  const handleSuggestionSelect = (suggestion: string) => {
    setInput(suggestion);
    setIsHelpMenuVisible(false);
  };

  // Handle send message
  const handleSend = () => {
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  // Send message on Enter, new line on Shift + Enter
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    const chatInput = document.getElementById("chat-input");
    if (chatInput) chatInput.focus();
  }, [messages, status]);

  return (
    <div className="chat-box">
      <div className="chat-header">
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
        </div>
        <button
          className="clear-button"
          onClick={handleClearClick}
          title="Clear conversation"
          disabled={messages.length === 0}
        >
          🗑️
        </button>
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

      <button
        className="help-button"
        onClick={toggleHelpMenu}
        aria-label="Show helpful suggestions"
        title="Get suggestions"
      >
        <HiSparkles />
      </button>
      {isHelpMenuVisible && (
        <div className="help-menu">
          <ul>
            {helpSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="conversation">
        {messages.map((message) => (
          <div key={message.id} className={`exchange ${message.role}`}>
            <div
              className={
                message.role === "user" ? "user-message" : "assistant-message"
              }
            >
              <div className="message-content">
                <img
                  src={message.role === "user" ? userIcon : assistantIcon}
                  alt={`${message.role} icon`}
                  className={`chat-head-icon ${message.role}-icon`}
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
          </div>
        ))}

        {(status === "submitted" || status === "streaming") && (
          <div className="typing-indicator">
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
        <img src={messageIcon} alt="Message Icon" className="input-icon" />
        <textarea
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here"
          disabled={status !== "ready"}
          rows={1}
        />
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
  );
};
