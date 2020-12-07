import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
// CSS imports
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const getMovieRequest = async () => {
    const url = "http://www.omdbapi.com/?s=star wars&apikey=563a76db"

    const response = await fetch(url);
    const responseJSON = await response.json();

    console.log(responseJSON);
    setMovies(responseJSON.Search)
  }

  useEffect(() => {
    getMovieRequest();
  }, [])
  return (
    <div className="container-fluid movie-app">
      <div className="row">
       
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  )
}

export default App
