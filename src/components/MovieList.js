import React from 'react'

const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie, index) => (

        <div className="d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie" />
        </div>
      ))}
    </>
  )
}

export default MovieList

