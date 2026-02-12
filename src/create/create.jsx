import React from 'react';
import './create.css'

export function Create() {
  return (
    <main className='create-page'>
        <h2>Create a Poll</h2>
        <p>The more polls there are, the more fun we'll have!</p>
        <form id="CreatePollForm" action="index.html" method="post">
            <ul>
            <li><label for="tile">Poll title: </label>
            <input type="text" id="title" placeholder="Question here"/></li>
            
            <li><label for="description">Descritption/extra details: </label>
            <textarea id="description"></textarea></li>
            </ul>

            <h3>Options</h3> 
            <div id="optionsContainer">
                <ol>
                <li><input type="text" name="option" placeholder="Option 1" required></input></li>
                <li><input type="text" name="option" placeholder="Option 2" required></input></li>
                </ol> 
            </div> 
            <div id="btnRow">
            <button class="btn my-custom-btn" type="button" id="addOptionBtn">Add another option</button> 
            <button class="btn my-custom-btn" type="submit">Create Poll</button>
            </div>
        </form>
    </main>
  );
}