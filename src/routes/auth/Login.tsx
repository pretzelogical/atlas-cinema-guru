import Input from '../../components/general/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/general/Button';


export type LoginProps = {
  username: string,
  password: string,
  setUsername: (x: string) => void,
  setPassword: (x: string) => void,
  onSubmit: () => void;
};


export default function Login({
  username,
  password,
  setUsername,
  setPassword,
  onSubmit
}: LoginProps) {

  return (
    <div className="authInput-container">
      <p><span>Login with your account</span></p>
      <Input
        label="Username:"
        value={username}
        setValue={(x: unknown) => setUsername(x as string)}
        type="text"
        icon={<FontAwesomeIcon icon={faUser} />}
        className='black'
      />
      <Input
        label="Password:"
        value={password}
        setValue={(x: unknown) => setPassword(x as string)}
        type="password"
        icon={<FontAwesomeIcon icon={faKey} />}
        className='black'
      />
      <Button
        label='Login'
        icon={<FontAwesomeIcon icon={faKey} />}
        onClick={() => onSubmit()}
      />
    </div>
  );
}