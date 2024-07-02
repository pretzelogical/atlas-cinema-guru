import { useState, useEffect } from 'react';
import client from './client';
import './App.scss';
import './UiLibrary';
import UiLibrary from './UiLibrary';

export type AppState = {
  loading: boolean;
  isLoggedIn: boolean;
  username: string;
};

const useUser = () => {
  const [userData, setUserData] = useState({
    loading: true,
    isLoggedIn: false,
    username: '',
  } as AppState);

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
          setUserData({
            loading: false,
            isLoggedIn: true,
            username: response.data.username,
          });
        })
        .catch((error) => {
          console.log(error);
          // localStorage.removeItem('accessToken');
          setUserData({
            loading: false,
            isLoggedIn: false,
            username: '',
          });
        });
    }
  }, []);
  return userData;
};

function App() {
  const userData = useUser();

  return (
    <>
      <UiLibrary />
      {/* TODO: If userData.isLoading is true, show a loading screen */}
      {/* If logged in show the dashboard else auth */}
      <p>Userdata:</p>
      <code>{JSON.stringify(userData, null, 2)}</code>
    </>
  );
}

export default App;
