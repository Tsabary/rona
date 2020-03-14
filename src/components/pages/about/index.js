import "./styles.scss";
import React from "react";
import Principle from "./principle";

import { ReactSVG } from "react-svg";

const Careers = () => {
  const renderPrinciples = () => {
    {
      /*innovative simplicity
      affordability
      team work*/
    }

    {
      /*  */
    }
    const principles = [
      {
        title: "Innovative Simplicity",
        content:
          "For every tool we build we have one main question on our mind || How can we make it so everyone knows how to use it?",
        img: "problem_solving"
      },
      {
        title: "Affordability",
        content:
          "When you're first starting out a business, money is scarce.|| We want our tools to be affordable to any innovator, so their great ideas would reach millions.",
        img: "report_analysis"
      },
      {
        title: "Team Work",
        content:
          "The best things in life happen when we work together. || We put team work at the top of our concerns when building new tools.",
        img: "brainstorming"
      }
    ];

    return principles.map(principle => {
      return <Principle principle={principle} />;
    });
  };

  return (
    <div className="about">
      <div className="about__mission section-1">
        <div className="message-ill">
          <ReactSVG src="./ills/super_man.svg" />
        </div>

        <div className="about__header-message">
          <div className="message-bold">Great Branding</div>
          <div className="message-body">
            Should be fun. We want to make quality branding tools accesible for
            teams and individuals.
          </div>
        </div>
      </div>

      <div className="about__mission section-2">
        <div className="about__header-message">
          <div className="message-bold">Naming your Brand isn't Easy</div>
          <div className="message-body">
            Our naming tool which is powered with AI, helps you come up with
            unique ideas for the name of your product.
          </div>
        </div>
        <div className="message-ill">
          <ReactSVG src="./ills/mind_map.svg" />
        </div>
      </div>

      <div className="about__mission section-1">
        <div className="message-ill">
          <ReactSVG src="./ills/money_jar.svg" />
        </div>

        <div className="about__header-message">
          <div className="message-bold">Startup are Low on Funding</div>
          <div className="message-body">
            But that shouldn't stand between you and amazing branding. We love
            innovation and want to help you succeed, so we keep our tools free
            for small teams.
          </div>
        </div>
      </div>

      <div className="about__principles medium-margin-top">
        <div className="centered">
          <h2>Our Core Principles</h2>
        </div>
        <div className="about__principles-cards small-margin-top big-margin-bottom">
          {renderPrinciples()}
        </div>
      </div>
    </div>
  );
};

export default Careers;
