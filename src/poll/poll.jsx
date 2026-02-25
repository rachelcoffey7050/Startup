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

    const [voted, setVoted] = React.useState(false);

    function voting() {
        setVoted(true);
    }

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
                <form id="voteForm">
                    <legend>Poll Options</legend>
                    <ul>
                        {poll.options.map((option, i) =>
                        <li key={i}><label forhtml="radio">{option}</label>
                        <input type="radio" name="varRadio" value="radio" /></li>
                            )}
                    </ul>
                    <div id="btnRow">
                    <button className="btn my-custom-btn" onClick={voting} >Vote</button>
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
  
    if (voted) {return (
        <main className='poll-page'>
            <div id="resultsView"> 
                <h2>{poll.title}</h2>
                <p>{poll.description}</p>
                <fieldset>
                    <legend>Poll Options</legend>
                    <ul>
                        {poll.options.map((option, i) =>
                        <li key={i}><label forhtml="voteCount0">{option}</label>
                        <meter id="votesMeter0" min="0" max="100" value="0" optimum="100" low="33"></meter><span id="voteCount0">0</span></li>
                        )}
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