import { create } from 'zustand';
import { useEffect, useState } from 'react';
import client from './client';

export type UserState = {
  username: string,
  setUsername: (username: string) => void,
  isLoggedIn: boolean,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  logIn: (username: string) => void,
  logOut: () => void
};

const useUserState = create<UserState>()((set) => ({
  username: '',
  setUsername: (username: string) => set({ username }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  logIn: (username: string) => set({ username, isLoggedIn: true }),
  logOut: () => set({ username: '', isLoggedIn: false }),
} as UserState));

export const useLoadUserFromServer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logIn = useUserState((state) => state.logIn);
  const logOut = useUserState((state) => state.logOut);

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
          logIn(response.data.username);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // localStorage.removeItem('accessToken');
          logOut();
          setIsLoading(false);
        });
    }
  }, [logIn, logOut]);

  return [isLoading] as [boolean];
}

export default useUserState;