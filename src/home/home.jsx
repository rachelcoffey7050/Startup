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
        const port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        socket.onmessage = async (msg) => {
          try {
            const event = JSON.parse(await msg.data.text());
            if (event.type === 'pollsUpdated') {
              setPollList(event.polls);
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