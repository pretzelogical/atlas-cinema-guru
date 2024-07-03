import Input from '../../components/general/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/general/Button';


export type RegisterProps = {
  username: string,
  password: string,
  setUsername: (x: string) => void,
  setPassword: (x: string) => void
}


export default function Register({
  username,
  password,
  setUsername,
  setPassword
}: RegisterProps) {
  return (
    <div className="authInput-container">
      <p><span>Create a new account</span></p>
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
        label='Sign Up'
        icon={<FontAwesomeIcon icon={faPlus} />}
        onClick={() => {}}
      />
    </div>
  )
}