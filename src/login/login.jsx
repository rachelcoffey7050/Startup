import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function register(event){
      event.preventDefault();   
      registerUser(email, password)
      navigate("/");
    }

  
  
  return (
    <main className='login-page'>
      <h1>Your StoryPolls Accout</h1>
      <form onSubmit={register} >
        <div>
          <span>👤</span>
          <input type="text" placeholder="username" required onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" required onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <button className="btn my-custom-btn" type="submit">Login</button>
        <button className="btn my-custom-btn" type="submit">Create</button>
      </form>
    </main>
  );
}

export function registerUser(email, password){
  console.log(`Registering user with email: ${email} and password ${password}`)

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  users.push({email, password})
  localStorage.setItem('users', JSON.stringify(users));
}