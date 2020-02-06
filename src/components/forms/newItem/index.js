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
import TextButton from "../../formComponents/textButton";

const NewItem = ({ newItem }) => {
  const [values, setValues] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setSelectedImage(URL.createObjectURL(image));
      setImageObj(image);
    }
  };

  const onSubmit = is_public => {
    newItem({ ...values, is_public }, imageObj);
  };

  return (
    <div className="popup" id="new-item">
      <a className="popup__close" href="#">
        Close
      </a>
      <div className="popup__container">
        <div className="popup__title">Create a new item</div>
        <form
          onSubmit={() => {
            onSubmit(true);
          }}
        >
          <label htmlFor="image" className="new-event__label">
            <div className="new-item__image-container">
              <div className="cover-image__container">
                {selectedImage ? (
                  <img className="cover-image clickable" src={selectedImage} />
                ) : (
                  <div className="new-item__image-empty-1">
                    <div className="new-item__image-empty-2">Pick a Pic</div>
                  </div>
                )}
              </div>
            </div>
          </label>

          <input
            id="image"
            className="new-item__upload"
            type="file"
            onChange={handleImageChange}
          />

          <InputField
            type="text"
            placeHolder="Title"
            label="Title"
            value={values.title}
            onChange={title => setValues({ ...values, title })}
          />
          <TextArea
            type="text"
            placeHolder="A bit more about the content of this.."
            value={values.summary}
            onChange={summary => setValues({ ...values, summary })}
            label="Text area"
          />

          <RichTextEditor
            onChange={content => setValues({ ...values, content })}
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
          <div
            className="new-item__save centered small-margin-top"
            onClick={() => {
              onSubmit(false);
            }}
          >
            Save for later
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { newItem })(NewItem);
