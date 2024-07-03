import React, { useState, useEffect } from 'react';
import client from './client';
import './App.scss';
import './UiLibrary';
import UiLibrary from './UiLibrary';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';

export type AppState = {
  isLoggedIn: boolean;
  username: string;
};

function App() {
  const [loading, userData, setUserData] = useUser();
  const [showUiLibrary, setShowUiLibrary] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  return (
    <main>
      {/* TODO: If userData.isLoading is true, show a loading screen */}
      {/* If logged in show the dashboard else auth */}
      <Dashboard
        username={userData.username}
        setIsLoggedIn={
          (x: boolean) => setUserData({ ...copyUserState(userData), isLoggedIn: x })
        }
      />
      <button onClick={() => setShowUiLibrary(!showUiLibrary)}>{showUiLibrary ? 'Hide' : 'Show'} Ui library</button>
      <button onClick={() => setShowAuth(!showAuth)}>{showAuth ? 'Hide' : 'Show'} Authentication</button>
      {showUiLibrary ? <UiLibrary /> : null}
      {showAuth
        ? <Authentication
          setIsLoggedIn={
            (loggedIn) => setUserData({ ...copyUserState(userData), isLoggedIn: loggedIn })
          }
          setAppUsername={
            (username) => setUserData({ ...copyUserState(userData), username })
          }
        />
        : null
      }
      <p>Loading: {loading.toString()}</p>
      <p>User data: {JSON.stringify(userData, null, 2)}</p>
    </main>
  );
}

const useUser = () => {
  const [userData, setUserData] = useState<AppState>({
    isLoggedIn: false,
    username: '',
  } as AppState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
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
          setLoading(false);
          setUserData({
            isLoggedIn: true,
            username: response.data.username,
          });
        })
        .catch((error) => {
          console.log(error);
          // localStorage.removeItem('accessToken');
          setLoading(false);
          setUserData({
            isLoggedIn: false,
            username: '',
          });
        });
    }
  }, []);

  return [loading, userData, setUserData] as [boolean, AppState, React.Dispatch<React.SetStateAction<AppState>>];
};


const copyUserState = (state: AppState): AppState => {
  return {
    username: state.username,
    isLoggedIn: state.isLoggedIn,
  };
};

export default App;
