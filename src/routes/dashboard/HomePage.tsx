import Tag from "../../components/movies/Tag";
import { useState } from "react";


export default function HomePage() {
  const [tags, setTags] = useState({
    'First': true,
    'Second': false
  });

  return (
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
  );
}