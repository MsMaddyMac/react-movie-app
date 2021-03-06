import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox'
import AddFavorite from './components/AddFavorite'
import RemoveFavorite from './components/RemoveFavorite'
// CSS imports
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

const App = () => {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

    const response = await fetch(url);
    const responseJSON = await response.json();

    if(responseJSON?.Search) {
      setMovies(responseJSON.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'))
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  }


  const addFavoriteMovie = (movie) => {
    const newFavoritesList = [...favorites, movie];
    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoritesList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);
    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
       <MovieListHeading heading="Movies" />
       <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList 
          movies={movies} 
          favoriteComponent={AddFavorite} 
          handleFavoritesClick={addFavoriteMovie} 
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
       <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList 
          movies={favorites} 
          favoriteComponent={RemoveFavorite} 
          handleFavoritesClick={removeFavoriteMovie} 
        />
      </div>
    </div>
  )
}

export default App
