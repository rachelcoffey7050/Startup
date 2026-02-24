import React from 'react';
import './about.css'
import { getQuote } from './service';

export function About() {
  const [quote, setQuote] = React.useState({text: 'Click to get a quote.', author: ''});
  const [imageUrl, setImageUrl] = React.useState('placeholder.jpg')
  
  function updateQuote() {
    const quote = getQuote();
    setQuote(quote);
  }

  React.useEffect(() => {
    setImageUrl(`placeholder.jpg`);
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <div id="picture" className="picture-box"><img src={imageUrl} alt="random image" /></div>

        <p>
          Simon is a repetitive memory game where you follow the demonstrated color sequence until you make a mistake.
          The longer the sequence you repeat, the greater your score.
        </p>

        <p>
          The name Simon is a registered trademark of Milton-Bradley. Our use of the name and the game is for non-profit
          educational use only. No part of this code or program should be used outside of that definition.
        </p>

        <div id="quote" className="quote-box bg-light text-dark" onClick={updateQuote}>
          <p className="quote">{quote.text}</p>
          <p className="author">{quote.author}</p>
        </div>
      </div>
    </main>
  );
}
