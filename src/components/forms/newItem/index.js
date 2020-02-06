import "./styles.scss";
import React, { useState } from "react";
import { connect } from "react-redux";

import InputField from "../../formComponents/inputField";
import RadioField from "../../formComponents/radioField";
import ToggleField from "../../formComponents/toggleField";
import TextArea from "../../formComponents/textArea";
import TextEditor from "../../formComponents/textEditor";
import RichTextEditor from "../../formComponents/richTextEditor";

import { newItem } from "../../../actions";

const NewItem = ({ newItem }) => {
  const [values, setValues] = useState({});

  return (
    <div className="popup" id="new-item">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Create a new item</div>
        <form onSubmit={() => newItem(values)}>
          <InputField
            type="text"
            placeHolder="This is a simple input field"
            label="Simple input field"
            value={values.input_field}
            onChange={input_field => setValues({ ...values, input_field })}
          />
          <TextArea
            type="text"
            placeHolder="This is a text area"
            value={values.text_area}
            onChange={text_area => setValues({ ...values, text_area })}
            label="Text area"
          />

          <RichTextEditor
            onChange={actual_content =>
              setValues({ ...values, actual_content })
            }
          />
          {/* <TextEditor
            placeholder="This is for actual content.."
            onChange={actual_content =>
              setValues({ ...values, actual_content })
            }
          /> */}

          <div className="flex-group small-margin-top">
            <RadioField
              id="option-1"
              name="topic_of_buttons"
              text="I want option 1"
              toggleOn={value =>
                setValues({ ...values, topic_of_buttons: value })
              }
              label="staticText"
              value={0}
            />
            <RadioField
              id="option-2"
              name="topic_of_buttons"
              text="I want option 2"
              toggleOn={value =>
                setValues({ ...values, topic_of_buttons: value })
              }
              label="staticText"
              value={1}
            />
          </div>

          <div>
            <ToggleField
              text="Default option"
              isChecked={true}
              toggleOn={() => console.log("Toggled on")}
              toggleOff={() => console.log("Toggled off")}
            />
            <ToggleField
              text="just another option option"
              toggleOn={() => console.log("Toggled on")}
              toggleOff={() => console.log("Toggled off")}
            />
          </div>
          <div className="popup__button medium-margin-top">
            <button type="submit" className="boxed-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { newItem })(NewItem);
