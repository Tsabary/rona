import "./styles.scss";
import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <h2>Trying to reach us?</h2>

      <div className="paragraph centered-text">
        Get in touch via email or contact us on our social media accounts
      </div>

      <div className="paragraph centered-text">frothinweirdos@gmail.com</div>
      <div className="social centered">
        <a href="https://www.facebook.com/frothinweirdos" target="_blank">
          <svg className="social__icon social__icon--facebook">
            <use xlinkHref="./sprite.svg#icon-facebook"></use>
          </svg>
        </a>
        <a href="https://www.instagram.com/frothinweirdos/" target="_blank">
          <svg className="social__icon social__icon--instagram">
            <use xlinkHref="./sprite.svg#icon-instagram"></use>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Contact;
