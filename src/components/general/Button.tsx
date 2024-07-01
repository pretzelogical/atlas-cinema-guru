import './general.scss';


export type ButtonProps = {
  label: string,
  className?: string,
  onClick: () => void,
  icon?: JSX.Element
};


export default function Button({
  label,
  className = '',
  onClick,
  icon
}: ButtonProps): JSX.Element {
  return (
    <button
      className={
        className === ''
          ? "button"
          : `button--${className}`}
      onClick={onClick}
    >
      {icon ? icon : null}
      <label>{label}</label>
    </button>
  );
}