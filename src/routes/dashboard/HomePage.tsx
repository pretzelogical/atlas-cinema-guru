import Tag from "../../components/movies/Tag";
import MovieCard from "../../components/movies/MovieCard";
import { useState } from "react";


export default function HomePage() {
  const [tags, setTags] = useState({
    'First': true,
    'Second': false
  });

  return (
    <>
      <div>
        {Object.entries(tags).map(([key, value]) => (
          <Tag
            key={key}
            label={key}
            isActive={value}
            onClick={() => setTags({ ...tags, [key]: !value })}
          />
        ))}
      </div>
      <div>
        <MovieCard
          title="GodHead: In a fiction, in a dream of passion"
          description="Dreamers in a lonely circus"
          imgURL="https://placehold.co/400x800"
          tags={['First', 'Second']}
          imdbId="tt9899344"
        />
      </div>
    </>
  );
}