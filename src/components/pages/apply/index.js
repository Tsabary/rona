import "./styles.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { fetchSinglePosition } from "../../../actions";
import InputField from "../../formComponents/inputField";
import TextArea from "../../formComponents/textArea";

const Apply = ({ match, positions, fetchSinglePosition }) => {
  const [values, setValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [uploadButton, setUploadButton] = useState("Attach Resume/CV");
  const [sent, setSent] = useState(false);
  const [position, setPosition] = useState(null);
  const [formError, setFormError] = useState(null);

  const errorMessages = {
    name: "Please enter your name",
    email: "Please enter an email"
  };

  const handleFileUpload = file => {
    setCvUploaded(true);
    setUploadButton(file[0].name.substring(0, 20) + "...");
  };

  const checkFormValidity = () => {
    switch (true) {
      case !values.name:
        setFormError(errorMessages.name);
        return false;

      case !values.email:
        setFormError(errorMessages.email);
        return false;

      default:
        return true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const variables = {
      name: values.name,
      email: values.email,
      phone: values.phone || "",
      current_company: values.current_company || "",
      linkedin: values.linkedin || "",
      twitter: values.twitter || "",
      github: values.github || "",
      portfolio: values.portfolio || "",
      other_url: values.other_url || "",
      cover: values.cover || ""
    };

    if (checkFormValidity())
      window.emailjs
        .send(
          "gmail",
          "job_application",
          variables,
          "user_4uUmAai6RtA9YV71Jr51c"
        )
        .then(res => {
          setSent(true);
          setValues({});
          setSubmitting(true);
          setFormError(null);
          console.log("Email successfully sent!");

        })
        .catch(err =>
          console.error(
            "Oh well, you failed. Here some thoughts on the error that occured:",
            err
          )
        );
  };

  useEffect(() => {
    if (positions.length) {
      //if the user is logged in and has projects in the reducer, then find the project with the id matching to the id from the url, set that project as the current project, and fetch all the relevant data
      positions.map(element => {
        if (element.id === match.params.id) {
          setPosition(element);
        }
      });
    } else {
      // if the positions are empty, then this probably means that they've came directly to this address. In that case, feth this current position and all it's data. After that happened succefully, this if statement would be executed again only this time the first condition would be met.
      fetchSinglePosition(match.params.id, setPosition);
    }

    window.scrollTo(0, 0);
  }, [positions]);

  const renderIntro = () => {
    const sections = [
      {
        title: "What Ask Billie all about?",
        body: "Ask Billie wo we are."
      },
      {
        title: "What does the product do?",
        body: "Ask Billie product description."
      }
    ];

    return sections.map(el => {
      return (
        <div className="apply__section">
          <div className="apply__section-title medium-margin-top">
            {el.title}
          </div>
          <div className="apply__section-body">{el.body}</div>
        </div>
      );
    });
  };

  const renderList = list => {
    return list.map(el => {
      return <li>{el}</li>;
    });
  };

  return (
    <div className="apply">
      <div className="apply__details">
        {renderIntro()}

        {position ? (
          <div className="apply__section">
            <div className="apply__section-title medium-margin-top">
              Responsibilities:
            </div>
            <div className="apply__section-body">
              <ul>{renderList(position.responsibilities)}</ul>
            </div>
          </div>
        ) : null}

        {position ? (
          <div className="apply__section">
            <div className="apply__section-title medium-margin-top">
              Skills &#38; Qualifications:
            </div>
            <div className="apply__section-body">
              <ul>{renderList(position.skills_and_qualifications)}</ul>
            </div>
          </div>
        ) : null}

        {position ? (
          <div className="apply__section">
            <div className="apply__section-title medium-margin-top">More:</div>
            <div className="apply__section-body">
              <ul>{renderList(position.more)}</ul>
            </div>
          </div>
        ) : null}
      </div>

      {!sent ? (
        <div className="apply__form">
          <div className="apply__section-title small-margin-bottom medium-margin-top">
            Apply now
          </div>
          {submitting ? (
            <div className="centered">
              <Loader
                type="Grid"
                color="#1472FF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          ) : (
            <form onSubmit={e => e.preventDefault()}>
              <label htmlFor="upload-resume" className="apply__upload-label">
                <div className="boxed-button">{uploadButton}</div>
                {cvUploaded ? "File Added Succefully!" : null}
              </label>
              <input
                id="upload-resume"
                className="update-profile__upload"
                type="file"
                onChange={e => handleFileUpload(e.target.files)}
              />

              <InputField
                type="text"
                placeHolder="Full name"
                value={!!values && values.name}
                onChange={name => setValues({ ...values, name })}
                label="Full name"
              />

              <InputField
                type="text"
                placeHolder="Email"
                value={!!values && values.email}
                onChange={email => setValues({ ...values, email })}
                label="Email"
              />

              <InputField
                type="text"
                placeHolder="Phone"
                value={!!values && values.phone}
                onChange={phone => setValues({ ...values, phone })}
                label="Phone"
              />

              <InputField
                type="text"
                placeHolder="Current Company"
                value={!!values && values.current_company}
                onChange={current_company =>
                  setValues({ ...values, current_company })
                }
                label="Current Company"
              />

              <div className="apply__section-title small-margin-bottom small-margin-top">
                Relevant Links
              </div>

              <InputField
                type="text"
                placeHolder="LinkedIn"
                value={!!values && values.linkedin}
                onChange={linkedin => setValues({ ...values, linkedin })}
                label="LinkedIn"
              />

              <InputField
                type="text"
                placeHolder="Twitter"
                value={!!values && values.twitter}
                onChange={twitter => setValues({ ...values, twitter })}
                label="Twitter"
              />

              <InputField
                type="text"
                placeHolder="Github"
                value={!!values && values.github}
                onChange={github => setValues({ ...values, github })}
                label="Github"
              />

              <InputField
                type="text"
                placeHolder="Portfolio"
                value={!!values && values.portfolio}
                onChange={portfolio => setValues({ ...values, portfolio })}
                label="Portfolio"
              />

              <InputField
                type="text"
                placeHolder="Other"
                value={!!values && values.other}
                onChange={other => setValues({ ...values, other })}
                label="Other"
              />

              <div className="apply__section-title small-margin-bottom small-margin-top">
                Additional Info
              </div>

              <TextArea
                type="text"
                placeHolder="Anything else that you'd like us to know"
                value={!!values && values.cover}
                onChange={cover => setValues({ ...values, cover })}
                label="Anything else that you'd like us to know"
              />

              {formError ? (
                <div className="form-error small-margin-top">{formError}</div>
              ) : null}
              <div className="popup__button small-margin-top justify-end">
                <button
                  type="button"
                  className="boxed-button"
                  onClick={handleSubmit}
                >
                  Send Application
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="apply__success">
          Thank you! We've received your application and would get in touch
          soon!
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    positions: state.positions
  };
};

export default connect(mapStateToProps, { fetchSinglePosition })(Apply);
