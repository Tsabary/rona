import "./styles.scss";
import React, { useEffect, useState } from "react";

import InputField from "../../formComponents/inputField";
import RadioField from "../../formComponents/radioField";
import ToggleField from "../../formComponents/toggleField";
import TextArea from "../../formComponents/textArea";
import RichTextEditor from "../../formComponents/richTextEditor";

const Item = ({ values, setValues, setImageObj }) => {

  const [selectedImage, setSelectedImage] = useState(null);

  const myHandleImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setSelectedImage(URL.createObjectURL(image));
      setImageObj(image);
    }
  };

  const renderImage = () => {
    switch (true) {
      case !!selectedImage:
        return <img className="cover-image clickable" src={selectedImage} />;

      case !!values && !!values.image:
        return <img className="cover-image clickable" src={values.image} />;

      default:
        return (
          <div className="new-item__image-empty-1">
            <div className="new-item__image-empty-2">Pick a Pic</div>
          </div>
        );
    }
  };

  return (
    <div>
      <label htmlFor="image" className="new-event__label">
        <div className="new-item__image-container">
          <div className="cover-image__container">{renderImage()}</div>
        </div>
      </label>

      <input
        id="image"
        className="new-item__upload"
        type="file"
        onChange={myHandleImageChange}
      />

      <InputField
        type="text"
        placeHolder="Title"
        label="Title"
        value={(values && values.title) || ""}
        onChange={title => setValues({ ...values, title })}
      />
      <TextArea
        type="text"
        placeHolder="A bit more about the content of this.."
        value={(values && values.summary) || ""}
        onChange={summary => setValues({ ...values, summary })}
        label="Text area"
      />

      <RichTextEditor
        onChange={content => setValues({ ...values, content })}
        value={!!values && values.content}
      />

      <div className="flex-group small-margin-top">
        <RadioField
          id="option-1"
          name="topic_of_buttons"
          text="I want option 1"
          toggleOn={value => setValues({ ...values, topic_of_buttons: value })}
          label="staticText"
          value={0}
        />
        <RadioField
          id="option-2"
          name="topic_of_buttons"
          text="I want option 2"
          toggleOn={value => setValues({ ...values, topic_of_buttons: value })}
          label="staticText"
          value={1}
        />
      </div>

      <div>
        <ToggleField
          text="Default option"
          isChecked={true}
          toggleOn={() => null}
          toggleOff={() => null}
        />
        <ToggleField
          text="just another option option"
          toggleOn={() => null}
          toggleOff={() => null}
        />
      </div>
    </div>
  );
};

export default Item;
