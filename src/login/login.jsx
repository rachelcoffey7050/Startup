import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className='login-page'>
      <h1>Your StoryPolls Accout</h1>
      <form method="get" action="index.html">
        <div>
          <span>👤</span>
          <input type="text" placeholder="username" required/>
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" required/>
        </div>
        <button className="btn my-custom-btn" type="submit">Login</button>
        <button className="btn my-custom-btn" type="submit">Create</button>
      </form>
    </main>
  );
}