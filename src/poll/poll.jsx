import React from 'react';
import './poll.css'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

export function Poll() {
  
    const username = localStorage.getItem("username");
    const {id} = useParams();

    const polls = JSON.parse(localStorage.getItem("polls"));
    const poll = polls[id]

    if (!poll) {
        return <p>poll not found</p>
    }
  
    return (
    <main className='poll-page'>
        <div id="voteView">
            <h2>{poll.title}</h2>
            <p>{poll.description}</p>
            <fieldset>
                <form id="voteForm" method="post">
                    <legend>Poll Options</legend>
                    <ul>
                        {poll.options.map((option, i) =>
                        <li key={i}><label for="radio">{option}</label>
                        <input type="radio" id="radio" name="varRadio" value="radio" /></li>
                            )}
                    </ul>
                    <div id="btnRow">
                    <button className="btn my-custom-btn" type="submit">Vote</button>
                    <NavLink className="btn my-custom-btn" to={`/poll/${id+1}`}>Next Poll</NavLink>
                    </div>
                </form>
                
        </fieldset>
        </div>

        <div id="resultsView" > 
            {/* <!-- style="display:none;" --> */}
            <h2>Example Poll Title</h2>
            <p>Description: Help me choose!</p>
            {/* <!-- This is the result view. The Javascript will toggle between this and the above--> */}
            <fieldset>
                <legend>Poll Options</legend>
                <ul>
                    <li><label for="voteCount0">option crazy </label>
                    <meter id="votesMeter0" min="0" max="100" value="0" optimum="100" low="33"></meter><span id="voteCount0">0</span></li>
                    <li><label for="voteCount1">option funny </label>
                    <meter id="votesMeter1" min="0" max="100" value="0" optimum="100" low="33"></meter> <span id="voteCount1">0</span></li>
                    <li><label for="voteCount2">option thoughful </label>
                    <meter id="votesMeter2" min="0" max="100" value="0" optimum="100" low="33"></meter> <span id="voteCount2">0</span></li>
                </ul>
            </fieldset>
            <div id="btnRow">
            <NavLink className="btn my-custom-btn" to="/poll">Next Poll</NavLink>
            </div>
        </div>
    </main>
  );
}