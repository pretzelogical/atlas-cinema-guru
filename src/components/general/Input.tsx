import './general.scss';
import '@fortawesome/fontawesome-svg-core';
import { ChangeEvent, ChangeEventHandler } from 'react';


export type InputProps = {
  label: string,
  type: string,
  className?: string,
  value: string | number,
  setValue: (x: string | number) => void,
  icon?: JSX.Element,
  inputAttributes?: object;
};


export default function Input({
  label,
  type,
  className = '',
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
    <div className={
      className === ''
        ? "input-container"
        : `input-container--${className}`}>
      <div className="input-label">
        {icon ? icon : null}
        <label>{label}</label>
      </div>
      <input
        type={type}
        value={value}
        onChange={handleInput}
        {...inputAttributes}
      />
    </div>
  );
}