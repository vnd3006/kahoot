import React from "react";
import "./Game.css";

export default function BoardRank(props) {
  return (
    <div className="game-over">
      <h1 className="leaderBoard-title">Board Ranking</h1>
      <br />
      <h2 className="leaderBoard">1st  {props.leaderboard[0].name} : {props.leaderboard[0].score}</h2>
      <h2 className="leaderBoard">2nd  {props.leaderboard[1].name} : {props.leaderboard[1].score}</h2>
      <h2 className="leaderBoard">3rd  {props.leaderboard[2].name} : {props.leaderboard[2].score}</h2>
    </div>
  );
}
