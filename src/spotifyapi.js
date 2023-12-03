import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyMoodPlayer = () => {
  const [accessToken, setAccessToken] = useState('');
  const [selectedMood, setSelectedMood] = useState('happy');
  const [randomTrack, setRandomTrack] = useState(null);

  useEffect(() => {
    // Fetch access token
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: '19048f88d8964d4dbefc706422ed3c88',
            client_secret: 'b220a890ea0f49a3ae6bba53afe77aed',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  const getRandomTrack = async () => {
    try {
      // Map selected mood to a genre (you can customize this mapping as needed)
      const moodToGenre = {
        happy: 'pop',
        sad: 'indie folk',
        angry: 'hard rock',
        peaceful: 'acoustic',
      };
  
      const selectedGenre = moodToGenre[selectedMood] || 'pop';
  
      // Fetch a list of tracks based on the selected genre directly
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=genre:"${selectedGenre}"&type=track&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      // Get a random track from the list
      const randomIndex = Math.floor(Math.random() * response.data.tracks.items.length);
      const randomTrack = response.data.tracks.items[randomIndex];
  
      // Set the random track in the component state
      setRandomTrack(randomTrack);
    } catch (error) {
      console.error('Error fetching random track:', error);
    }
  };
  
  

  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  return (
    <div>
      {/* Display the preview picture */}
      <div className="random-track-container">
        {randomTrack?.album?.images?.length > 0 && (
          <img
            src={randomTrack.album.images[0].url}
            alt={`Preview of ${randomTrack.name}`}
            className="song-pic-spotify"
          />
        )}
      </div>
  
      {/* Display the track information in the browser */}
      <div className="song-info">
        <h4>Random Track:</h4>
        {randomTrack ? (
          <>
            <p>Name: {randomTrack.name}</p>
            <p>Artists: {randomTrack.artists.map((artist) => artist.name).join(', ')}</p>
          </>
        ) : (
          <p>No track selected yet.</p>
        )}
  
        {/* Dropdown menu for selecting mood */}
        <label htmlFor="moodSelect">Select Mood: </label>
        <select id="moodSelect" value={selectedMood} onChange={handleMoodChange}>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="peaceful">Peaceful</option>
        </select>
      </div>
  
      {/* Button to fetch a random track */}
      <div className="choose-song-button">
        <button onClick={getRandomTrack}>Get Random Track</button>
      </div>
    </div>
  );
  
 };

export default SpotifyMoodPlayer;
