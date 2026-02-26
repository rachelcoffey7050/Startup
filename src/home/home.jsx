import React from 'react';
import './home.css';
import { NavLink } from 'react-router-dom';

export function Home() {
  
    const [pollList, setPollList] = React.useState(JSON.parse(localStorage.getItem('polls') || '[]'));
    
    function findRealIndex(index) {
        return pollList.length - 1 - index;
    }

    return (
    <main className='home-page'>
        <h2>Poll List</h2>


        {pollList.slice().reverse().slice(0,30).map((poll, index) => (
        <article key={index} className="a-poll">
            <h3><NavLink to={`/poll/${findRealIndex(index)}`}>{poll.title}</NavLink></h3>
            <p>{poll.description.length > 300 ? poll.description.slice(0,120) + "..." 
                    : poll.description}</p>
        </article>
        ))}
        
    </main>
  );
}