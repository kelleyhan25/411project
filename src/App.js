
import './App.css';
import hand from './images/hand.svg'
import smack from './images/Smack.svg'
import x from './images/X.svg'
import { useState } from 'react'

import SpotifyMoodPlayer from './spotifyapi.js';
import MoviePicker from './movie.js'; // Adjust the path accordingly

function App() {
  const [joke, setJoke] = useState('');
  const [randomSong, setRandomSong] = useState(null);
  const [moodQuery, setMoodQuery] = useState('Happy'); // Default mood
  
  const getJoke = async () => {
    try {
      setJoke('Updating...');

      const apiKey = "sk+qS/Qh+8HALOaX4nvkCw==1nnmT6AUki2zhTzK";
      const options = {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      };
      const apiURL = "https://api.api-ninjas.com/v1/jokes?limit=1";

      const response = await fetch(apiURL, options);
      const data = await response.json();

      setJoke(data[0].joke);
    } catch (error) {
      setJoke('An error happened, try again later');
      console.error(error);
    }
  };

  return (
    <div className="body">
      <div className="welcome-bar">
        <div className="hand-welcome">
          <img src={hand} className="hand" alt="hand Icon" />
          <img src={smack} className="smack-logo" alt="Smack icon" />
        </div>
        <div className="welcome-user"><p>Welcome!</p></div>
      </div>
      <section className="home-container">
        <div className='container-first-row'>
          <div className="song-container">
            <div className="song-top">
              <p>Hot Song!</p>
              <div className="song-top-x-container">
                <img src={x} className="x-song" alt="Smack icon" />
              </div>
            </div>
            <div className="song-body">
              <div className="song-pic">
                <SpotifyMoodPlayer mood="happy" />
              </div>
            </div>
          </div>
          <div className="movie-container">
            <div className="movie-top">
              <p>Movie Recommendation </p>
            </div>
            <div className="movie-inside">
              <section className="movie-pic">
              <MoviePicker />
              </section>
            </div>
          </div>
        </div>
        <div className="container-second-row">
          <div className="fun-fact-container">
            <div className="joke-container">
              <div className="joke">{joke && <p>{joke}</p>}</div>
              <button onClick={getJoke}>Get Quote</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
