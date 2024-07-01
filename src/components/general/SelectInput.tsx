import './general.scss';
import '@fortawesome/fontawesome-svg-core';
import { ChangeEvent, ChangeEventHandler } from 'react';

export type SelectInputProps = {
  label: string;
  options: string[];
  className?: string;
  value: number | string;
  setValue: (x: unknown) => void;
};

export default function SelectInput({
  label,
  options,
  className = "",
  value,
  setValue
}: SelectInputProps): JSX.Element {
  const handleSelect: ChangeEventHandler<HTMLSelectElement> =
    (e: ChangeEvent<HTMLSelectElement>) => {
      setValue((e.target as HTMLSelectElement).value);
  };

  return (
    <div className="select_input-container">
      <div className="select_input-label">
        <label>{label}</label>
      </div>
      <select
        className={className}
        value={value}
        onChange={handleSelect}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}