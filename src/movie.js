import React, { useState, useEffect } from 'react';

const MoviePicker = () => {
  const [genre, setGenre] = useState('');
  const [movie, setMovie] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    if (genre) {
      // Fetch a random movie from TMDB API based on the selected genre
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=667471a55a8d3401c8eb0b5073bf7cda&with_genres=${genre}`)
        .then(response => response.json())
        .then(data => {
          // Select a random movie from the results
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setMovie(data.results[randomIndex]);
        })
        .catch(error => console.error('Error fetching movies:', error));
    }
  }, [genre, fetchTrigger]);

  const handleGenreChange = selectedGenre => {
    setGenre(selectedGenre);
    setFetchTrigger(prevTrigger => prevTrigger + 1); // Increment fetchTrigger to trigger a new fetch
  };

  return (
    <div className="movie-picker-container">
            <section className="button-selection">
        <div className="heading-movie-buttons">
      <h4>Select the mood you're in for a movie!</h4>
      <div className="genre-buttons">
        <button className= "btns" onClick={() => handleGenreChange(16)}>Animated</button> {/* Animation */}
        <button className= "btns" onClick={() => handleGenreChange(12)}>Adventurous</button>{/* Adventure*/}
        <button className= "btns" onClick={() => handleGenreChange(18)}>Dramatic</button> {/* Drama */}
        <button className= "btns" onClick={() => handleGenreChange(28)}>Happy</button> {/* Action */}
      </div>
      </div>
      </section>
      <div className="movie-details-container">
        {movie && (
          <>
            <div className="movie-poster">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              )}
            </div>
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          </>
        )}
      </div>
    </div>
    
  );
};

export default MoviePicker;
