import { useState } from "react";
import './auth.scss';
import Login from "./Login";
import Register from "./Register";
import client from "../../client";
import useUserState from "../../userState";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const navigate = useNavigate();
  const logIn = useUserState((state) => state.logIn);


  const handleSubmit = () => {
    const route = isLoggingIn ? '/auth/login' : '/auth/register';
    client
      .post(route, { username: usernameInput, password: passwordInput })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          logIn(usernameInput);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="authentication-container">
      <div className="authentication-content">
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
          username={usernameInput}
          password={passwordInput}
          setUsername={setUsernameInput}
          setPassword={setPasswordInput}
          onSubmit={handleSubmit}
        />
        : <Register
          username={usernameInput}
          password={passwordInput}
          setUsername={setUsernameInput}
          setPassword={setPasswordInput}
          onSubmit={handleSubmit}
        />
      }
      </div>
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