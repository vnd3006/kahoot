import React, { useState, useEffect } from "react";
import axios from "axios";
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
      axios
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

  if (questionInfo.redirect) {
    return <Redirect to="/host/questions" />;
  }

  return (
    // I decided to just use arrow functions here instead of binding all of this at the top - Nate
    <div className="background">
      <Link to="/host/questions" className="btn-go-back">
        go back pls :)
      </Link>
      <br />
      <div className="new-question-wrapper">
        <div className="new-q">
          <label>Question</label>
          <input
            onChange={(e) =>
              setQuestionInfo((prevState) => {
                return {
                  ...prevState,
                  question: e.target.value,
                };
              })
            }
          />
        </div>

        <div className="new-q">
          <label>Answer1</label>
          <input
            onChange={(e) =>
              setQuestionInfo((prevState) => {
                return {
                  ...prevState,
                  asnwer1: e.target.value,
                };
              })
            }
            height="100"
          />
        </div>
        <div className="new-q">
          <label>Answer2</label>
          <input
            onChange={(e) =>
              setQuestionInfo((prevState) => {
                return {
                  ...prevState,
                  asnwer2: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="new-q">
          <label>Answer3</label>
          <input
            onChange={(e) =>
              setQuestionInfo((prevState) => {
                return {
                  ...prevState,
                  asnwer3: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="new-q">
          <label>Answer4</label>
          <input
            onChange={(e) =>
              setQuestionInfo((prevState) => {
                return {
                  ...prevState,
                  asnwer4: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="new-q">
          <label>Correct answer</label>
          <input
            type="number"
            min="1"
            max="4"
            onChange={(e) =>
              setQuestionInfo((prevState) => {
                return {
                  ...prevState,
                  correctAnswer: e.target.value,
                };
              })
            }
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
