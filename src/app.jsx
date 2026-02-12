import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Poll } from './poll/poll';
import { Create } from './create/create';
import { About } from './about/about';
import { Home } from './home/home';


export default function App() {
  return (
   <BrowserRouter>
   <div >
    <header>
      <h1>StoryPolls</h1>
      <nav>
        <menu>
          <li className='nav-item'><NavLink href="index">Home</NavLink></li>
          <li className='nav-item'><NavLink href="about">About</NavLink></li>
          <li className='nav-item'><NavLink href="create">Create Poll</NavLink></li>
          <li className='nav-item'><NavLink href="login">Log In/Sign Up</NavLink></li> 
        </menu>
      </nav>
      <hr />
    </header>
    
    <Routes>
    <Route path='/' element={<Home />} exact />
    <Route path='/poll' element={<Poll />} />
    <Route path='/create' element={<Create />} />
    <Route path='/about' element={<About />} />
    <Route path='/login' element={<Login />} />
    <Route path='*' element={<NotFound />} />
    </Routes>

    <footer>
      <span class="text-reset">Rachel Coffey</span>
      <a href="https://github.com/rachelcoffey7050/Startup">Source</a>
    </footer>
    </div>;
    </BrowserRouter>
    );
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}