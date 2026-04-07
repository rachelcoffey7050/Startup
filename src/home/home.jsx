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
        const host = window.location.host;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${host}/ws`);
        socket.onmessage = async (msg) => {
          try {
            const event = JSON.parse(msg.data);
            if (event.type === 'pollsUpdated') {
              if (Array.isArray(event.polls)) {
                setPollList(event.polls);
              } else {
                fetch('/api/polls')
                  .then(r => r.json())
                  .then(setPollList);
              }
            }
          } catch (err) {
              console.error('WebSocket message error:', err);
            }
      }
      return () => {
        socket.close();
      }
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