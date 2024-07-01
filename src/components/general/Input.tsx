import './general.css';
import '@fortawesome/fontawesome-svg-core';
import { faUnlink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, ChangeEventHandler } from 'react';


export type InputProps = {
  label: string,
  type: string,
  className: string,
  value: string | number,
  setValue: (x: unknown) => void,
  icon?: JSX.Element,
  inputAttributes?: object;
};


export default function Input({
  label,
  type,
  className,
  value,
  setValue,
  icon,
  inputAttributes
}: InputProps): JSX.Element {
  const handleInput: ChangeEventHandler<HTMLInputElement> =
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue((e.target as HTMLInputElement).value);
  };

  return (
    <div className="input-container">
      <div className="input-label">
        {icon ? icon : <FontAwesomeIcon icon={faUnlink} />}
        <label>{label}</label>
      </div>
      <input
        type={type}
        value={value}
        onChange={handleInput}
        className={className}
        {...inputAttributes}
      />
    </div>
  );
}