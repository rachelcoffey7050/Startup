import React from 'react';
import './home.css';
import { NavLink } from 'react-router-dom';

export function Home() {
  return (
    <main className='home-page'>
        <h2>Poll List</h2>

        <article className="a-poll">
            <h3><NavLink to="poll">Example poll 1 title</NavLink></h3>
            <p>Help me choose!</p>
            <p>Votes: <span id="voteCount">0</span></p>
        </article>
        
        <article className="a-poll">
            <h3><NavLink to="poll">Example poll 2 title</NavLink></h3>
            <p>Help me choose!</p>
            <p>Votes: <span id="voteCount">0</span></p>
        </article>
        
        <article className="a-poll">
            <h3><NavLink to="poll">Example poll 3 title</NavLink></h3>
            <p>Help me choose!</p>
            <p>Votes: <span id="voteCount">0</span></p>
        </article>
        
    </main>
  );
}