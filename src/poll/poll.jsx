import React from 'react';
import './poll.css'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { updatePoll } from './service';


export function Poll() {
    
    const navigate = useNavigate()
    const username = localStorage.getItem("currentUser");
    const {id} = useParams();
    const numID = parseInt(id);
    const [poll, setPoll] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/polls/${id}`)
          .then((response) => response.json())
          .then((poll) => {
            setPoll(poll);
          });
        }, [id]);

    const [voted, setVoted] = React.useState(false);

    const [voteCounts, setVoteCounts] = React.useState([]);

    React.useEffect(() => {
    if (poll) {
        setVoteCounts(Array.isArray(poll.voteCounts) &&
         poll.voteCounts.length === poll.options.length
        ? poll.voteCounts
        : Array(poll.options.length).fill(0))
    }})

    const [totalCounts, setTotalCounts] = React.useState(0);
    React.useEffect(() => { 
        setTotalCounts(voteCounts.reduce((sum, count) => sum + count, 0)); 
    }, [voteCounts]);

    const [selected, setSelected] = React.useState(null);

    function voting(index) {
        setVoted(true);
        const updatedCounts = voteCounts.map((count, i) =>
            i === index ? count + 1 : count
        );
        setVoteCounts(updatedCounts);
        //poll.voteCounts = updatedCounts;
        const updatedPoll = {
            ...poll,
            voteCounts: updatedCounts,
        };
        fetch('/api/polls/${id}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatePoll),
            })
            .then((response) => response.json())
        } 


    function leavePage() {
        setVoted(false);
    }

    if (!poll) {
    return <p>Loading...</p>;
    }

    

    if (!voted) {
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
                        <input type="radio" name="varRadio" value={i} onChange={() =>setSelected(i)} /></li>
                            )}
                    </ul>
                    
                    <div id="btnRow">
                    <button className="btn my-custom-btn" onClick={() => voting(selected)} >Vote</button>
                    {numID > 0 && (
                    <NavLink className="btn my-custom-btn" to={`/poll/${numID-1}`}>Next Poll</NavLink>
                    )}
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
                        <li key={i}><label forhtml="voteCount">{option}</label>
                        <meter id="votesMeter" min="0" max="100" value={(voteCounts[i]/totalCounts)*100} optimum="100" low="33"></meter><span id="voteCount">{voteCounts[i]}</span></li>
                        )}
                    </ul>
                </fieldset>
                {numID > 0 && (
                <div id="btnRow">
                <NavLink className="btn my-custom-btn" onClick={leavePage} to={`/poll/${numID-1}`}>Next Poll</NavLink>
                </div>
                )}
            </div>
        </main>
        )
    }
}