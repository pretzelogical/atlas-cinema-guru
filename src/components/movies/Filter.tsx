import Input from "../general/Input";
import SelectInput from "../general/SelectInput";
import Tag from "./Tag";
import SearchBar from "../general/SearchBar";


export type FilterProps = {
  minYear: number,
  setMinYear: (year: number | unknown) => void,
  maxYear: number,
  setMaxYear: (year: number | unknown) => void,
  sort: string,
  setSort: (sort: string | unknown) => void;
  genres: { [key: string]: boolean },
  setGenres: (genres: { [key: string]: boolean }) => void,
  title: string,
  setTitle: (title: string | unknown) => void;
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
            setValue={setMinYear}
          />
          <Input
            label="Max. Date:"
            type="year"
            value={maxYear}
            setValue={setMaxYear}
          />
          <SelectInput
            label="Sort:"
            options={["title", "year"]}
            value={sort}
            setValue={setSort}
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