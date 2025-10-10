import React from "react";
import "../assets/scss/_ContactButton.scss";
import ContactIcon from "/icons/eyecontact.svg";

interface ContactButtonProps {
  onClick: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ onClick }) => {
  return (
    <button
      className="contactme-button"
      onClick={onClick}
      aria-label="Open contact dialog"
      title="Get in touch"
      type="button"
    >
      <img
        src={ContactIcon}
        alt=""
        role="presentation"
      />
    </button>
  );
};

export default ContactButton;
