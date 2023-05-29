import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
function App() {
  //Fetch Requests

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMoviesHandler() {
    setLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    //Added Async-Await calls instead of .then command
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
    setLoading(false);

  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{!loading && movies.length>0 && <MoviesList movies={movies}/>}
      {!loading && movies.length===0 && <p>Please fetch the movies :P </p>}
      {loading && <p>Loading...</p>}
       </section>
    </React.Fragment>
  );
}

export default App;
