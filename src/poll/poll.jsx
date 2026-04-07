import React from 'react';
import './poll.css'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export function Poll() {
    
    const navigate = useNavigate()
    const username = localStorage.getItem("currentUser");
    const {id} = useParams();
    const [poll, setPoll] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/polls/${id}`)
          .then((response) => response.json())
          .then((poll) => {
            setPoll(poll);
          })
          .catch((err) => {
            console.error("JSON parse error:", err);
        });
        }, [id]);

    const [voted, setVoted] = React.useState(false);

    const [voteCounts, setVoteCounts] = React.useState([]);

    // make it possible to travel to next poll
    const [pollList, setPollList] = React.useState([]);
    React.useEffect(() => {
        fetch("/api/polls")
            .then(res => res.json())
            .then(list => setPollList(list));
        }, []);

    let nextPollId = null;

    if (pollList && pollList.length > 0) {
    const currentIndex = pollList.findIndex(p => p.id === id);

    if (currentIndex !== -1) {
        const nextIndex =
        currentIndex === 0
            ? pollList.length - 1
            : currentIndex - 1;

        nextPollId = pollList[nextIndex].id;
    }
    }



    React.useEffect(() => {
    if (poll) {
        setVoteCounts(Array.isArray(poll.voteCounts) &&
         poll.voteCounts.length === poll.options.length
        ? poll.voteCounts
        : Array(poll.options.length).fill(0))
    }}, [poll]);

    const [totalCounts, setTotalCounts] = React.useState(0);
    React.useEffect(() => { 
        setTotalCounts(voteCounts.reduce((sum, count) => sum + count, 0)); 
    }, [voteCounts]);

    const [selected, setSelected] = React.useState(null);

    function voting(index, e) {
        setVoted(true);
        const updatedCounts = voteCounts.map((count, i) =>
            i === index ? count + 1 : count
        );
        setVoteCounts(updatedCounts);
        const updatedPoll = {
            ...poll,
            voteCounts: updatedCounts,
        };
        fetch(`/api/polls/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPoll),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((updated) => {
                setPoll(updated);
                setVoteCounts(updated.voteCounts);
            })
            .catch((error) => {
                console.error('Error updating poll:', error);
                // Revert the vote counts on error
                const revertedCounts = voteCounts.map((count, i) =>
                    i === index ? count - 1 : count
                );
                setVoteCounts(revertedCounts);
                setVoted(false); // Allow user to try voting again
            });
    } 


    function leavePage() {
        setVoted(false);
    }

    if (!poll || !poll.options) {
        return <div className="loading-screen">
        <p>Loading...</p>
        </div>;
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
                        <li key={i}><label htmlFor="radio">{option}</label>
                        <input type="radio" name="varRadio" value={i} onChange={() =>setSelected(i)} /></li>
                            )}
                    </ul>
                    
                    <div id="btnRow">
                    <button className="btn my-custom-btn" onClick={() => voting(selected)} >Vote</button>
                    {(
                    <NavLink className="btn my-custom-btn" to={nextPollId ? `/poll/${nextPollId}` : "#"}>Next Poll</NavLink>
                    )}
                    </div>
                </form>
                
        </fieldset>
        </div>

        {username === "rachelcoffey" && (
            <button
                className="btn delete-btn"
                onClick={async() => {
                const res = await fetch(`/api/polls/${id}`, {
                    method: 'DELETE',
                    })
                if (res.ok) {
                    navigate("/");
                } else {
                    alert("Failed to delete poll");
                }
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
                        <li key={i}><label htmlFor="voteCount">{option}</label>
                        <meter id="votesMeter" min="0" max="100" value={totalCounts === 0 ? 0 :(voteCounts[i]/totalCounts)*100} optimum="100" low="33"></meter><span id="voteCount">{voteCounts[i]}</span></li>
                        )}
                    </ul>
                </fieldset>
                {(
                <div id="btnRow">
                <NavLink className="btn my-custom-btn" onClick={leavePage} to={nextPollId ? `/poll/${nextPollId}` : "#"}>Next Poll</NavLink>
                </div>
                )}
            </div>
        </main>
        )
    }
}