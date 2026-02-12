import React from 'react';
import './home.css';

export function Home() {
  return (
    <main className='home-page'>
        <h2>Poll List</h2>

        <article className="poll">
            <h3><a href="poll.html">Example poll 1 title</a></h3>
            <p>Help me choose!</p>
            <p>Votes: <span id="voteCount">0</span></p>
        </article>
        
        <article className="poll">
            <h3><a href="poll.html">Example poll 2 title</a></h3>
            <p>Help me choose!</p>
            <p>Votes: <span id="voteCount">0</span></p>
        </article>
        
        <article className="poll">
            <h3><a href="poll.html">Example poll 3 title</a></h3>
            <p>Help me choose!</p>
            <p>Votes: <span id="voteCount">0</span></p>
        </article>
        
    </main>
  );
}