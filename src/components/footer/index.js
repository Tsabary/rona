import "./styles.scss";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import history from "../../history";

import { setCurrentPage } from "../../actions";
import SocialLinks from "../social";

const Footer = ({ setCurrentPage }) => {
  const myHistory = useHistory(history);

  const handleChange = (page, path) => {
    setCurrentPage(page);
    myHistory.push(`/${path}`);
    window.scrollTo(0, 0);
  };

  const renderMenuItems = items => {
    return items.map(group => {
      return (
        <div className="footer__section-contents" key={group.title}>
          <div className="footer__section-title" key={group.title}>
            {group.title}
          </div>
          {group.pages.map(page => {
            return (
              <div
                className="footer__section-item"
                key={page}
                onClick={() => handleChange(page.title, page.path)}
              >
                {page.title}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="footer">
      <div className="footer__section">
        <div className="footer__logo">Ask Billie</div>
        <div className="footer__rights">All rights reserved</div>
      </div>

      {renderMenuItems([
        {
          title: "Pages",
          pages: [
            { title: "Home", path: "" },
            { title: "About", path: "about" }
          ]
        },

        {
          title: "Company",
          pages: [
            { title: "Careers", path: "careers" },
            { title: "Contact", path: "contact" }
          ]
        },

        {
          title: "Support",
          pages: [
            { title: "Privacy Policy", path: "privacy-Policy" },
            { title: "Terms and Conditions", path: "terms-and-conditions" }
          ]
        }
      ])}

      <div className="footer__section-contents">
        <div className="footer__section-title">Stay in touch</div>
        <SocialLinks />
      </div>
    </div>
  );
};

export default connect(null, { setCurrentPage })(Footer);
