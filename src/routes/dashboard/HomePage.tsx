import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import { useCallback, useEffect, useState } from "react";
import client from "../../client";
import Button from "../../components/general/Button";
import MovieType from "./MovieType";


export default function HomePage() {
  const [genres, setGenres] = useState<{ [key: string]: boolean; }>({
    "Action": false,
    "Drama": false,
    "Comedy": false,
    "Biography": false,
    "Romance": false,
    "Thriller": false,
    "War": false,
    "History": false,
    "Sport": false,
    "Sci-Fi": false,
    "Documentary": false,
    "Crime": false,
    "Fantasy": false,
  });
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState<number>(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);


  const loadMovie = useCallback(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    let genreString = '';
    for (const genre in genres) {
      if (genres[genre]) {
        genreString += `${genre},`;
      }
    }
    genreString = genreString.slice(0, -1).toLowerCase();
    const routeParams = (
      `page=${page}&minYear=${minYear}&maxYear=${maxYear}` +
      `&sort=${sort}&title=${title}&genres=${genreString}`
    );
    client
      .get(`/titles/advancedsearch?${routeParams}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        setMovies(Array.from(response.data.titles));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, minYear, maxYear, sort, title, genres]);

  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

  return (
    <div className="homepage-container">
      <div className="homepage-filters">
        <Filter
          minYear={minYear}
          setMinYear={setMinYear}
          maxYear={maxYear}
          setMaxYear={setMaxYear}
          sort={sort}
          setSort={setSort}
          genres={genres}
          setGenres={setGenres}
          title={title}
          setTitle={setTitle}
        />
      </div>
      <ul className="homepage-movies">
        {movies.map((movie: MovieType) => (
          <li key={movie.imdbId}>
            <MovieCard
              title={movie.title}
              description={movie.synopsis}
              imgURL={movie.imageurls[0]}
              tags={movie.genres}
              imdbId={movie.imdbId}
            />
          </li>
        ))}
      </ul>
      <div className="homepage-pagination">
        <Button
          label="Load more"
          onClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
