import { useState, useEffect } from 'react';
import client from './client';
import './App.scss';
import './UiLibrary';
import UiLibrary from './UiLibrary';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';
import useUserState from './userState';

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
  const [ isLoading ] = useLoadUserFromServer();

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

const useLoadUserFromServer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUserName = useUserState((state) => state.setUsername);
  const setIsLoggedIn = useUserState((state) => state.setIsLoggedIn);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoading(true);
      client
        .post('/auth', {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          }
        )
        .then((response): void => {
          console.log(response.status, response.data);
          setUserName(response.data.username);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // localStorage.removeItem('accessToken');
          setUserName('');
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    }
  }, [setUserName, setIsLoggedIn]);

  return [isLoading] as [boolean];
}

export default App;
