import Tag from "../../components/movies/Tag";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import { useState } from "react";


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
          title=""
          setTitle={() => { }}
        />
      </div>
      <ul className="homepage-movies">
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
      </ul>
    </div>
  );
}