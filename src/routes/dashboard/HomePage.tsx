import Tag from "../../components/movies/Tag";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import { useState } from "react";


export default function HomePage() {
  const [tags, setTags] = useState<{ [key: string]: boolean; }>({
    'First': true,
    'Second': false
  });

  return (
    <div className="homepage-container">
      <div className="homepage-filters">
        <Filter
          minYear={1970}
          setMinYear={() => { }}
          maxYear={2022}
          setMaxYear={() => { }}
          sort="title"
          setSort={() => { }}
          genres={tags}
          setGenres={setTags}
          title=""
          setTitle={() => { }}
        />
      </div>
      <div className="homepage-movies">
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
      </div>
    </div>
  );
}