import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import PlayerQuestions from "./Player_Questions";
import PlayerQuestionOver from "./Player_Question_Over";
import "./Game.css";
import load from "../../Assests/load-circle-outline.svg";
import { Redirect } from "react-router-dom";

class Player extends Component {
  constructor() {
    super();
    this.state = {
      pinCorrect: false,
      gameStarted: false,
      questionOver: false,
      answerSubmitted: false,
      answeredCorrect: false,
      score: 0,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
  }
  componentDidMount() {
    if(this.props.selectedPin !== undefined){
      this.socket = io("http://localhost:3030",{ transports : ['websocket'] });
      this.socket.emit("player-joined", this.props.selectedPin);
      this.socket.emit("player-add", this.props);
      this.socket.on("room-joined", (data) => {
      });
      this.socket.on("question-over", () => {
        this.setState({
          questionOver: true,
        });
      });
      this.socket.on("next-question", () => {
        this.setState({
          gameStarted: true,
          questionOver: false,
          answerSubmitted: false,
          answeredCorrect: false,
        });
      });
      this.socket.on("sent-info", (data) => {
        this.setState({
          answeredCorrect: data.answeredCorrect,
          score: data.score,
        });
      });
    }
  }
  submitAnswer(num) {
    this.socket.emit("question-answered", {
      name: this.props.nickname,
      answer: num,
      pin: this.props.selectedPin,
    });
    this.setState({
      answerSubmitted: true,
    });
  }
  render() {
    if(this.props.selectedPin === undefined){
      return <Redirect to= '/'/>
    }

    let { gameStarted, questionOver, answerSubmitted } = this.state;
    return (
      <div className="player-container">
        <div className="status-bar">
          <p className="player-info" id="pin">
            PIN: {this.props.selectedPin}
          </p>
        </div>
        {!gameStarted && !questionOver ? (
          <div className="wating-room">
            <p>
              You're in!
              <br />
              Do you see your nickname on the screen?
            </p>
            <div className="answer-container">
              <div className=" q-blank q"></div>
              <div className=" q-blank q"></div>
              <div className=" q-blank q"></div>
              <div className=" q-blank q"></div>
            </div>
          </div>
        ) : gameStarted && !questionOver && !answerSubmitted ? (
          <PlayerQuestions submitAnswer={this.submitAnswer} />
        ) : gameStarted && !questionOver && answerSubmitted ? (
          <div className="waiting-for-results">
            <p className="answer-indicator" id="too-fast">
              Did You answer too fast????
            </p>
            <img src={load} alt="" className="load-circle" />
          </div>
        ) : (
          <PlayerQuestionOver answeredCorrect={this.state.answeredCorrect} />
        )}
        <div className="status-bar">
          <p className="player-info">{this.props.nickname}</p>
          <div
            className={
              gameStarted && !questionOver && answerSubmitted
                ? "status-bar-hidden"
                : "status-bar-score"
            }
          >
            {this.state.score}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if(state === undefined){
    return{
      selectedPin: undefined
    }
  }
  return {
    selectedPin: state.selectedPin,
    nickname: state.nickname,
  };
}

export default connect(mapStateToProps)(Player);
