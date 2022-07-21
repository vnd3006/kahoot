import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editingQuiz } from "../../Ducks/Reducer";
import "./Host-Question.css";
import "./Host.css";
import api from "../../service/api";

function Questions(props) {
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [newName, setNewName] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [toggle, setToggle] = useState(false);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if(props.quizToEdit === undefined){
      setForbidden(true)
    }else{
      setQuiz(props.quizToEdit);
      setNewName(props.quizToEdit.quizName);
      setNewInfo(props.quizToEdit.info);
      getQuestions();
    }
  }, []);
  const getQuestions = () => {
    api.get(`/api/getquestions/${props.quizToEdit._id}`).then((res) => {
      setQuestions(res.data);
    });
  };

  const deleteQuestion = (id) => {
    console.log('delete ',id)
    api.delete(`/api/deletequestion/${id}`).then((res) => {
      getQuestions();
    });
  };

  const displayEdit = () => {
    setToggle((prevState) => !prevState);
  };

  const updateQuiz = () => {
    setToggle((prevState) => !prevState);
    if (newName && newInfo) {
      api
        .put(`/api/updatequiz`, { newName, newInfo, id: quiz._id })
        .then((res) => {
          setNewName(newName);
          setNewInfo(newInfo);
          handleUpdatedQuiz(quiz._id);
        });
    } else {
      alert("All fields must be completed");
    }
  };
  const handleUpdatedQuiz = (id) => {
    api.get(`/api/getquiz/${id}`).then((res) => {
      props.editingQuiz(res.data);
      setQuiz(props.quizToEdit);
    });
  };
  if(forbidden === true){
    return <Redirect to='/host'/>
  }
  let mappedQuestions;
  if (questions) {
    mappedQuestions = questions.map((question) => {
      return (
        <div key={question._id} className="question-container">
          <h1>{question.question}</h1>
          <ul>
            <li>1: {question.answer1}</li>
            <li>2: {question.answer2}</li>
            <li>3: {question.answer3}</li>
            <li>4: {question.answer4}</li>
            <li>Correct: {question.correctAnswer}</li>
          </ul>
          <div className="btn-container-edit">
            <Link to={`/host/editquestion/${question._id}`}>
              <button className="btn-play">Edit</button>
            </Link>
            <button
              onClick={() => deleteQuestion(question._id)}
              className="btn-play"
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="mapped-container">
      {!toggle ? (
        <div className="toggle-container">
          <div className="btn-done-div">
            <Link to = "/host">
              <button className="btn-play btn-done">Done</button>
            </Link>
          </div>
          <div className="kwizz-container-edit">
           <div> {newName != "" ? (
              <h1 className="kwizz-title">{newName}</h1>
            ) : (
              <h1 className="kwizz-title">{quiz.quizName}</h1>
            )}</div>
            <br />
            {newInfo != "" ? (
              <p className="kwizz-info kwizz-desc">{newInfo}</p>
            ) : (
              <p className="kwizz-info kwizz-desc">{quiz.info}</p>
            )}

            <div className="btn-update">
              <button onClick={displayEdit} className="btn-play">
                Update
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="toggle-container">
          <div className="btn-done-div">
            <Link to="/host">
              <button className="btn-play btn-done">Done</button>
            </Link>
          </div>
          <div className="kwizz-container-edit">
            {/* <h1 className='kwizz-title'>{this.state.quiz.quiz_name}</h1>
                        <p className='kwizz-info kwizz-desc'>{this.state.quiz.info}</p> */}
            <input
              placeholder={quiz.quizName}
              onChange={(e) => setNewName(e.target.value)}
              className="title-input input-edit "
            />
            <br />
            <textarea
              placeholder={quiz.info}
              onChange={(e) => setNewInfo(e.target.value)}
              className="desc-input input-edit"
            ></textarea>
            <div className="btn-container-edit">
              <button onClick={updateQuiz} className="btn-play">
                Save
              </button>
              <button onClick={displayEdit} className="btn-play">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="question-edit-wrapper">
        <div className="add-quesiton-div">
          {props.quizToEdit === undefined ?
          '':
          <Link
            to={`/host/newquestion/${props.quizToEdit._id}`}
            className="btn-link"
          >
            <button className="btn-new" id="add-question-btn">
              Add Question
            </button>
          </Link>
          }
        </div>
        <br />
        <br />
        <div className="mapped-questions">{mappedQuestions}</div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  if(state === undefined){
    return {quizToEdit: undefined}
  }
  return {
    quizToEdit: state.quizToEdit,
  };
}

export default connect(mapStateToProps, { editingQuiz })(Questions);
