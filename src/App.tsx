import Input from "./components/general/Input";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [username, setUsername] = useState<string>('');
  return (
    <div id="app">
      <h1>Cinema guru</h1>
      <h2>Input</h2>
      <Input
        label="Username"
        type="text"
        className="input"
        value={username}
        setValue={(v: unknown) => setUsername(v as string)}
        icon={<FontAwesomeIcon icon={faUser} color="#999999" />}
      />
    </div>
  );
}

export default App;
