export type ActivityProps = {
  activityType: string,
  username: string,
  title: string,
  date: Date;
};


export default function Activity({
  activityType,
  username,
  date,
  title
}: ActivityProps) {
  return (
    <div className="activity-container">
      {generateMessage(activityType, username, title, date)}
    </div>
  );
}

const generateMessage = (
  activityType: string,
  username: string,
  title: string,
  date: Date
) => {
  if (activityType === 'watchLater' || activityType === 'favorite') {
    return (
      <p>
        <span className="text-color-primary">{username}</span> added <span className="text-color-primary">{title}</span> to {activityType === 'watchLater' ? 'watch later' : 'favorites'} - {date.toDateString()}
      </p>
    );
  } else if (activityType === 'removeWatchLater' || activityType === 'removeFavorited') {
    return (
      <p>
        <span className="text-color-primary">{username}</span> removed <span className="text-color-primary">{title}</span> from {activityType === 'removeWatchLater' ? 'watch later' : 'favorites'} - {date.toDateString()}
      </p>
    )
  }
};