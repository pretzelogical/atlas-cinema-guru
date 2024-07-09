import './movies.scss';
import Button from '../general/Button';

export type TagProps = {
  label: string,
  isActive: boolean
  onClick: () => void
};

export default function Tag({
  label,
  isActive,
  onClick
}: TagProps) {
  return (
    <div className={
      isActive
        ? 'movie-tag-active'
        : 'movie-tag'
    }>
      <Button
        label={label}
        onClick={onClick}
      />
    </div>
  )
}