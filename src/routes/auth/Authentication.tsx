import { useState } from "react";
import './auth.scss';

export type AuthenticationProps = {
  setIsLoggedIn: (x: boolean) => void,
  setAppUsername: (x: string) => void
}

export default function Authentication({
  setIsLoggedIn,
  setAppUsername
}: AuthenticationProps) {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    </div>
  )
}


function AuthenticationTab({
  onClick = () => {},
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
  )
}