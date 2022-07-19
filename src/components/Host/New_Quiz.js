import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editingQuiz } from "../../Ducks/Reducer";

function New_Quiz(props) {
  const [quiz_name, setQuiz_name] = useState("");
  const [info, setInfo] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleInput = (e) => {
    setQuiz_name(e.target.value);
  };

  const handleTextarea = (e) => {
    setInfo(e.target.value);
  };

  const createQuiz = () => {
    axios
      .post("/api/newquiz", {
        name: quiz_name,
        info: info,
      })
      .then((res) => {
        props.editingQuiz(res.data[0]);
        setRedirect(true);
      });
  };
  if (redirect) {
    return <Redirect to="/host/questions" />;
  }

  return (
    <div className="mapped-container">
      <div className="new-kwizz-form">
        <label className="kwizz-desc kwizz-info">New Kwizz Title</label>
        <input className="title-input" onChange={handleInput} type="text" />
        <label className="kwizz-desc kwizz-info">Description</label>
        <textarea className="desc-input" onChange={handleTextarea}></textarea>
        <div className="kwizz-info ok-go-div">
          <button onClick={createQuiz} className="btn-play  ok-go">
            Ok, Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { editingQuiz })(New_Quiz);
