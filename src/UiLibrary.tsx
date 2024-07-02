import Input from "./components/general/Input";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSmile, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import SelectInput from "./components/general/SelectInput";
import Button from "./components/general/Button";
import SearchBar from "./components/general/SearchBar";

function UiLibrary() {
  const [username, setUsername] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [selectValue, setSelectValue] = useState("Option 1");
  const [title, setTitle] = useState<string>('');
  return (
    <div id="app">
      <h1>Cinema Guru - UI Library</h1>
      <h2>Input</h2>
      <p>Username input: {username}</p>
      <div
        style={{
          backgroundColor: 'white',
          padding: 10,
          margin: "10px 10px"
        }}
      >
        <Input
          label="Username:"
          type="text"
          className="black"
          value={username}
          setValue={(v: unknown) => setUsername(v as string)}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
      </div>
      <p>Date input: {date}</p>
      <Input
        label="Date:"
        type="date"
        value={date}
        setValue={(v: unknown) => setDate(v as string)}
        icon={<FontAwesomeIcon icon={faCalendarAlt} />}
      />
      <p>Number input: {number}</p>
      <Input
        label="Number:"
        type="number"
        value={number}
        setValue={(v: unknown) => setNumber(v as string)}
      />
      <h3>SelectInput</h3>
      <p>Selected option: {selectValue}</p>
      <SelectInput
        label="Select option:"
        options={["Option 1", "Option 2", "Option 3"]}
        value={selectValue}
        setValue={(v: unknown) => setSelectValue(v as string)}
      />
      <h3>Button</h3>
      <Button
        label="Click me!"
        onClick={() => alert("Button clicked")}
        icon={<FontAwesomeIcon icon={faSmile} color="#ffffff" />}
      />
      <h3>SearchBar</h3>
      <SearchBar
        title={title}
        setTitle={setTitle}
      />
    </div>
  );
}

export default UiLibrary;
