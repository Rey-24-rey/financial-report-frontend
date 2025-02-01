import React from 'react';

const PayPalDonateButton = () => {
  return (
    <div className="git-button-container flex items-center justify-center mt-16">
      <a 
        href="https://www.paypal.com/donate/?hosted_button_id=H66NE985RU6BS" 
        target="_blank" 
        rel="noopener noreferrer"
        className="paypal-btn flex items-center justify-center"
      >
        {/* Image (Gift) */}
        <div className="image-container">
          <img src="/gift.webp" alt="Gift" className="gift-image" />
        </div>

        {/* Text inside the button */}
        <span className="button-text">Gift $ Me</span>
      </a>
    </div>
  );
};

export default PayPalDonateButton;




