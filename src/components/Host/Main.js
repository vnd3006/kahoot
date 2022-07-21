import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../service/api";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectedQuiz, editingQuiz } from "../../Ducks/Reducer";
import "./Host.css";
import Kwizz from "../../Assests/Kahoot_Logo.svg.png";
import authService from "../../service/auth.service";



function Main(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [canRedirect, setCanRedirect] = useState(false);
  const [forbidden, setforbidden] = useState(false);

  useEffect(() => {
    getQuizzes();
  }, []);

  const getQuizzes = () => {
    api.get(`/api/getQuizzes`).then((res) => {
      setQuizzes([...res.data]);
    }).catch(err =>{
      setforbidden(true);
    });
  };

  const setRedirect = (e) => {
    props.selectedQuiz(e);

    setCanRedirect(true);
  };

  const deleteQuiz = (id) => {
    api.delete(`/api/deletequiz/${id}`).then((res) => {
      if (res.status === 200) {
        getQuizzes();
      } else {
        alert("Something went wrong :(");
      }
    });
  };

  const handleLogout = ()=>{
    authService.logout();
  }
  let mappedQuizzes = quizzes.map((quiz) => {
    return (
      <div key={quiz.id} className="kwizz-container">
        <h1 className="kwizz-info kwizz-title">{quiz.quizName}</h1>
        <p className="kwizz-info kwizz-desc">{quiz.info}</p>
        <div className="btn-container">
          <button onClick={() => setRedirect(quiz)} className="btn-play">
            Play
          </button>
          <button onClick={() => deleteQuiz(quiz._id)} className="btn-play">
            Delete
          </button>
          <Link to="/host/questions">
            <button
              onClick={() => props.editingQuiz(quiz)}
              className="btn-play"
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
    );
  });
 if(forbidden == true){
  return <Redirect to="/login"/>
 }

  return canRedirect ? (
    <Redirect to="/game" />
  ) : (
    <div className="mapped-container">
      <div className="btn-done-div">
            <Link to="/">
              <button className="btn-play btn-done" onClick={handleLogout}>Log out</button>
            </Link>
          </div>
      <div className="host-logo-container">
        <img src={Kwizz} alt="kwizz logo" className="logo" />
      </div>
      <div className="newKwizz">
        <Link to="/host/newquiz" className="btn-link">
          <button className="btn-new">New Quiz!</button>
        </Link>
      </div>
      <div className="mapped-Kwizzes-container">{mappedQuizzes}</div>
    </div>
  );
}

export default connect(null, { selectedQuiz, editingQuiz })(Main);
