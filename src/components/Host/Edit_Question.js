import React, {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiWithFile from "../../service/apiWithFile";
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
    image:null,
    redirect: false,
  });

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = () => {
    api.get(`/api/getquestion/${props.match.params.id}`).then((res) => {
      console.log('question: ',res.data)
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

  const changeHandler = (e) =>{
    if (e.target.name!='image')
      {setQuestionInfo({
      ... questionInfo, 
      [e.target.name] : e.target.value
    })}
    else {
      setQuestionInfo({
        ... questionInfo, 
        [e.target.name] : e.target.files[0]
      })
    }
  }

  const updateQuestion = () => {
    let { question, answer1, answer2, answer3, answer4, correctAnswer, id,image } =
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
      var data=new FormData()
      data.append('question', question)
      data.append('answer1', answer1)
      data.append('answer2', answer2)
      data.append('answer3', answer3)
      data.append('answer4', answer4)
      data.append('correctAnswer', correctAnswer)
      if (image) data.append('image', image)
      data.append('id', id)
      apiWithFile
        .put("/api/updatequestion", data)
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
      <div className="btn-goBack">
        <Link to="/host/questions" className="btn-container">
        <button className="btn-play">Go back</button>
      </Link>
      </div>
      <div className="new-q">
        <label>Question</label>
        <textarea
          rows={5}
          className="ml4"
          value={questionInfo.question}
          name="question"
          onChange={changeHandler}
        />
      </div>
      <div className="new-q">
          <label>Image</label>
          <input className="ml4" 
          type="file" 
          accept="image/x-png,image/jpeg,image/gif" 
          onChange={changeHandler} 
          name="image" id="image"/>
        </div>
      <div className="new-q">
        <label>Answer1</label>
        <textarea
          rows={3}
          className="ml4"
          value={questionInfo.answer1}
          name="answer1"
          onChange={changeHandler}
        />
      </div>
      <br />
      <div className="new-q">
        <label>Answer2</label>
        <textarea
          rows={3}
          className="ml4"
          value={questionInfo.answer2}
          name="answer2"
          onChange={changeHandler}
        />
      </div>
      <br />
      <div className="new-q">
        <label>Answer3</label>
        <textarea
          rows={3}
          className="ml4"
          value={questionInfo.answer3}
          name="answer3"
          onChange={changeHandler}
        />
      </div>
      <br />
      <div className="new-q">
        <label>Answer4</label>
        <textarea
          rows={3}
          className="ml4"
          value={questionInfo.answer4}
          name="answer4"
          onChange={changeHandler}
        />
      </div>
      <br />
      <div className="new-q">
        <label>Correct Answer</label>
        <input
          type="number"
          value={questionInfo.correctAnswer}
          name="correctAnswer"
          onChange={changeHandler}
        />
        <button onClick={updateQuestion}>Update</button>
      </div>
    </div>
  );
}
