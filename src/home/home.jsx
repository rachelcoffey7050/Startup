import React from 'react';
import './home.css';
import { NavLink } from 'react-router-dom';

export function Home() {
  
    const [pollList, setPollList] = React.useState([]);

    React.useEffect(() => {
    fetch('/api/polls')
      .then((response) => response.json())
      .then((pollList) => {
        setPollList(pollList);
      });
    }, []);

    const reversed = [...pollList].reverse();

    return (
    <main className='home-page'>
        <h2>Poll List</h2>

        {reversed.map(poll => (
        <article key={poll.id} className="a-poll">
            <h3><NavLink to={`/poll/${poll.id}`}>{poll.title}</NavLink></h3>
            <p>{poll.description.length > 300 ? poll.description.slice(0,120) + "..." 
                    : poll.description}</p>
        </article>
        ))}
        
    </main>
  );
}