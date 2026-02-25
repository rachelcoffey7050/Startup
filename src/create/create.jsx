import React from 'react';
import './create.css';
import { useNavigate } from 'react-router-dom';


export function Create({}) {
  const [title, setTitle] = React.useState('Unnamed');
  const [description, setDescription] = React.useState('description..');
  const [options, setOptions] = React.useState(["1", "2"]);
  const [voteCount, setVoteCount] = React.useState(Array(options.length).fill(0))
  const navigate = useNavigate();
  
  function createPoll(event){
    event.preventDefault();
    console.log(`poll with options ${options} created`)
    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    polls.push({title, description, options, voteCount})
    localStorage.setItem('polls', JSON.stringify(polls));
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