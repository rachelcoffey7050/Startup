import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function register(event){
      event.preventDefault();   
      registerOrLoginUser(email, password)
      localStorage.setItem("currentUser", email);
      setCurrentUser(email);
      navigate("/");
    }

  async function logout() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error("Logout failed:", response.status);
      return;
    }
    // Only runs if logout succeeded
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setEmail('');
    navigate("/");
  } catch (err) {
    console.error("Network error during logout:", err);
  }
}

  
  if (!localStorage.getItem("currentUser")){
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
  );}

  return (
    <main className='login-page'>
      <h1>Your StoryPolls Accout</h1>
      <button className="btn my-custom-btn" onClick={logout}>Logout</button>
    </main>
  );
}

export async function registerOrLoginUser(email, password){
  
  fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
})
    .then((response) => {
    if (response.ok) {
      return response.json();   // login success
    }

    if (response.status === 404) { //meaning the user was not found at all
      // try create
      return fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      .then((response) => {
      if (!response) {alert("Unexpected login error"); 
        return;}
        if (response.ok) {
        return response.json();   // create success
      }
      if (response.status === 409) {
        alert("Incorrect Password for Existing User");
        return;
      }
    }
  ) 
    }});
  }