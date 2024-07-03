import Button from "../general/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import './navigation.scss';

export type HeaderProps = {
  username: string,
  setIsLoggedIn: (x: boolean) => void
}


export default function Header({
  username,
  setIsLoggedIn
}: HeaderProps) {
  const logOut = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  }
  return (
    <div className="header-container">
      <p>Cinema Guru</p>
      <div className="header-user">
          <div className="header-user-profile">
            <img src="https://picsum.photos/100/100" width={40} height={40} alt="Avatar" />
            <p>Welcome, {username}!</p>
          </div>
          <Button
            label="Logout"
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
            onClick={() => logOut()}
          />
      </div>
    </div>
  )
}