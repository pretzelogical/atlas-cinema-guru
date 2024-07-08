import { useState, useEffect } from 'react';
import client from './client';
import './App.scss';
import './UiLibrary';
import UiLibrary from './UiLibrary';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';
import useUserState, { useLoadUserFromServer } from './userState';

export type AppState = {
  isLoggedIn: boolean;
  username: string;
};

function App() {
  // const [loading, userData, setUserData] = useUser();
  const [showUiLibrary, setShowUiLibrary] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const username = useUserState((state) => state.username);
  const isLoggedIn = useUserState((state) => state.isLoggedIn);

  return (
    <>
      {/* TODO: If userData.isLoading is true, show a loading screen */}
      {/* If logged in show the dashboard else auth */}
      <Dashboard />
      {/* <button onClick={() => setShowUiLibrary(!showUiLibrary)}>{showUiLibrary ? 'Hide' : 'Show'} Ui library</button>
      <button onClick={() => setShowAuth(!showAuth)}>{showAuth ? 'Hide' : 'Show'} Authentication</button>
      {showUiLibrary ? <UiLibrary /> : null}
      {showAuth
        ? <Authentication />
        : null
      }
      <p>Zustand username: {username}</p>
      <p>isLoading: {isLoading.toString()}</p>
      <p>isLoggedIn: {isLoggedIn.toString()}</p> */}
    </>
  );
}

export default App;
