import { useState, useEffect } from 'react';
import MovieType from './MovieType';
import client from '../../client';
import MovieCard from '../../components/movies/MovieCard';


export default function Favorites() {
  const [movies, setMovies] = useState<Array<MovieType>>([]);

  const getFavoriteMovies = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    client
      .get('titles/favorite', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log(response.data);
        setMovies(Array.from(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getFavoriteMovies();
  }, []);
  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Movies you like</h1>
      <ul className="favorites-movies">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              description={movie.synopsis}
              title={movie.title}
              imdbId={movie.imdbId}
              tags={movie.genres}
              imgURL={movie.imageurls[0]}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}