import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
function App() {
  //Fetch Requests

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {!loading && movies.length === 0 && !error && <p>Please fetch the movies :P </p>}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
