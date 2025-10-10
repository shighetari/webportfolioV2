// src/components/ContactDialog.tsx
import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import CloseButton from './CloseButton';
import { FaLinkedin, FaGithub, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import '../assets/scss/_ContactDialog.scss';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ isOpen, onClose }) => {
  const [state, handleSubmit] = useForm("myzndjbr");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle successful submission
  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content contact-dialog">
        <CloseButton onClick={onClose} />
        <h2>Get In Touch</h2>

        <div className="social-media-icons">
          <a href="https://www.linkedin.com/in/developerbarrios" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <FaLinkedin size={40} />
          </a>
          <a href="https://github.com/shighetari" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <FaGithub size={40} />
          </a>
        </div>

        <form onSubmit={handleSubmit} className={`contact-form ${state.succeeded ? 'success' : ''}`}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={state.submitting || state.succeeded}
              required
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state.submitting || state.succeeded}
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              disabled={state.submitting || state.succeeded}
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          {state.errors && state.errors.length > 0 && !state.errors.some(e => e.field) && (
            <div className="form-message error">
              <FaExclamationCircle /> Failed to send message. Please try again.
            </div>
          )}

          {state.succeeded && (
            <div className="form-message success">
              <FaCheckCircle /> Message sent successfully! I'll get back to you soon.
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={state.submitting || state.succeeded}
          >
            {state.submitting ? 'Sending...' : state.succeeded ? 'Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactDialog;
