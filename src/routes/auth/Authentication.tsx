import { useState } from "react";
import './auth.scss';
import Login from "./Login";
import Register from "./Register";
import client from "../../client";

export type AuthenticationProps = {
  setIsLoggedIn: (x: boolean) => void;
  setAppUsername: (x: string) => void;
};

export default function Authentication({
  setIsLoggedIn,
  setAppUsername
}: AuthenticationProps) {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    const route = isLoggingIn ? '/auth/login' : '/auth/register';
    client
      .post(route, { username, password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          setIsLoggedIn(true);
          setAppUsername(username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="authentication-container">
      <div className="authentication-tabs">
        <AuthenticationTab
          isActive={isLoggingIn}
          onClick={() => setIsLoggingIn(true)}
        >
          Login
        </AuthenticationTab>
        <AuthenticationTab
          isActive={!isLoggingIn}
          onClick={() => setIsLoggingIn(false)}
        >
          Register
        </AuthenticationTab>
      </div>

      {isLoggingIn
        ? <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />
        : <Register
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />
      }
    </div>
  );
}


function AuthenticationTab({
  onClick = () => { },
  isActive = false,
  children = ''
}) {
  return (
    <div className={
      isActive
        ? "authentication-tab--active"
        : "authentication-tab"
    }>
      <button className="authentication-tab-button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}