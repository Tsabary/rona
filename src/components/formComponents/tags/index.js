import "./styles.scss";
import React, { useState } from "react";
import { connect } from "react-redux";

import InputField from "../inputField";

const Tags = ({
  tags,
  values,
  setValues,
  errorMessages,
  formError,
  setFormError
}) => {
  const [tagInput, setTagInput] = useState("");
  const [tagsSuggestions, setTagsSuggestions] = useState(null);

  const renderTagsSuggestions = (suggestions, existing) => {
    console.log(existing);
    return suggestions
      .filter(tag => {
        return !existing.includes(Object.keys(tag)[0]);
      })
      .sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];

        return a[keyA] < b[keyB] ? 1 : -1;
      })
      .slice(0, 10)
      .map(tag => {
        const key = Object.keys(tag)[0];
        return (
          <div
            className="tag tag-suggestion"
            onClick={() => addTag(key)}
            key={key}
          >
            {key}
            {"  "}
            <span className="tag-suggestion__count">{tag[key]}</span>
          </div>
        );
      });
  };

  const renderSuggestionsContainer = (suggestions, existing) => {
    return (
      <div className="tags small-margin-top">
        <div className="small-margin-bottom">Tag suggestions</div>
        {renderTagsSuggestions(suggestions, existing)}
      </div>
    );
  };

  const filterTags = input => {
    return tags.filter(el => {
      return Object.keys(el)[0].startsWith(input);
    });
  };

  const handleTagInputChange = input => {
    setTagInput(input);
    setTagsSuggestions(input ? filterTags(input) : null);
  };

  const addTag = newTag => {
    if (!(values && values.tags)) values.tags = [];
    if (values.tags.includes(newTag) || !newTag.length) return;
    if (values.tags.length === 10) {
      setFormError(errorMessages.tagsMax);
      return;
    }
    setValues({
      ...values,
      tags: [...values.tags, newTag]
    });
    setTagInput("");
  };

  const handleKeyPress = event => {
    event.stopPropagation();
    if (event.key === "Enter") {
      addTag(
        tagInput
          .toLowerCase()
          .split(" ")
          .join("-")
      );
      return false;
    }
  };

  const removeTag = tag => {
    setValues({ tags: values.tags.filter(el => el !== tag) });
    if (formError === errorMessages.tagsMax) setFormError("");
  };

  const renderTags = tags => {
    return tags.map(el => {
      return (
        <div
          className="tag tag-selected"
          onClick={() => removeTag(el)}
          key={el}
        >
          {el}
        </div>
      );
    });
  };

  return (
    <div className="tiny-margin-bottom">
      <div className="tags__container">
        <InputField
          type="text"
          placeHolder="Add related tags (for example 'Hosting' or 'Domain')"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleKeyPress}
          label="Hit 'Enter' to save tags"
        />
        <div
          className="tags__submit"
          onClick={() =>
            addTag(
              tagInput
                .toLowerCase()
                .split(" ")
                .join("-")
            )
          }
        >
          &rarr;
        </div>
      </div>

      {tagsSuggestions
        ? renderSuggestionsContainer(
            tagsSuggestions,
            values.tags ? values.tags : []
          )
        : null}

      <div className="tags">
        {values && values.tags ? renderTags(values.tags) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { tags: state.tags };
};

export default connect(mapStateToProps)(Tags);
