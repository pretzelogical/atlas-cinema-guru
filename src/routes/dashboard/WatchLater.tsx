import { useState, useEffect } from 'react';
import MovieType from './MovieType';
import client from '../../client';
import MovieCard from '../../components/movies/MovieCard';


export default function WatchLater() {
  const [movies, setMovies] = useState<Array<MovieType>>([]);

  const getWatchLaterMovies = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    client
      .get('titles/watchlater', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        setMovies(Array.from(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWatchLaterMovies();
  }, []);
  return (
    <div className="watchlater-container">
      <h1 className="watchlater-title">Movies to Watch Later</h1>
      <ul className="watchlater-movies">
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