/**
 * Created by Owner on 1/13/2017.
 */
import React from "react";
import ReactDOM from "react-dom";
import Voting from "./components/Voting";
const pair = ["Drive","Aliens","One More Thing Jacky"];
ReactDOM.render(<Voting pair={pair} hasVoted="Trainspotting"/>,document.getElementById("app"));
