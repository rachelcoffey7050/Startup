import React from 'react';
import './about.css';
import { getImage } from './service';

export function About() {
  
  const [image, setImageUrl] = React.useState('books.jpg')
  

  React.useEffect(() => {
      const image = getImage();
      setImageUrl(image);
    }, []);


  return (
    <main className='about-page' style={{backgroundImage: `url(${image})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        }}
        >
      <section>
        <p>
          StoryPolls is a platform for writers to create and share polls. Having trouble deciding between two character names? 
          Want quick feedback on a plot descision before you write that chapter? You can create a poll to get instant feedback. Have fun
          responding to others' polls to help them out!
        </p>
        <p>
          We welcome polls for various types of creative works, including nonfiction writing and art. Please keep your posts and comments polite and appropriate for all ages.
        </p>
      </section>
    </main>
  );
}