import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'
// CSS imports
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState()

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=563a76db`;

    const response = await fetch(url);
    const responseJSON = await response.json();

    if(responseJSON?.Search) {
      setMovies(responseJSON.Search);
    }
    console.log(responseJSON.Search)
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
       <MovieListHeading heading="Movies" />
       <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  )
}

export default App
