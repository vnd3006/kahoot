import React, { useState, useEffect } from "react";
import api from "../../service/api";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Host-New-Question.css";
import "./Host.css";

export default function New_Question(props) {
  const [questionInfo, setQuestionInfo] = useState({
    id: 0,
    question: "",
    asnwer1: "",
    asnwer2: "",
    answer3: "",
    answer4: "",
    correctAnswer: "",
    redirect: false,
  });
  

  const addQuestion = () => {
    let { question, answer1, answer2, answer3, answer4, correctAnswer } =
      questionInfo;
    let { id } = props.match.params;
    if (question && answer1 && answer2 && answer3 && answer4 && correctAnswer) {
      api
        .post("/api/newquestion", {
          question,
          answer1,
          answer2,
          answer3,
          answer4,
          correctAnswer,
          id,
        })
        .then((res) => {
          if (res.status === 200) {
            setQuestionInfo((prevState) => {
              return {
                ...prevState,
                redirect: true,
              };
            });
          } else {
            alert("Something went wrong :(");
          }
        });
    } else {
      alert("All fields must be completed");
    }
  };
  console.log('qqqqqqqqq',questionInfo)
  if (questionInfo.redirect) {
    return <Redirect to="/host/questions" />;
  }

  const changeHandler = (e) => setQuestionInfo({
    ... questionInfo, 
    [e.target.name] : e.target.value
  })

  return (
    // I decided to just use arrow functions here instead of binding all of this at the top - Nate
    <div className="background">
      <Link to="/host/questions" className="btn-go-back">
        go back pls 
      </Link>
      <br />
      <div className="new-question-wrapper">
        <div className="new-q">
          <label>Question</label>
          <input
            name="question"
            onChange={changeHandler}
          />
        </div>

        <div className="new-q">
          <label>Answer1</label>
          <input
          name="answer1"
          onChange={changeHandler}
            height="100"
          />
        </div>
        <div className="new-q">
          <label>Answer2</label>
          <input
          name="answer2"
          onChange={changeHandler}
          />
        </div>
        <div className="new-q">
          <label>Answer3</label>
          <input
            name="answer3"
            onChange={changeHandler}
          />
        </div>
        <div className="new-q">
          <label>Answer4</label>
          <input
            name="answer4"
            onChange={changeHandler}
          />
        </div>
        <div className="new-q">
          <label>Correct answer</label>
          <input
            type="number"
            min="1"
            max="4"
            name="correctAnswer"
            onChange={changeHandler}
          />
        </div>
        <div className="next">
          <button onClick={addQuestion} className="btn-new">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
