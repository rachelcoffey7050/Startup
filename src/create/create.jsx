import React from 'react';
import './create.css';
import { useNavigate } from 'react-router-dom';
import { createNewPoll } from './service';


export function Create({}) {
  const [title, setTitle] = React.useState('Unnamed');
  const [description, setDescription] = React.useState('description..');
  const [options, setOptions] = React.useState(["1", "2"]);
  const [voteCounts, setVoteCounts] = React.useState(Array(options.length).fill(0))
  const navigate = useNavigate();
  
  async function createPoll(event){
    event.preventDefault();
        fetch('/api/polls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, description, options, voteCounts}),
          })
          .then((response) => response.json())
    console.log(`poll with options ${options} created`)
    navigate("/");
  }

  function updateOption(index, newValue){
    const updated = [...options];
    updated[index] = newValue;
    setOptions(updated);
  }

  function addOption() {
    setOptions([...options, ""]);
  }
  
  return (
    <main className='create-page'>
        <h2>Create a Poll</h2>
        <p>The more polls there are, the more fun we'll have!</p>
        <form id="CreatePollForm" onSubmit={createPoll}>
            <ul>
            <li><label>Poll title: </label>
            <input type="text" id="title" placeholder="Question here" onChange={(e)=> setTitle(e.target.value)}/> </li>
            
            <li><label>Descritption/extra details: </label>
            <textarea id="description" onChange={(e)=> setDescription(e.target.value)}></textarea> </li>
            </ul>

            <h3>Options</h3> 
            <div id="optionsContainer">
                <ol>
                  {options.map((opt, index) => (
                <li key={index}><input type="text" name="option" placeholder={`Option ${index+1}`} 
                  onChange={(e) => updateOption(index, e.target.value)} required></input></li>
                  ))}
                </ol> 
            </div> 
            <div id="btnRow">
            <button className="btn my-custom-btn" type="button" id="addOptionBtn" onClick={addOption}>Add another option</button> 
            <button className="btn my-custom-btn" type="submit">Create Poll</button>
            </div>
        </form>
    </main>
  );
}