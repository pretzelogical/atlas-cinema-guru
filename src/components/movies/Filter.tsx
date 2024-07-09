import Input from "../general/Input";
import SelectInput from "../general/SelectInput";
import Tag from "./Tag";
import SearchBar from "../general/SearchBar";


export type FilterProps = {
  minYear: number,
  setMinYear: (year: number) => void,
  maxYear: number,
  setMaxYear: (year: number) => void,
  sort: string,
  setSort: (sort: string) => void;
  genres: { [key: string]: boolean },
  setGenres: (genres: { [key: string]: boolean }) => void,
  title: string,
  setTitle: (title: string) => void;
};


export default function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle
}: FilterProps) {
  return (
    <>
      <div className="filter-container">
        <div className="filter-search">
          <SearchBar
            title={title}
            setTitle={setTitle}
          />
        </div>
        <div className="filter-select">
          <Input
            label="Min Date:"
            type="year"
            value={minYear}
            setValue={(value) => setMinYear(value as number)}
          />
          <Input
            label="Max. Date:"
            type="year"
            value={maxYear}
            setValue={(value) => setMaxYear(value as number)}
          />
          <SelectInput
            label="Sort:"
            options={["latest", "oldest", "highestrated", "lowestrated"]}
            value={sort}
            setValue={(value) => setSort(value as string)}
          />
        </div>
        <div className="filter-tags">
          {Object.entries(genres).map(([key, value]) => (
            <Tag
              key={key}
              label={key}
              isActive={value}
              onClick={() => setGenres({ ...genres, [key]: !value })}
            />
          ))}
        </div>
      </div>
    </>
  );
}