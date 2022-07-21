import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../service/api";
import { Redirect } from "react-router-dom";
import "./Host-New-Question.css";
import "./Host-Question.css";
import "./Host.css";

export default function Edit_Question(props) {
  const [questionInfo, setQuestionInfo] = useState({
    id: 0,
    question: "",
    asnwer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctAnswer: "",
    redirect: false,
  });

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = () => {
    api.get(`/api/getquestion/${props.match.params.id}`).then((res) => {
      let question = res.data;
      setQuestionInfo((prevState) => {
        return {
          ...prevState,
          id: question._id,
          question: question.question,
          answer1: question.answer1,
          answer2: question.answer2,
          answer3: question.answer3,
          answer4: question.answer4,
          correctAnswer: question.correctAnswer,
        };
      });
    });
  };

  const updateQuestion = () => {
    let { question, answer1, answer2, answer3, answer4, correctAnswer, id } =
      questionInfo;
    if (
      question &&
      answer1 &&
      answer2 &&
      answer3 &&
      answer4 &&
      correctAnswer &&
      id
    ) {
      api
        .put("/api/updatequestion", {
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
  return questionInfo.redirect ? (
    <Redirect to="/host/questions" />
  ) : (
    <div className="mapped-container">
      <Link to="/host/questions" className="btn-link">
        go back
      </Link>
      <div className="new-q">
        <label>Question</label>
        <input
          value={questionInfo.question}
          onChange={(e) =>
            setQuestionInfo((prevState) => {
              return { ...prevState, question: e.target.value };
            })
          }
        />
      </div>
      <br />
      <div className="new-q">
        <label>Answer1</label>
        <input
          value={questionInfo.answer1}
          onChange={(e) =>
            setQuestionInfo((prevState) => {
              return { ...prevState, asnwer1: e.target.value };
            })
          }
        />
      </div>
      <br />
      <div className="new-q">
        <label>Answer2</label>
        <input
          value={questionInfo.asnwer2}
          onChange={(e) =>
            setQuestionInfo((prevState) => {
              return { ...prevState, asnwer2: e.target.value };
            })
          }
        />
      </div>
      <br />
      <div className="new-q">
        <label>Answer3</label>
        <input
          value={questionInfo.answer3}
          onChange={(e) =>
            setQuestionInfo((prevState) => {
              return { ...prevState, asnwer3: e.target.value };
            })
          }
        />
      </div>
      <br />
      <div className="new-q">
        <label>Answer4</label>
        <input
          value={questionInfo.answer4}
          onChange={(e) =>
            setQuestionInfo((prevState) => {
              return { ...prevState, asnwer4: e.target.value };
            })
          }
        />
      </div>
      <br />
      <div className="new-q">
        <label>Correct Answer</label>
        <input
          type="number"
          value={questionInfo.correctAnswer}
          onChange={(e) =>
            setQuestionInfo((prevState) => {
              return { ...prevState, correctAnswer: e.target.value };
            })
          }
        />
        <button onClick={updateQuestion}>Update</button>
      </div>
    </div>
  );
}
