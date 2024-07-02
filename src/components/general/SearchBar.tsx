import './general.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


export type SearchBarProps = {
  title: string,
  setTitle: (x: string) => void;
};


export default function SearchBar({
  title,
  setTitle
}: SearchBarProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isActive = isHovered || title.length > 0;

  return (
    <div
      className={
        isActive
        ? "search_bar-container--active"
        : "search_bar-container"
      }
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={title}
        placeholder="Search Movies"
        onChange={(e) => {setTitle(e.target.value)}}
      />
    </div>
  );
}