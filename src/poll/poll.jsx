import React from 'react';
import './poll.css'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


// to do: make a function for what happens when vote is pressed. 
// Include in this changing the style to hide the first and show the second
// don't forget to update the home page to show the vote count - may need to update create poll as well
// also fix next poll button
//{showResults ? (
//   <ResultsView />
// ) : (
//   <VoteView />
// )}


export function Poll() {
    
    const navigate = useNavigate()
    const username = localStorage.getItem("currentUser");
    const {id} = useParams();

    const polls = JSON.parse(localStorage.getItem("polls"));
    const poll = polls[id]

    const voted = false;

    if (!poll) {
        return (
        <main className='poll-page'>
                <p>poll not found</p>
        </main> )
    }

    else if (!voted) {
        return (<main className='poll-page'>
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

        {username === "rachelcoffey" && (
            <button
                className="btn delete-btn"
                onClick={() => {
                polls.splice(id, 1);
                localStorage.setItem("polls", JSON.stringify(polls));
                navigate("/");
                }}
            >
                Delete Poll
            </button>
            )}
            </main>)
    }
  
    else if (voted) {return (
        <main className='poll-page'>
            <div id="resultsView" style={{display:'none'}}> 
                <h2>Example Poll Title</h2>
                <p>Description: Help me choose!</p>
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
        )
    }
}