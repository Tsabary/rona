
import "./styles.scss";
import React from "react";
const Social = () => {
  return (
    <div className="social">
      <div className="social__icon--instagram">
        <a href="https://www.instagram.com/justaskbillie/" target="_blank">
          <svg className="social__icon social__icon--instagram-icon">
            <use xlinkHref="./sprite.svg#instagram"></use>
          </svg>
        </a>
      </div>

      <div className="social__icon--twitter">
        <a href="https://twitter.com/ask_billie" target="_blank">
          <svg className="social__icon social__icon--twitter-icon">
            <use xlinkHref="./sprite.svg#twitter"></use>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Social;
