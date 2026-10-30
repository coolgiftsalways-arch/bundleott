import React from "react";
import "./WhatsAppFloat.css";

const WhatsAppFloat = () => {
  // Replace with your WhatsApp Business number.
  // Include country code, without + or spaces.
const phoneNumber = "919136305711";

const message = encodeURIComponent(
  "Hi BundleUpOTT! I need some assistance with your subscriptions."
);

const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappURL}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with BundleUpOTT on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.01 3C8.84 3 3.01 8.83 3.01 16c0 2.29.6 4.53 1.75 6.5L3 29l6.66-1.74A12.93 12.93 0 0 0 16 29h.01C23.18 29 29 23.17 29 16S23.18 3 16.01 3Zm0 23.75h-.01a10.8 10.8 0 0 1-5.5-1.51l-.4-.24-3.95 1.04 1.06-3.85-.26-.42A10.75 10.75 0 1 1 16.01 26.75Zm5.9-8.06c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.84-1.59-1.88-1.77-2.2-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55l-.62-.01c-.22 0-.57.08-.87.4-.3.32-1.14 1.1-1.14 2.68 0 1.59 1.16 3.12 1.32 3.33.16.22 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z" />
      </svg>

      <span>Chat with us</span>
    </a>
  );
};

export default WhatsAppFloat;