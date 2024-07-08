import { create } from 'zustand';

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

export default useUserState;