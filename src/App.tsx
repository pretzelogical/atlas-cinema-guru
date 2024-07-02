import { useState } from 'react';
import './App.scss';
import './UiLibrary';
import UiLibrary from './UiLibrary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  return (
    <UiLibrary />
  )
}

export default App;
