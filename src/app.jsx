import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div ><header>
      <h1>StoryPolls</h1>
      <nav>
        <menu>
          <li className='nav-item'><a href="index.html">Home</a></li>
          <li className='nav-item'><a href="about.html">About</a></li>
          <li className='nav-item'><a href="create.html">Create Poll</a></li>
          <li className='nav-item'><a href="login.html">Log In/Sign Up</a></li> 
        </menu>
      </nav>
      <hr />
    </header>
    
    <main>App components go here</main>

    <footer>
      <span class="text-reset">Rachel Coffey</span>
      <a href="https://github.com/rachelcoffey7050/Startup">Source</a>
    </footer>
    
    </div>;
}