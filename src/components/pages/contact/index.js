import "./styles.scss";
import React, { useState } from "react";
import InputField from "../../formComponents/inputField";
import TextArea from "../../formComponents/textArea";

const Contact = () => {
  const [values, setValues] = useState({
    email: "",
    content: ""
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const variables = {
      message_html: values.content,
      from_email: values.email
    };

    window.emailjs
      .send("gmail", "contact", variables, "user_fzDIZiprZ4VhK2PHjoxMi")
      .then(res => {
        setSent(true);
        console.log("Email successfully sent!");
      })
      .catch(err =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );

    setValues({});
  };

  return (
    <div className="contact medium-margin-bottom">
    <h2>
      Do you have any questions? Suggestions?
      <br />
      Experiencing any bugs? We're here for you.
    </h2>

    {!sent ? (
      <form onSubmit={handleSubmit} className="small-margin-top">
        <InputField
          type="email"
          placeHolder="Email address"
          value={values.email}
          onChange={email => setValues({ ...values, email })}
          label="Email"
        />

        <TextArea
          type="text"
          placeHolder="What would you like to tell us?"
          value={values.content}
          onChange={content => setValues({ ...values, content })}
          label="What would you like to tell us?"
        />
        <button type="submit" className="boxed-button small-margin-top justify-end">
          Send
        </button>
      </form>
    ) : (
      <div>
        Thank you! We've received your message and would get in touch soon!
      </div>
    )}
  </div>
  );
};

export default Contact;
